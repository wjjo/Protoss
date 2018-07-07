import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav-link',
  templateUrl: './side-nav-link.component.html',
  styleUrls: ['./side-nav-link.component.scss']
})
export class SideNavLinkComponent implements OnInit {

  @Input() name = 'test';

  constructor() {
  }

  ngOnInit() {
  }

}
