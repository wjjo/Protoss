import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Server } from './../../../model/server';
import { Service } from './../../../model/service';
import { Status } from './../../util/status.enum';
import { InstallerService } from '../../../services/installer.service';
import { ModelProviderService } from '../../../services/model-provider/model-provider.service';


@Component({
  selector: 'app-server-monitor',
  templateUrl: './server-monitor.component.html',
  styleUrls: ['./server-monitor.component.scss']
})
export class ServerMonitorComponent implements OnInit {
  // private SPARK_MAX_COUNT = 20;

  // // Data for resource-monitor
  // cpuUsage = [
  //   {
  //     name: 'CPU',
  //     series: [
  //       {
  //         name: 0,
  //         value: 0
  //       }
  //     ]
  //   }
  // ];

  // memUsage = [
  //   {
  //     name: 'Memory',
  //     series: [
  //       {
  //         name: 0,
  //         value: 0
  //       }
  //     ]
  //   }
  // ];

  private INTERVAL_SERVER_MONITOR = 3000;
  serverMonitorTimer: NodeJS.Timer;

  @Input() server: Server;

  constructor(
    private httpClient: HttpClient,
    private installer: InstallerService,
    protected modelProvider: ModelProviderService
  ) { }

  ngOnInit() {
    this.startServerMonitor();
  }

  private startServerMonitor(interval?: number) {
    if (!interval) {
      interval = this.INTERVAL_SERVER_MONITOR;
    }

    this.serverMonitorTimer = setInterval(() => {
      // 서버 상태 업데이트
      this.updateServerStatus();
      // this.updateServices();
      // TODO : 기타 서버 자원 업데이트
    }, interval);
  }

  private updateServerStatus() {
    return this.httpClient
      .get('http://' + this.server.host)
      .toPromise()
      .catch(msg => {
        this.server.status = 'OFF';
      })
      .then(res => {
        if (res) {
          this.server.status = res['status'];
        }
      });
  }

  private updateServices() {
    return this.httpClient.get(this.getServicesUrl()).toPromise()
      .then((res: any[]) => {
        res.forEach((serviceInfo: string) => {

          let alreadyKnow = false;
          this.server.services.forEach(service => {
            // 상태 업데이트
            if (service.name === serviceInfo['name']) {
              alreadyKnow = true;
            }
          });

          // if(!alreadyKnow) {
          // }
        });
      });
  }

  private getServicesUrl(): string {
    return 'http://' + this.server.host + '/services';
  }

  // Update data of resource-monitor
  // update(data: any[], name: any, value: number): any[] {
  //   const newData = [];
  //   newData.push(data[0]);
  //   newData[0].series.push({ name: name, value: value });
  //   if (newData[0].series.length > this.SPARK_MAX_COUNT) {
  //     newData[0].series.shift();
  //   }
  //   return newData;
  // }
}
