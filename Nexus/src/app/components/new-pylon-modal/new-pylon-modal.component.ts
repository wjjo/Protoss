import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Server } from './../../model/server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-pylon-modal',
  templateUrl: './new-pylon-modal.component.html',
  styleUrls: ['./new-pylon-modal.component.scss']
})
export class NewPylonModalComponent implements OnInit {

  @Input() servers: Server[] = [];
  @Input() modalRef: NgbModalRef;

  host: string;

  constructor() { }

  ngOnInit() {
  }

  ok() {
    this.servers.push({host: this.host, serviceNames: []});
    this.modalRef.close();
  }

  close() {
    this.modalRef.close();
  }
}
