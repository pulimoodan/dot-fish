import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Form, ListGroup, Modal, Stack } from 'react-bootstrap';
import { Item, Order } from './Order';
import { Customer } from '../Customers/Customer';
import { Product } from '../Products/Product';

interface Props {
    show: boolean;
    handleClose: () => void;
    orderToEdit: Order | null;
    customers: Customer[];
    products: Product[];
}

function OrderModal({ show, handleClose, orderToEdit, customers, products }: Props) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [errors, setErrors] = useState({ customer: false, items: false });

    const onSubmit = async () => {
        setErrors({ customer: customer === null, items: items.length == 0 });
        if (customer === null || items.length == 0) return;
        if (orderToEdit) await updateOrder(customer, items, orderToEdit.id);
        else await addOrder(customer, items);
        handleClose();
    };

    const addOrder = async (customer: Customer, items: Item[]) => {
        await axios.post('/api/orders', {
            customerId: customer.id,
            items: items.map(({ product, quantity }) => {
                return { productId: product.id, quantity };
            }),
        });
    };

    const updateOrder = async (customer: Customer, items: Item[], id: string) => {
        await axios.patch(`/api/orders/${id}`, {
            customer,
            items: items.map(({ product, quantity }) => {
                return { productId: product.id, quantity };
            }),
        });
    };

    const changeQuantity = (index: number, value: number) => {
        let tempData = items;
        tempData[index].quantity += value;
        setItems([...tempData]);
    };

    const deleteItem = (index: number) => {
        let tempData = items;
        tempData.splice(index, 1);
        setItems([...tempData]);
    };

    useEffect(() => {
        if (orderToEdit) {
            setCustomer(orderToEdit.customer);
            setItems(orderToEdit.items);
        } else {
            setCustomer(null);
            setItems([]);
        }
    }, [orderToEdit]);

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{orderToEdit ? 'Edit' : 'New'} Order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Customer</Form.Label>
                    <Form.Select onChange={e => setCustomer(customers[Number(e.target.value)])} value={customers.indexOf(customer as Customer)}>
                        <option value="">Select customer</option>
                        {customers.map(({ name }, index) => (
                            <option value={index}>{name}</option>
                        ))}
                    </Form.Select>
                    {errors.customer && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Products</Form.Label>
                    <Form.Select
                        onChange={function (e) {
                            setItems(state => [...state, { product: products[Number(e.target.value)], quantity: 1 }]);
                            e.target.value = '';
                        }}>
                        <option value="">Select Products</option>
                        {products.map(({ name }, index) => (
                            <option value={index}>{name}</option>
                        ))}
                    </Form.Select>
                    {errors.items && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>

                <ListGroup>
                    {items.map(({ product, quantity }, index) => (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <Button size="sm" variant="danger" onClick={() => deleteItem(index)}>
                                X
                            </Button>
                            {product.name}
                            <Stack direction="horizontal" gap={1}>
                                <Button size="sm" variant="secondary" onClick={() => changeQuantity(index, -0.5)}>
                                    -
                                </Button>
                                <Badge bg="primary" pill>
                                    {quantity}
                                </Badge>
                                <Button size="sm" variant="secondary" onClick={() => changeQuantity(index, 0.5)}>
                                    +
                                </Button>
                                kg
                            </Stack>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                    {orderToEdit ? 'Save' : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderModal;
