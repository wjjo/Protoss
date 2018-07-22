import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSparklineComponent } from './resource-sparkline.component';

describe('ResourceSparklineComponent', () => {
  let component: ResourceSparklineComponent;
  let fixture: ComponentFixture<ResourceSparklineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceSparklineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
