import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceType, DeviceTypeApiResponse } from '../models/device-type.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceTypeService {
    deviceTypeList: DeviceType[] = [];
    baseUrl: String = 'http://localhost:9090/devicetypes/';

    constructor(private http: HttpClient) { }

    //API Call to fetch all DeviceTpes from backend. Response contains assign devices _id only
    getAllDeviceTypes(): Observable<DeviceTypeApiResponse> {
        return this.http.get<DeviceTypeApiResponse>(`${this.baseUrl}`);
    }

    //API Call to fetch one DeviceType ApiResponseth id from backend.
    getDeviceType(id: string): Observable<DeviceType> {
        return this.http.get<DeviceType>(`${this.baseUrl}` + id);
    }

    //Creates new DeviceType
    createDeviceType(deviceType: DeviceType): Observable<DeviceType> {
        return this.http.post<DeviceType>(`${this.baseUrl}`, deviceType);
    }

    //Updates DeviceType. Its used to assign DeviceTypes
    updateDeviceType(deviceType: DeviceType, id: string): Observable<DeviceType> {
        return this.http.patch<DeviceType>(`${this.baseUrl}` + id, deviceType);
    }

    //Deletes DeviceType
    deleteDeviceType(id: string): Observable<DeviceType> {
        return this.http.delete<DeviceType>(`${this.baseUrl}` + id);
    }
}
