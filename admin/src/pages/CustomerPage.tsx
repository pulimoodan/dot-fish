import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerModal from '../components/Customers/CustomerModal';
import CustomerTable from '../components/Customers/CustomerTable';
import { Button, Row } from 'react-bootstrap';
import { Customer } from '../components/Customers/Customer';

function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);

    const fetchCustomers = async () => {
        const { data } = await axios.get('/api/customers');
        setCustomers(data);
    };

    const deleteCustomer = async (id: string) => {
        await axios.delete(`/api/customers/${id}`);
        fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
        if (!modalOpen) {
            setCustomerToEdit(null);
        }
    }, [modalOpen]);

    useEffect(() => {
        if (customerToEdit) setModalOpen(true);
    }, [customerToEdit]);

    return (
        <Row className="g-4">
            <CustomerModal show={modalOpen} handleClose={() => setModalOpen(false)} customerToEdit={customerToEdit} />
            <Button variant="primary" className="w-auto" onClick={() => setModalOpen(true)}>
                New Customer
            </Button>
            <CustomerTable customers={customers} handleDelete={deleteCustomer} editCustomer={setCustomerToEdit} />
        </Row>
    );
}

export default CustomerPage;
