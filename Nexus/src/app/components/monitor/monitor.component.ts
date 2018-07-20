import { ModelProviderService } from './../../services/model-provider/model-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(
    public modelProv: ModelProviderService
  ) { }

  ngOnInit() {
  }

}
