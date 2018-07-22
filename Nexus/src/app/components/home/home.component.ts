import { ModelProviderService } from './../../services/model-provider/model-provider.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Server } from '../../model/server';
import { Service } from '../../model/service';
import { FileService } from './../../services/fs/file.service';
import { ToasterService } from '../../services/notification/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private fileService: FileService,
    private toaster: ToasterService,
    public modelProv: ModelProviderService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  // 서비스 추가 모달을 실행
  openNewServerModal(content) {
    this.modalRef = this.modalService.open(content, {
      windowClass: 'dark-modal'
    });
  }

  waitForResponse(url: string, remainingCount: number) {
    let promise: Promise<any> = Promise.resolve().then(data => {
      return this.httpClient.get(url).toPromise();
    });

    promise = promise.catch(error => {
      if (remainingCount > 0) {
        return this.waitForResponse(url, remainingCount - 1);
      } else {
        return promise;
      }
    });

    return promise;
  }

  downLoadAndUpload(server: Server, service: Service): Promise<Object> {
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

  /**
   * 설치 수행
   */
  install() {
    let promise: Promise<any> = Promise.resolve();
    this.modelProv.servers.forEach(server => {
      server.services.forEach(service => {
        if (service.prerequisite) {
          promise = promise.then(data => {
            return this.waitForResponse(service.prerequisite, 100);
          });
        }

        promise = promise.then(data => {
          return this.downLoadAndUpload(server, service);
        });
      });
    });

    promise = promise.then(data => {
      this.router.navigate(['monitor']);
    });

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
      .post(this.makeServiceUploadUrl(server.host), formData)
      .toPromise();
  }

  /**
   * 선택된 파일을 서비스화하여 서비스 목록에 추가
   * @param event
   */
  fileSelected(event) {
    const fileService = this.fileService;

    // For each file,
    Array.prototype.forEach.call(event.target.files, function (file) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        const desc: any = JSON.parse(fileReader.result);

        const artifacts = [];
        desc.artifacts.forEach(element => {
          const filePath = fileService.join(fileService.parent(file), element);
          artifacts.push(fileService.getLocalFile(filePath));
        });

        const artifactLinks = [];
        desc.artifactLinks.forEach(element => {
          artifactLinks.push(element);
        });

        this.modelservices.services.push({
          name: desc.name,
          description: file,
          artifacts: artifacts,
          artifactLinks: artifactLinks
        });
      };

      fileReader.readAsText(file);
    });
  }

  /**
   * 서비스 전송을 위한 URL을 생성하여 반환
   * @param host ip:port
   */
  makeServiceUploadUrl(host: string) {
    return 'http://' + host + '/services';
  }
}
