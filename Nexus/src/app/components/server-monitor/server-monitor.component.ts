import { Server } from './../../model/server';
import { Component, OnInit, Input } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-server-monitor',
  templateUrl: './server-monitor.component.html',
  styleUrls: ['./server-monitor.component.scss']
})
export class ServerMonitorComponent implements OnInit {

  @Input() server: Server;

  constructor() { }

  ngOnInit() {
  }

}
