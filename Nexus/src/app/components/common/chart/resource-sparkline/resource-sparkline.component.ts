import { Component, OnInit, Input } from '@angular/core';
import { RandomSparklineData } from '../random-sparkline-data';

@Component({
  selector: 'app-resource-sparkline',
  templateUrl: './resource-sparkline.component.html',
  styleUrls: ['./resource-sparkline.component.scss']
})
export class ResourceSparklineComponent {

  @Input() data: any[];

  scheme = 'cool';
  autoScale = false;

  constructor() { }

}
