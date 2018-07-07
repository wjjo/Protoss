import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PylonComponent } from './pylon.component';

describe('PylonComponent', () => {
  let component: PylonComponent;
  let fixture: ComponentFixture<PylonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PylonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PylonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
