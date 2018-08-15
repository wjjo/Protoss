import { HttpClient } from '@angular/common/http';
import { Server } from './../../../model/server';
import { Status } from './../../util/status.enum';
import { Service } from './../../../model/service';
import { Component, OnInit, Input } from '@angular/core';
import { InstallerService } from '../../../services/installer.service';

@Component({
  selector: 'app-service-monitor',
  templateUrl: './service-monitor.component.html',
  styleUrls: ['./service-monitor.component.scss']
})
export class ServiceMonitorComponent implements OnInit {

  enumStatus = Status;

  @Input() server: Server;
  @Input() service: Service;

  private INTERVAL_SERVICE_MONITOR = 3000;

  private monitorTimer: NodeJS.Timer;

  constructor(private installer: InstallerService, private http: HttpClient) { }

  ngOnInit() {
    this.startMonitor();
  }

  startMonitor(interval?: number) {
    if (!interval) {
      interval = this.INTERVAL_SERVICE_MONITOR;
    }

    this.monitorTimer = setInterval(() => {
      this.updateServiceStatus();
    }, interval);
  }

  private updateServiceStatus(): Promise<void> {
    return this.http
      .get(this.getServicesReqUrl())
      .toPromise()
      .catch(() => {

      })
      .then((res: any[]) => {

        this.server.services.forEach(service => {
          let exists = false;
          res.forEach((serviceInfo: string) => {
            // 상태 업데이트
            if (service.name === serviceInfo['name']) {
              service.status = serviceInfo['status'];
              exists = true;
            }
          });

          if (!exists) {
            service.status = 'unknown';
          }
        });

        res.forEach((serviceInfo: string) => {
          this.server.services.forEach(service => {
            // 상태 업데이트
            if (service.name === serviceInfo['name']) {
              service.status = serviceInfo['status'];
            }
          });
        });
      })
      .catch(msg => {
        console.error(msg);
      });
  }


  private getStatus(service: Service): Status {
    if (service.status === 'up') {
      return Status.SUCCESS;
    } else if (service.status === 'down') {
      return Status.ERROR;
    } else if (service.status === 'in_progress') {
      return Status.IN_PROGRESS;
    } else {
      return Status.UNKNOWN;
    }
  }

  private restart() {
    this.installer.install(this.server, this.service);
  }

  private kill() {
    this.installer.kill(this.server, this.service);
  }

  private getServicesReqUrl(): string {
    return 'http://' + this.server.host + '/services';
  }

}
