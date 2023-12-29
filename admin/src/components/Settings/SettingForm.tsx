import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Setting } from './Setting';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

interface Props {
    setting: Setting;
}

function SettingForm({ setting }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = useForm<Setting>();

    const onSubmit: SubmitHandler<Setting> = async input => {
        await axios.patch(`/api/settings/${setting.id}`, input);
    };

    useEffect(() => {
        setValue('margin', setting.margin);
        setValue('cleaning', setting.cleaning);
    }, [setting]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Margin</Form.Label>
                <Form.Control {...register('margin', { required: true })} placeholder="Enter margin percentage" />
                {errors.margin && <Form.Text className="text-danger">This field is required</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Cleaning Rate</Form.Label>
                <Form.Control {...register('cleaning', { required: true })} placeholder="Enter cleaning rate" />
                {errors.cleaning && <Form.Text className="text-danger">This field is required</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!isDirty}>
                Save
            </Button>
        </Form>
    );
}

export default SettingForm;
