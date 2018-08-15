import { IService } from './IService';
import fs = require("fs");
import child_process = require('child_process');
import util = require('util');
import path = require('path');
import extract_zip = require('extract-zip');

export class NullService implements IService{
  name: string;
  time_started: string;
  time_registered: string;
  status: string;

  constructor(){
    this.name = 'null';
    this.time_started = new Date().getTime().toString();
    this.time_registered = new Date().getTime().toString();
    this.status = 'down'
  }

  start() : boolean { return false; }
  stop() : boolean { return true; }
}


export class PylonService implements IService {

  name: string;
  time_started: string;
  time_registered: string;
  status: string;

  constructor() {
    this.name = 'Pylon(self)';
    this.time_started = new Date().getTime().toString();
    this.time_registered = new Date().getTime().toString();
    this.status = 'up';
  }
  start() : boolean {
    return true;
  }
  stop() : boolean {
    return false;
  }
}


export class SpringBootService implements IService {

  name: string;
  time_started: string;
  time_registered: string;
  status: string;
  artifact: string;
  jvmOptions: string[];

  private proc?: child_process.ChildProcess;

  constructor(workingDir: string, name: string, artifact: string, jvmOptions: object) {
    this.name = name;
    this.time_started = new Date().getTime().toString()
    this.time_registered = new Date().getTime().toString()
    this.status = 'down';
    this.artifact = artifact;
    this.jvmOptions = jvmOptions as (string[]);
  }

  start() : boolean {
    this.status = 'up';
    // java ${jvmOption} -jar ${artifact}
    // 1. check java
    let java = ''
    if(fs.existsSync('jre/bin/java')){
      java = 'jre/bin/java'
    }
    else if(fs.existsSync('jre/bin/java.exe')){
      java = 'jre/bin/java.exe'
    }
    else if(process.env.JAVA_HOME && fs.existsSync(process.env.JAVA_HOME+"/bin/java")){
      java = process.env.JAVA_HOME+"/bin/java";
    }
    else if(process.env.JAVA_HOME && fs.existsSync(process.env.JAVA_HOME+"/bin/java.exe")){
      java = process.env.JAVA_HOME+"/bin/java.exe";
    }
    else{
      console.log('java not found!')
      return false;
    }

    console.log(java);
    // 2. try..retry
    this.proc = child_process.spawn(path.resolve(java), this.jvmOptions.concat(['-jar', path.resolve(this.artifact)]));
    
    this.proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    this.proc.on('exit', (code, signal) =>{
      this.status = "down";
      console.log(this.name + ' was finished');
    });

    // 3. return


    return true;
  }

  stop() : boolean {
    if(this.proc){
      this.proc.kill('SIGKILL');
    }
    
    this.status = 'down';
    return true;
  }

  toJSON(){
    var result = {};
    for (var x in this) {
        if (x !== "proc") {
            result[x] = this[x];
        }
    }
    return result;
  }
}


interface NginxOption{
  python:string;
  startCommand: string[];
  stopCommand: string[];
};

export class NginxService implements IService {


  name: string;
  time_started: string;
  time_registered: string;
  status: string;
  artifact: string;
  workingDir: string;
  options: NginxOption;

  private proc?: child_process.ChildProcess;

  constructor(workingDir: string, name: string, artifact: string, options: object) {
    this.name = name;
    this.time_started = new Date().getTime().toString()
    this.time_registered = new Date().getTime().toString()
    this.status = 'down';
    this.artifact = artifact;
    this.options = options as NginxOption;
    this.workingDir = workingDir;
  }

  start() : boolean {
    
    // 1. artifact uncompress
    extract_zip(path.resolve(this.artifact), {dir: path.resolve(this.workingDir)}, err => {
      if(err){
        console.log('extract failed -', err);
      }
      else{
        console.log('extract complete');
        // 2. run
        console.log(this.options.python, this.options.startCommand);
        this.proc = child_process.spawn(this.options.python, this.options.startCommand, {cwd: path.resolve(this.workingDir)});
        this.status = 'up';
        return true;
      }
    })

    return false;
  }

  stop() : boolean {
    if(this.proc){
      child_process.spawn(this.options.python, this.options.stopCommand, {cwd: path.resolve(this.workingDir)});
    }
    
    this.status = 'down';
    return true;
  }

  toJSON(){
    var result = {};
    for (var x in this) {
        if (x !== "proc") {
            result[x] = this[x];
        }
    }
    return result;
  }
}