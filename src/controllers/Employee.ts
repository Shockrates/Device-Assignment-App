import { NextFunction, Request, Response } from 'express';
import { boolean } from 'joi';
import mongoose, { Types } from 'mongoose';
import Employee from '../models/Employee';

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, name, email } = req.body;

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employeeId,
        name,
        email
    });

    return employee
        .save()
        .then((employee) => res.status(201).json({ employee }))
        .catch((error) => res.status(500).json({ error }));
};

const readEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;

    return Employee.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(employeeId) } },
        {
            $lookup: {
                from: 'devices',
                localField: '_id',
                foreignField: 'employee',
                as: 'devices_info'
            }
        }
    ])
        .then((employee) => res.status(200).json(employee[0]))
        .catch((error) => res.status(500).json({ error }));
};

const readAllEmployee = (req: Request, res: Response, next: NextFunction) => {
    return Employee.find()
        .then((employees) => res.status(200).json({ employees }))
        .catch((error) => res.status(500).json({ error }));
};
const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    return Employee.findByIdAndUpdate(employeeId, req.body, { new: true })
        .then((employee) => (employee ? res.status(201).json({ employee }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;

    return Employee.findByIdAndDelete(employeeId)
        .then((employee) => (employee ? res.status(201).json({ message: `employee ${employee.name} deleted` }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const checkIfUsernameExists = (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, name, email } = req.body;
    return Employee.findOne({ email: { $regex: `^${email}$`, $options: 'i' } })
        .then((employee) => (employee ? res.status(200).json({ exists: true }) : res.status(200).json({ exists: false })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createEmployee,
    readEmployee,
    readAllEmployee,
    updateEmployee,
    deleteEmployee,
    checkIfUsernameExists
};
