import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import DeviceType from '../models/DeviceType';

const createDeviceType = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const deviceType = new DeviceType({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return deviceType
        .save()
        .then(deviceType => res.status(201).json({ deviceType }))
        .catch(error => res.status(500).json({ error }));
}
const readDeviceType = (req: Request, res: Response, next: NextFunction) => {
    const deviceTypeId = req.params.deviceTypeId;

    return DeviceType
        .findById(deviceTypeId)
        .then((deviceType) => (deviceType ? res.status(200).json({ deviceType }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }));

}

const readAllDeviceType = (req: Request, res: Response, next: NextFunction) => {
    return DeviceType
        .find()
        .then((deviceTypes) => (res.status(200).json({ deviceTypes })))
        .catch(error => res.status(500).json({ error }));

}
const updateDeviceType = (req: Request, res: Response, next: NextFunction) => {
    const deviceTypeId = req.params.deviceTypeId;

    return DeviceType
        .findById(deviceTypeId)
        .then((deviceType) => {
            if (deviceType) {
                deviceType.set(req.body)

                return deviceType
                    .save()
                    .then(deviceType => res.status(201).json({ deviceType }))
                    .catch(error => res.status(500).json({ error }));
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
const deleteDeviceType = (req: Request, res: Response, next: NextFunction) => {
    const deviceTypeId = req.params.deviceTypeId;

    return DeviceType
        .findByIdAndUpdate(deviceTypeId)
        .then((deviceType) => (deviceType ? res.status(201).json({ message: `deviceType ${deviceType.name} deleted` }) : res.status(404).json({ message: 'not found' })))
        .catch(error => res.status(500).json({ error }))


}

export default {
    createDeviceType,
    readDeviceType,
    readAllDeviceType,
    updateDeviceType,
    deleteDeviceType
};