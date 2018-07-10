import { Server } from './../../model/server';
import { Service } from './../../model/service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servers: Server[] = [];
  services: Service[] = [];

  serverHosts: string[] = [];
  serviceNames: string[] = [];

  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {
    this.serverHosts = [
      '211.116.223.1:3000',
      '211.116.223.2:3000',
      '211.116.223.3:3000',
      '211.116.223.4:3000'
    ];
    this.serviceNames = [
      'Account',
      'Analysis',
      'Baseline',
      'Defect',
      'Filter',
      'FixReference',
      'Message',
      'Metric',
      'Mission',
      'Project',
      'Revision',
      'Web',
      'Config',
      'SampleA',
      'SampleB',
      'SampleC',
      'SampleD'
    ];

    this.serverHosts.forEach(element => {
      this.servers.push({ host: element, serviceNames: [] });
    });

    this.serviceNames.forEach(element => {
      this.services.push({ name: element });
    });
  }

  ngOnInit() { }

  openNewServerModal(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  install() {
    this.servers.forEach(server => {
      console.log(server.host + '\n');

      server.serviceNames.forEach(serviceName => {
        console.log(serviceName + '\n');
      });
    });
  }
}
