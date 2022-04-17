import express from 'express';
import controller from '../controllers/Device';

const router = express.Router();

router.post('/', controller.createDevice);
router.get('/:deviceId', controller.readDevice);
router.get('/', controller.readAllDevice);
router.patch('/:deviceId', controller.updateDevice);
router.delete('/:deviceId', controller.deleteDevice);

export = router;