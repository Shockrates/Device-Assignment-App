import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDevicesComponent } from './assigned-devices.component';

describe('AssignedDevicesComponent', () => {
  let component: AssignedDevicesComponent;
  let fixture: ComponentFixture<AssignedDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
