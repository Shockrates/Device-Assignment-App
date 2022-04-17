import mongoose, { Document, Schema } from "mongoose";

export interface IIdCounter extends Document {
    _id: string,
    sequence_value: number
}

const IdCounterSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            default: '',
            required: true
        },
        sequence_value: {
            type: Number,
            default: 1
        }
    });

export default mongoose.model<IIdCounter>("IdCounter", IdCounterSchema);
