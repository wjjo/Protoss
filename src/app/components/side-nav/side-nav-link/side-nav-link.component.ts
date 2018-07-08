import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav-link',
  templateUrl: './side-nav-link.component.html',
  styleUrls: ['./side-nav-link.component.scss']
})
export class SideNavLinkComponent implements OnInit {

  id = -1;
  name = 'unknown';
  pageUrl = 'pylon/' + this.id;
  showText = false;
  iconText = '';

  constructor() {
  }

  ngOnInit() {
  }

  toggleShowText() {
    console.log(this.showText);
    this.showText = !this.showText;
  }
}
