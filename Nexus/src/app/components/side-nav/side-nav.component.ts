import { Component, OnInit, Input } from '@angular/core';
import { SideNavLink } from './side-nav-link';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  ICON_NORMAL = 'keyboard_arrow_left';
  ICON_SIMPLE = 'keyboard_arrow_right';

  @Input() toggleIcon = this.ICON_NORMAL;

  // SIMPLE : 텍스트 없이 아이콘만 표시
  showSimple = false;

  sideNavLinks: SideNavLink[] = [];

  constructor() {
  }

  ngOnInit() {
    const overviewLink: SideNavLink = {iconText: 'O', name: 'Overview', routerLink: 'overview'};
    this.sideNavLinks.push(overviewLink);

    const samplePylonLink: SideNavLink = {iconText: 'P', name: 'Pylon', routerLink: 'pylon/1'};
    this.sideNavLinks.push(samplePylonLink);
  }

  toggleStyle() {
    this.showSimple = !this.showSimple;
    this.toggleIcon = this.showSimple ? this.ICON_SIMPLE : this.ICON_NORMAL;
  }
}
