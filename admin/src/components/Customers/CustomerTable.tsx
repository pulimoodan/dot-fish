import { Dispatch, SetStateAction } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Customer } from './Customer';

interface Props {
    customers: Customer[];
    handleDelete: (id: string) => Promise<void>;
    editCustomer: Dispatch<SetStateAction<Customer | null>>;
}

function CustomerTable({ customers, handleDelete, editCustomer }: Props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Locaiton</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(({ id, name, mobile, address, location }, index) => (
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{mobile}</td>
                        <td>{address}</td>
                        <td>{location}</td>
                        <td>
                            <Stack gap={2} direction="horizontal">
                                <Button variant="primary" size="sm" onClick={() => editCustomer(customers[index])}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                                    Delete
                                </Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
                {customers.length == 0 && (
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

export default CustomerTable;
