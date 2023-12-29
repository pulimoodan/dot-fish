import { BlockStack, Button, Card, Icon, InlineStack, Layout, LegacyCard, ResourceItem, ResourceList, Spinner, Text, Thumbnail } from '@shopify/polaris';
import { CircleTickMajor, CircleAlertMajor } from '@shopify/polaris-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../../types/Order';

function OrderStatus() {
    const navigate = useNavigate();
    const params = useParams();
    const [fetching, setFetching] = useState(false);
    const [order, setOrder] = useState<Order>();

    const fetchOrder = async () => {
        setFetching(true);
        const { data } = await axios.get(`/api/orders/${params.id}`);
        setOrder(data);
        setFetching(false);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Order Tracking
                    </Text>
                    <InlineStack gap="150">
                        <Button variant="primary" onClick={() => navigate('/')}>
                            New Order
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <Card>
                    <BlockStack gap="100" align="center">
                        {fetching && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Spinner />
                                </div>
                                <Text as="p" variant="bodyMd" alignment="center">
                                    Loading...
                                </Text>
                            </>
                        )}
                        {order?.status == 'pending' && (
                            <>
                                <Icon source={CircleAlertMajor} tone="success" />
                                <Text as="h1" variant="headingLg" alignment="center" tone="magic">
                                    You order is still pending!
                                </Text>
                                <Text as="p" variant="bodyMd" alignment="center">
                                    Check back later to see if your order is confirmed.
                                </Text>
                            </>
                        )}
                        {order?.status == 'confirmed' && (
                            <>
                                <Icon source={CircleTickMajor} tone="success" />
                                <Text as="h1" variant="headingLg" alignment="center" tone="success">
                                    You order is confirmed!
                                </Text>
                                <Text as="p" variant="bodyMd" alignment="center">
                                    Please wait for your order to be delivered.
                                </Text>
                            </>
                        )}
                    </BlockStack>
                </Card>
            </Layout.Section>
            {order && (
                <Layout.Section>
                    <LegacyCard>
                        <LegacyCard.Section>
                            <Text as="h2" variant="headingMd">
                                Order details
                            </Text>
                        </LegacyCard.Section>
                        <ResourceList
                            items={order?.items || []}
                            renderItem={(item, id) => (
                                <ResourceItem
                                    id={id}
                                    onClick={() => {}}
                                    media={<Thumbnail source={'https://picsum.photos/seed/picsum/50/50'} alt={item.product.name} size="small" />}>
                                    <BlockStack gap="025" align="start">
                                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                                            {item.product.name}
                                        </Text>
                                        <div>{item.quantity} kg</div>
                                    </BlockStack>
                                </ResourceItem>
                            )}></ResourceList>
                    </LegacyCard>
                </Layout.Section>
            )}
            {order && (
                <Layout.Section>
                    <Card>
                        <InlineStack align="space-between">
                            <Text as="h3" variant="bodyMd">
                                Total
                            </Text>
                            <Text as="h3" variant="headingMd">
                                ₹ {order.total}
                            </Text>
                        </InlineStack>
                    </Card>
                </Layout.Section>
            )}
        </Layout>
    );
}

export default OrderStatus;
