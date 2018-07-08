import { Component, OnInit, Input } from '@angular/core';
import { SideNavLinkComponent } from './side-nav-link/side-nav-link.component';

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

  sideNavLinks: SideNavLinkComponent[] = [];

  constructor() {
  }

  ngOnInit() {
    const overviewLink: SideNavLinkComponent = new SideNavLinkComponent();
    this.sideNavLinks.push(overviewLink);
    overviewLink.pageUrl = 'overview';
    overviewLink.name = 'Overview';
    overviewLink.iconText = 'O';

    const samplePylonLink: SideNavLinkComponent = new SideNavLinkComponent();
    samplePylonLink.id = 1;
    samplePylonLink.pageUrl = 'pylon/1';
    samplePylonLink.name = 'SamplePylon';
    samplePylonLink.iconText = 'P';
    this.sideNavLinks.push(samplePylonLink);
  }

  toggleStyle() {
    this.showSimple = !this.showSimple;
    this.toggleIcon = this.showSimple ? this.ICON_SIMPLE : this.ICON_NORMAL;

    this.sideNavLinks.forEach(link => {
      console.log('toggle');
      link.toggleShowText();
    });
  }
}
