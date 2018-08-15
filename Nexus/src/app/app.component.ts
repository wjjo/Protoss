import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
  ) {
    translate.setDefaultLang('en');

    // TODO : 추후에는 넥서스 최초 실행인지, 관리되고 있는 서비스 구성 있는지 확인하여 초기화면 결정
    // router.navigate(['home']);
    router.navigate(['home']);
  }

  minimize() {
    const { remote } = require('electron');
    remote.getCurrentWindow().minimize();
  }

  close() {
    const { remote } = require('electron');
    remote.getCurrentWindow().close();
  }
}
