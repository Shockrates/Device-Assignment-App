import express from 'express';
import controller from '../controllers/Employee';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.employee.create), controller.createEmployee);
router.get('/:employeeId', controller.readEmployee);
router.get('/', controller.readAllEmployee);
router.patch('/:employeeId', ValidateSchema(Schemas.employee.update), controller.updateEmployee);
router.delete('/:employeeId', controller.deleteEmployee);

router.post('/validate', controller.checkIfUsernameExists);

export = router;