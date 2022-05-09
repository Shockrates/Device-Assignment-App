import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmptyError, map, Observable } from 'rxjs';
import { Device, DeviceApiResponse } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devicesList: Device[] = [];
  baseUrl: String = 'http://localhost:9090/devices/';

  constructor(private http: HttpClient) { }

  //API Call to fetch all Devices from backend. Response contains assign devices _id only
  getAllDevices(): Observable<DeviceApiResponse> {
    return this.http.get<DeviceApiResponse>(`${this.baseUrl}`);
  }

  //API Call to fetch one Device with id from backend. Response contains assign devices details
  getDevice(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}` + id);
  }

  //Creates new Device
  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${this.baseUrl}`, device);
  }

  //Updates Device. Its used to assign Devices to an Employee
  updateDevice(device: Device, id: string): Observable<Device> {
    return this.http.patch<Device>(`${this.baseUrl}` + id, device);
  }

  //Deletes Device
  deleteDevice(id: string): Observable<Device> {
    return this.http.delete<Device>(`${this.baseUrl}` + id);
  }

  validateEmail(serialNumber: string): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.baseUrl}/unique`, serialNumber);
  }

}
