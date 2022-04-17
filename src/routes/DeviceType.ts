import express from 'express';
import controller from '../controllers/DeviceType';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.deviceType.create), controller.createDeviceType);
router.get('/:deviceTypeId', controller.readDeviceType);
router.get('/', controller.readAllDeviceType);
router.patch('/:deviceTypeId', ValidateSchema(Schemas.deviceType.update), controller.updateDeviceType);
router.delete('/:deviceTypeId', controller.deleteDeviceType);

export = router;