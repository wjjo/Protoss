import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMonitorComponent } from './server-monitor.component';

describe('ServerMonitorComponent', () => {
  let component: ServerMonitorComponent;
  let fixture: ComponentFixture<ServerMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
