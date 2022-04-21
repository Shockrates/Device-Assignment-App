import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Device from '../models/Device';

const createDevice = (req: Request, res: Response, next: NextFunction) => {
    const { serialNumber, description, deviceType, status, datePurchased, employee } = req.body;

    const device = new Device({
        _id: new mongoose.Types.ObjectId(),
        serialNumber, description, deviceType, status, datePurchased, employee
    });

    return device
        .save()
        .then(device => res.status(201).json({ device }))
        .catch(error => res.status(500).json({ error }));
}
const readDevice = (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.params.deviceId;

    return Device
        .findById(deviceId)
        .populate('deviceType')
        .populate('employee')
        .select('-__v')
        .then((device) => (device ? res.status(200).json({ device }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }));

}

const readAllDevice = (req: Request, res: Response, next: NextFunction) => {
    return Device
        .find()
        .populate('deviceType')
        .populate('employee')
        .select('-__v')
        .then((devices) => (res.status(200).json({ devices })))
        .catch(error => res.status(500).json({ error }));

}
const updateDevice = (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.params.deviceId;

    return Device
        .findById(deviceId)
        .then((device) => {
            if (device) {
                device.set(req.body)

                return device
                    .save()
                    .then(device => res.status(201).json({ device }))
                    .catch(error => res.status(500).json({ error }));
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
const deleteDevice = (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.params.deviceId;

    return Device
        .findByIdAndDelete(deviceId)
        .then((device) => (device ? res.status(201).json({ message: `device ${device.serialNumber} deleted` }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }))


}

export default {
    createDevice,
    readDevice,
    readAllDevice,
    updateDevice,
    deleteDevice
};