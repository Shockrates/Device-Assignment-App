import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Employee from '../models/Employee';

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, name, email } = req.body;

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employeeId, name, email
    });

    return employee
        .save()
        .then(employee => res.status(201).json({ employee }))
        .catch(error => res.status(500).json({ error }));
}
const readEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;

    return Employee
        .findById(employeeId)
        .then((employee) => (employee ? res.status(200).json({ employee }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }));

}

const readAllEmployee = (req: Request, res: Response, next: NextFunction) => {
    return Employee
        .find()
        .then((employees) => (res.status(200).json({ employees })))
        .catch(error => res.status(500).json({ error }));

}
const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;

    return Employee
        .findById(employeeId)
        .then((employee) => {
            if (employee) {
                employee.set(req.body)

                return employee
                    .save()
                    .then(employee => res.status(201).json({ employee }))
                    .catch(error => res.status(500).json({ error }));
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;

    return Employee
        .findByIdAndUpdate(employeeId)
        .then((employee) => (employee ? res.status(201).json({ message: `employee ${employee.name} deleted` }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }))


}

export default {
    createEmployee,
    readEmployee,
    readAllEmployee,
    updateEmployee,
    deleteEmployee
};