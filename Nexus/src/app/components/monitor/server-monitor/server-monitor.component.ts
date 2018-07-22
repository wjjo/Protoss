import { Server } from './../../../model/server';
import { Component, OnInit, Input } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-server-monitor',
  templateUrl: './server-monitor.component.html',
  styleUrls: ['./server-monitor.component.scss']
})
export class ServerMonitorComponent implements OnInit {

  private SPARK_MAX_COUNT = 20;

  txt = '';

  RES_CPU = 'CPU';
  RES_RAM = 'RAM';

  cpuUsage = [{
    name: 'CPU',
    series: []
  }];

  ramUsage = [{
    name: 'Memory',
    series: []
  }];

  @Input() server: Server;

  constructor() { }

  ngOnInit() {
    let count = 0;
    setInterval(() => {
      this.cpuUsage = this.update(this.cpuUsage, count++, Math.random() * 100);
      this.ramUsage = this.update(this.ramUsage, count++, Math.random() * 100);
    }, 1000);
  }

  update(data: any[], name: any, value: number): any[] {
    const newData = [];
    newData.push(data[0]);
    newData[0].series.push({ name: name, value: value });

    if (newData[0].series.length > this.SPARK_MAX_COUNT) {
      newData[0].series.shift();
    }

    return newData;
  }
}
