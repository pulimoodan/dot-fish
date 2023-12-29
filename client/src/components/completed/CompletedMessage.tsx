import { BlockStack, Button, Card, Icon, InlineStack, Layout, Text } from '@shopify/polaris';
import { CircleTickMajor } from '@shopify/polaris-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Customer } from '../../types/Customer';
import { OrderProduct } from '../../types/Product';
import axios from 'axios';
import { useState } from 'react';

function CompletedMessage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [creating, setCreating] = useState(false);
    const customer: Customer = location.state?.customer;
    const products: OrderProduct[] = location.state?.items;
    const slot = location.state?.slot;
    const payment = location.state?.payment;

    const sendToWhatsapp = async () => {
        setCreating(true);
        const items = products.map(p => {
            return { productId: p.product.id, quantity: p.quantity };
        });
        const { data } = await axios.post(`/api/orders`, {
            customerId: customer.id,
            items,
            slot,
            payment,
        });
        setCreating(false);
        const message = `I would like to place my order.%0AMy order is: %0A%0A${products.map(
            p => `${p.product.name} x ${p.quantity} = ₹ ${p.product.sale * p.quantity * 2}%0A`,
        )}
            %0ATotal = ${products.reduce((a, b) => a + b.product.sale * b.quantity * 2, 0)} %0A%0ATrack this order: ${process.env.BASE_URL}/order/${data.id}
        `;
        // @ts-ignore
        window.open(`https://api.whatsapp.com/send?phone=8943743743&text=${message}`, '_blank').focus();
    };

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Order placed
                    </Text>
                    <InlineStack gap="150">
                        <Button onClick={() => navigate('/customer', { state: { items: products, payment, slot, customer } })}>Go back</Button>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Start Over
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <Card>
                    <BlockStack gap="100" align="center">
                        <Icon source={CircleTickMajor} tone="success" />
                        <Text as="h1" variant="headingLg" alignment="center">
                            Order placed successfully!
                        </Text>
                        <Text as="p" variant="bodyMd" alignment="center">
                            Make sure to send the order to us
                        </Text>
                        <Button fullWidth={false} variant="primary" onClick={sendToWhatsapp} loading={creating}>
                            Send to Whatsapp
                        </Button>
                    </BlockStack>
                </Card>
            </Layout.Section>
        </Layout>
    );
}

export default CompletedMessage;
