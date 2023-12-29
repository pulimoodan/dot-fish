import express from 'express';
import { confirmOrder, createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from '../controller/OrderController.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/confirm/:id', confirmOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
