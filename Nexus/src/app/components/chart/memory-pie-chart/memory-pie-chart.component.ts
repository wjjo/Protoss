import { data } from './sample-data';
import { lineChartAutoScale } from './../ngx-charts/ngx-charts.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-pie-chart',
  templateUrl: './memory-pie-chart.component.html',
  styleUrls: ['./memory-pie-chart.component.scss']
})
export class MemoryPieChartComponent implements OnInit {

  view: number[];
  // results: object[];
  results = data;
  scheme: object;
  customColors: object;
  // animations: boolean;
  // labels: boolean;
  labelFormatting: Function;
  // trimLabels: boolean;
  // maxLabelLength: number;
  // legend: boolean;
  // legendTitle: string;
  // explodeSlices: boolean;
  // doughnut: boolean;
  // arcWidth: number;
  // gradient: boolean;
  // activeEntries: object[];
  // tooltipDisabled: boolean;
  // tooltipText: Function;
  autoScale = true;
  // tooltipTemplate: TemplateRef;

  constructor() {
    this.results = data;
  }

  ngOnInit() {
  }

}
