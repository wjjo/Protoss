import system = require('systeminformation')
//import sync = require('synchronize')

export class System {

    private static instance: System;
  
    static getInstance() { 
      if(!System.instance){
        System.instance = new System;
      }
      return System.instance;
    }

    private constructor(){
       
    }

    async getSystem() {
        let data = await this.getSystemInternal();
        return data;
    }

    async getSystemInternal() {
        
        let cpu_info = await system.cpu();
        let mem_info = await system.mem();
        let nic_info = await system.networkInterfaces();
        let os_info = await system.osInfo();
        let disk_info = await system.fsSize();

        let ret = [{
            'cpu' : cpu_info,
            'mem' : mem_info,
            'nic' : nic_info,
            'os' : os_info,
            'disk' : disk_info
        }];
        
        return ret;
       
    }
  }