import express from 'express';
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomerByMobile,
    getCustomers,
    updateCustomer,
    updateCustomerOrCreate,
} from '../controller/CustomerController.js';

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.get('/mobile/:mobile', getCustomerByMobile);
router.patch('/mobile/:mobile', updateCustomerOrCreate);
router.post('/', createCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
