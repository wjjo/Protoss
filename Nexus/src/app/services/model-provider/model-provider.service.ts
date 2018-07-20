import { FileService } from './../fs/file.service';
import { Service } from './../../model/service';
import { Server } from './../../model/server';
import { Injectable, OnInit } from '@angular/core';
import { readFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})

export class ModelProviderService {

  unassginedServices: Service[] = [];
  servers: Server[] = [];

  constructor(
    private fileService: FileService
  ) {
    this.servers.push({
      host: '127.0.0.1:3000',
      services: []
    });

    // 서비스 목록 초기화 : 특정 경로 아래 description 파일 읽어와 사용 가능한 서비스 목록을 초기화한다.
    const serviceDir = 'services';
    const descFiles = this.fileService.find(serviceDir, element => {
      if (element.endsWith('.json')) {
        return true;
      }
    });

    // 모든 description 파일들에 대해...
    descFiles.forEach(fileName => {
      const path = this.fileService.join(serviceDir, fileName);
      this.unassginedServices.push(this.loadService(path));
    });
  }

  OnInit() {
    // 서비스 목록 초기화 : 특정 경로 아래 description 파일 읽어와 사용 가능한 서비스 목록을 초기화한다.
    const serviceDir = 'services';
    const descFiles = this.fileService.find(serviceDir, element => {
      if (element.endsWith('.json')) {
        return true;
      }
    });

    // 모든 description 파일들에 대해...
    descFiles.forEach(fileName => {
      const path = this.fileService.join(serviceDir, fileName);
      this.unassginedServices.push(this.loadService(path));
    });
  }

  loadService(descPath: string) {
    const desc = this.fileService.readJsonSync(descPath);

    // 산출물 경로
    const artifactPath: string = desc['artifact'];

    // 산출물에 대한 파일 오브젝트 생성
    const parent: string = this.fileService.parent(descPath);

    let artifact: File;
    if (artifactPath) {
      artifact = new File(
        [readFileSync(this.fileService.join(parent, artifactPath))],
        this.fileService.getOnlyName(artifactPath)
      );
    }

    // description에 대한 파일 오브젝트 생성
    const description: File = new File(
      [readFileSync(descPath)],
      this.fileService.getOnlyName(descPath)
    );

    // 서비스 추가
    return {
      name: desc['name'],
      description: description,
      artifact: artifact,
      artifactLink: desc['artifactLink'],
      prerequisite: desc['prerequisite']
    };
  }
}
