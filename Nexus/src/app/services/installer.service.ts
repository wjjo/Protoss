import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from './../services/notification/toaster.service';
import { FileService } from './../services/fs/file.service';
import { Server } from './../model/server';
import { Service } from './../model/service';

@Injectable({
  providedIn: 'root'
})

export class InstallerService {

  constructor(
    private httpClient: HttpClient,
    private fileService: FileService,
    private toaster: ToasterService) {
  }

  install(server: Server, service: Service): Promise<Object> {
    let promise: Promise<any> = Promise.resolve();

    if (service.artifact) {
      promise = promise
        .then(data => {
          return this.transfer(server, service);
        })
        .catch(data => {
          this.toaster.error('Fail to transfer ' + service.name);
        })
        .then(data => {
          if (data) {
            this.toaster.success('Success to transfer ' + service.name);
          }
        });
    } else if (service.artifactLink) {
      promise = promise
        .then(data => {
          return this.fileService.download(service.artifactLink);
        })
        // 다운로드 실패
        .catch(data => {
          this.toaster.error('Fail to download artifact from ' + service.artifactLink);
        })
        // 다운로드 성공
        .then(data => {
          if (data instanceof Blob) {
            service.artifact = new File(
              [data],
              this.fileService.getOnlyName(service.artifactLink)
            );
            return this.transfer(server, service);
          }
        })
        .catch(data => {
          this.toaster.error('Fail to transfer ' + service.name);
        })
        .then(data => {
          if (data) {
            console.log(service.name);
            this.toaster.success('Success to transfer ' + service.name);
          }
          return data;
        });
    } else {
      promise = promise.then(data => {
        this.toaster.error('There must be either artifact or link of artifact');
      });
    }

    return promise;
  }

  kill(server: Server, service: Service) {
    const promise = Promise.resolve().then(() => {
      return this.httpClient.delete(this.getServicesUrl(server) + '/' + service.name).toPromise();
    });

    return promise;
  }

  transfer(server: Server, service: Service) {
    const formData: FormData = new FormData();

    // 명세 추가
    formData.append(
      'description',
      service.description,
      service.description.name
    );

    // 산출물 추가
    formData.append('artifact', service.artifact, service.artifact.name);

    return this.httpClient
      .post(this.getServicesUrl(server), formData)
      .toPromise();
  }

  getServicesUrl(server: Server) {
    return 'http://' + server.host + '/services';
  }
}
