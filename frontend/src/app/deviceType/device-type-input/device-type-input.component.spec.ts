import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeInputComponent } from './device-type-input.component';

describe('DeviceTypeInputComponent', () => {
  let component: DeviceTypeInputComponent;
  let fixture: ComponentFixture<DeviceTypeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
