import { Component } from '@angular/core';
import { lineChartMulti } from './ngxChart';
import * as chartsData from './ngx-charts.config';

@Component({
  selector: 'app-ngx',
  templateUrl: './ngx-charts.component.html'
})
export class NGXChartsComponent {

  lineChartMulti = lineChartMulti;
  //Line Charts

  // options
  lineChartShowXAxis = chartsData.lineChartShowXAxis;
  lineChartShowYAxis = chartsData.lineChartShowYAxis;
  lineChartGradient = chartsData.lineChartGradient;
  lineChartShowLegend = chartsData.lineChartShowLegend;
  lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
  lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
  lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
  lineChartYAxisLabel = chartsData.lineChartYAxisLabel;
  lineChartColorScheme = chartsData.lineChartColorScheme;

  // line, area
  lineChartView: any[] = [500, 400];
  lineChartAutoScale = chartsData.lineChartAutoScale;
  lineChartLineInterpolation = chartsData.lineChartLineInterpolation;

  constructor() {
    Object.assign(this, { lineChartMulti })
  }

  onSelect(event) {
    console.log(event);
  }

}
