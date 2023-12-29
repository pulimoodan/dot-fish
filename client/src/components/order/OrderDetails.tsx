import { Button, Card, FormLayout, InlineStack, Layout, Select, Text } from '@shopify/polaris';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderProduct } from '../../types/Product';

function OrderDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [slot, setSlot] = useState(location.state?.slot ? location.state?.slot : '');
    const [payment, setPayment] = useState(location.state?.payment ? location.state?.payment : '');
    const [date, setDate] = useState<Date>(new Date());

    const products: OrderProduct[] = location.state?.items ? location.state?.items : [];

    const getTime = async () => {
        const { data } = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        setDate(new Date(data.datetime));
    };

    useEffect(() => {
        getTime();
    }, []);

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Select Products
                    </Text>
                    <InlineStack gap="150">
                        <Button onClick={() => navigate('/confirm')}>Go back</Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/customer', { state: { items: products, payment, slot } })}
                            disabled={!slot.trim() || !payment.trim()}>
                            Next
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <Card>
                    <FormLayout>
                        <Select
                            label="Delivery slot"
                            options={[
                                { label: 'Select one', value: '' },
                                {
                                    label: '10AM-12PM',
                                    value: '1',
                                    disabled: date > new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 08:30`),
                                },
                                {
                                    label: '2PM-4PM',
                                    value: '2',
                                    disabled: date > new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 11:30`),
                                },
                                {
                                    label: '5PM-7PM',
                                    value: '3',
                                    disabled: date > new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 14:00`),
                                },
                            ]}
                            value={slot}
                            onChange={value => setSlot(value)}
                            helpText={
                                date > new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 2:00`)
                                    ? 'All slots will be unavailble after 2 PM. Please check back tomorrow.'
                                    : ''
                            }
                        />
                        <Select
                            label="Payment method"
                            options={[
                                { label: 'Select one', value: '' },
                                { label: 'Cash on delivery', value: 'cash' },
                                { label: 'Online', value: 'online' },
                            ]}
                            value={payment}
                            onChange={value => setPayment(value)}
                        />
                    </FormLayout>
                </Card>
            </Layout.Section>
        </Layout>
    );
}

export default OrderDetails;
