import mongoose, { Document, Schema } from "mongoose";
import Counter, { IIdCounter } from "./IdCounter"


export interface IEmployee {
    employeeId: number;
    name: String;
    email: String;

}

export interface IEmployeeModel extends IEmployee, Document {

}

const EmployeeSchema: Schema = new Schema(
    {
        employeeId: {
            type: Number,
            //required: true,
            unique: true

        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 3,

        },
        email: {
            type: String,
            required: true,
            unique: true
        }

    },
    {
        timestamps: true
    }

);

EmployeeSchema.pre<IEmployeeModel>('save', function (next) {
    var doc = this;

    Counter.findByIdAndUpdate({ _id: 'employeeId' }, { $inc: { sequence_value: 1 } }, { new: true })
        .then(async (counter) => {
            if (counter) {
                doc.employeeId = counter.sequence_value;
                //console.log(counter.sequence_value);
            } else {
                const newCounter: IIdCounter = new Counter({
                    _id: 'employeeId',
                    sequence_value: 1
                })
                await newCounter.save().then(
                    (res) => {
                        doc.employeeId = res.sequence_value;
                    }
                )
            }
            next();
        })



});

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);