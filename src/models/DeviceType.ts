import mongoose, { Document, Schema } from "mongoose";

//mongoose

export interface IDeviceType {
    name: String;
}

export interface IDeviceTypeModel extends IDeviceType, Document {

}

const DeviceTypeSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDeviceTypeModel>('DeviceType', DeviceTypeSchema);