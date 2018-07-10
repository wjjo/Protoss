import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPylonModalComponent } from './new-pylon-modal.component';

describe('NewPylonModalComponent', () => {
  let component: NewPylonModalComponent;
  let fixture: ComponentFixture<NewPylonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPylonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPylonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
