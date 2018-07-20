
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';
import '../polyfills';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WebviewDirective } from './directives/webview.directive';
import { ElectronService } from './providers/electron.service';
import { NewPylonModalComponent } from './components/common/new-pylon-modal/new-pylon-modal.component';
import { InstallComponent } from './components/install/install.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ServerMonitorComponent } from './components/server-monitor/server-monitor.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import {APP_BASE_HREF} from '@angular/common';
import { NGXChartsComponent } from './components/chart/ngx-charts/ngx-charts.component';
import { MemoryPieChartComponent } from './components/chart/memory-pie-chart/memory-pie-chart.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    NewPylonModalComponent,
    InstallComponent,
    ServerMonitorComponent,
    MonitorComponent,
    NGXChartsComponent,
    MemoryPieChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxDnDModule,
    NgxChartsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ElectronService, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
