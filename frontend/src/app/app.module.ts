import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeInfoComponent } from './employee/employee-info/employee-info.component';
import { EmployeeInputComponent } from './employee/employee-input/employee-input.component';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';
import { DeviceComponent } from './device/device.component';
import { DeviceInputComponent } from './device/device-input/device-input.component';
import { DeviceInfoComponent } from './device/device-info/device-info.component';
import { AssignDeviceComponent } from './assign/assign-device/assign-device.component';
import { AssignedDevicesComponent } from './employee/assigned-devices/assigned-devices.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    EmployeeInfoComponent,
    EmployeeInputComponent,
    DeleteConfirmationComponent,
    DeviceComponent,
    DeviceInputComponent,
    DeviceInfoComponent,
    AssignDeviceComponent,
    AssignedDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
