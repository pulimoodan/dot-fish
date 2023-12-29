import { Dispatch, SetStateAction } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Order } from './Order';

interface Props {
    orders: Order[];
    handleDelete: (id: string) => Promise<void>;
    confirmOrder: (id: string) => Promise<void>;
    editOrder: Dispatch<SetStateAction<Order | null>>;
}

function OrderTable({ orders, handleDelete, editOrder, confirmOrder }: Props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Slot</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(({ id, customer, createdAt, slot, status, payment, total, items }, index) => (
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{new Date(createdAt).toLocaleDateString()}</td>
                        <td>{customer.name}</td>
                        <td>{items.map(i => `${i.product?.name} x ${i.quantity} kg`).join(', ')}</td>
                        <td>{slot}</td>
                        <td>{status}</td>
                        <td>{payment}</td>
                        <td>Rs {total}</td>
                        <td>
                            <Stack gap={2} direction="horizontal">
                                <Button variant="primary" size="sm" onClick={() => editOrder(orders[index])}>
                                    Edit
                                </Button>
                                {status == 'pending' && (
                                    <Button variant="success" size="sm" onClick={() => confirmOrder(id)}>
                                        Confirm
                                    </Button>
                                )}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                                    Delete
                                </Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
                {orders.length == 0 && (
                    <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                            Nothing here.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default OrderTable;
