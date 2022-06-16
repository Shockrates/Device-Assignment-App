import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceInfoComponent } from './device/device-info/device-info.component';
import { DeviceComponent } from './device/device.component';
import { DeviceTypeComponent } from './deviceType/device-type/device-type.component';
import { EmployeeInfoComponent } from './employee/employee-info/employee-info.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
    { path: '', component: EmployeeComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'deviceTypes', component: DeviceTypeComponent },
    { path: 'employee/:id', component: EmployeeInfoComponent },
    { path: 'device/:id', component: DeviceInfoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
