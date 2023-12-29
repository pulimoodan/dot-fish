import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderModal from '../components/Orders/OrderModal';
import OrderTable from '../components/Orders/OrderTable';
import { Button, Row } from 'react-bootstrap';
import { Order } from '../components/Orders/Order';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

    const fetchOrders = async () => {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
    };

    const fetchCustomers = async () => {
        const { data } = await axios.get('/api/customers');
        setCustomers(data);
    };

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    const deleteOrder = async (id: string) => {
        await axios.delete(`/api/orders/${id}`);
        fetchOrders();
    };

    const confirmOrder = async (id: string) => {
        await axios.patch(`/api/orders/confirm/${id}`);
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
        if (!modalOpen) {
            setOrderToEdit(null);
        }
    }, [modalOpen]);

    useEffect(() => {
        if (orderToEdit) setModalOpen(true);
    }, [orderToEdit]);

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    return (
        <Row className="g-4">
            <OrderModal show={modalOpen} handleClose={() => setModalOpen(false)} orderToEdit={orderToEdit} customers={customers} products={products} />
            <Button variant="primary" className="w-auto" onClick={() => setModalOpen(true)}>
                New Order
            </Button>
            <OrderTable orders={orders} handleDelete={deleteOrder} editOrder={setOrderToEdit} confirmOrder={confirmOrder} />
        </Row>
    );
}

export default OrderPage;
