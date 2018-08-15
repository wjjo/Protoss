import { Server } from './../../model/server';
import { InstallerService } from './../../services/installer.service';
import { ModelProviderService } from './../../services/model-provider/model-provider.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router,
    private installer: InstallerService
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

  /**
   * 설치 수행
   */
  install() {
    this.router.navigate(['monitor']);

    let promise: Promise<any> = Promise.resolve();
    this.modelProv.servers.forEach(server => {
      server.services.forEach(service => {
        server.status = 'unknown';

        if (service.prerequisite) {
          promise = promise.then(data => {
            return this.waitForResponse(service.prerequisite, 100);
          });
        }

        promise = promise.then(data => {
          return this.installer.install(server, service);
        });
      });
    });

    promise = promise.then(data => {
      this.router.navigate(['monitor']);
    });

  }

  /**
   * 선택된 파일을 서비스화하여 서비스 목록에 추가
   * @param event
   */
  fileSelected(event) {
    const fileService = this.fileService;

    const modelProv = this.modelProv;

    // For each file,
    Array.prototype.forEach.call(event.target.files, function (file) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        const desc: any = JSON.parse(fileReader.result);

        let artifact: File;

        if (desc.artifact) {
          const filePath = fileService.join(fileService.parent(file.path), desc.artifact);
          artifact = fileService.getLocalFile(filePath);
        }

        let artifactLink: string;
        if (desc.artifactLinks) {
          artifactLink = desc.artifactLink;
        }

        modelProv.unassginedServices.unshift({
          name: desc.name,
          description: file,
          artifact: artifact,
          artifactLink: artifactLink,
          prerequisite: desc.prerequisite,
          status: 'unknown'
        });

        console.log(modelProv.unassginedServices[0]);
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
