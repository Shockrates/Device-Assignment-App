import { number } from "joi";
import mongoose, { Document, Schema } from "mongoose";



export interface IDevice {
    serialNumber: string;
    description: string;
    deviceType: string;
    status: number;
    datePurchased: Date
    employee: string

}

export interface IDeviceModel extends IDevice, Document { }

const DeviceSchema: Schema = new Schema(
    {
        serialNumber: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        deviceType: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'DeviceType'
        },
        status: {
            type: Number,
            required: true,
            default: 0
        },
        datePurchased: {
            type: Date,
            required: true,
            //default: Date.now
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        },

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IDeviceModel>('Device', DeviceSchema);