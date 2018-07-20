import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageManageService {
  visitedUrl: string[] = [];

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.visitedUrl.push(event.url);
        console.log(event.url);
      }

    });
  }

  goPrevious() {
    if (this.visitedUrl.length === 0) {
      this.router.navigate(['']);
    } else if (this.visitedUrl.length === 1) {
      this.visitedUrl.pop();
      this.router.navigate(['']);
    } else {
      this.visitedUrl.pop();
      this.router.navigate([this.visitedUrl.pop()]);
    }
  }

  goNext() {
  }
}
