import axios from 'axios';
import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Customer } from './Customer';

interface Props {
    show: boolean;
    handleClose: () => void;
    customerToEdit: Customer | null;
}

interface Inputs {
    name: string;
    mobile: number;
    address: string;
    location: string;
}

function CustomerModal({ show, handleClose, customerToEdit }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async input => {
        if (customerToEdit) await updateCustomer(input, customerToEdit.id);
        else await addCustomer(input);
        handleClose();
    };

    const addCustomer = async (input: Inputs) => {
        await axios.post('/api/customers', input);
    };

    const updateCustomer = async (input: Inputs, id: string) => {
        await axios.patch(`/api/customers/${id}`, input);
    };

    useEffect(() => {
        if (customerToEdit) {
            setValue('name', customerToEdit.name);
            setValue('mobile', customerToEdit.mobile);
            setValue('address', customerToEdit.address);
            setValue('location', customerToEdit.location);
        } else {
            reset();
        }
    }, [customerToEdit]);

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{customerToEdit ? 'Edit' : 'New'} Customer</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control {...register('name', { required: true })} placeholder="Enter customer name" />
                        {errors.name && <Form.Text className="text-danger">This field is required</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control {...register('mobile', { required: true })} placeholder="Enter customer mobile" />
                        {errors.mobile && <Form.Text className="text-danger">This field is required</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control {...register('address', { required: true })} placeholder="Enter customer address" />
                        {errors.address && <Form.Text className="text-danger">This field is required</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Location</Form.Label>
                        <Form.Control {...register('location', { required: true })} placeholder="Enter customer location" />
                        {errors.location && <Form.Text className="text-danger">This field is required</Form.Text>}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {customerToEdit ? 'Save' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CustomerModal;
