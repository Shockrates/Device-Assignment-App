export class DeviceType {

    name: string;
    _id?: any

    constructor(name: string, _id?: any) {

        this.name = name;
        this._id = _id;
    }

}

export interface DeviceTypeApiResponse {
    deviceTypes: DeviceType[];
}
