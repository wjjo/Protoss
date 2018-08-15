import { Status } from './../status.enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})


export class StatusIconComponent implements OnInit {

  eStatus = Status;

  @Input() status = Status.UNKNOWN;

  constructor() { }

  ngOnInit() {
  }

}
