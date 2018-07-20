import * as shape from 'd3-shape';

//Line Charts

// export const lineChartView: any[] = [550, 400];

// options
export const lineChartShowXAxis = true;
export const lineChartShowYAxis = true;
export const lineChartGradient = false;
export const lineChartShowLegend = false;
export const lineChartShowXAxisLabel = true;
export const lineChartXAxisLabel = 'Country';
export const lineChartShowYAxisLabel = true;
export const lineChartYAxisLabel = 'Population';

export const lineChartColorScheme = {
    domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
};

// line, area
export const lineChartAutoScale = true;
export const lineChartLineInterpolation = shape.curveBasis;
