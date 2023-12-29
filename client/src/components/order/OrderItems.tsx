import { Button, Card, InlineStack, Layout, LegacyCard, ResourceList, Text } from '@shopify/polaris';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderProduct } from '../../types/Product';
import OrderItem from './OrderItem';

function OrderItems() {
    const location = useLocation();
    const [products, setProducts] = useState<OrderProduct[]>(location.state?.items ? location.state?.items : []);
    const navigate = useNavigate();

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Confirm Order
                    </Text>
                    <InlineStack gap="150">
                        <Button onClick={() => navigate('/', { state: products })}>Go back</Button>
                        <Button variant="primary" disabled={products.length == 0} onClick={() => navigate('/details', { state: { items: products } })}>
                            Confirm
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <LegacyCard>
                    <ResourceList
                        emptyState={
                            <LegacyCard.Section subdued>
                                <InlineStack align="center">
                                    <Text as="h2" variant="bodyMd">
                                        Nothing found
                                    </Text>
                                </InlineStack>
                            </LegacyCard.Section>
                        }
                        resourceName={{ singular: 'product', plural: 'products' }}
                        items={products}
                        renderItem={(item, _itemId, index) => {
                            return <OrderItem item={item} index={index} products={products} setProducts={setProducts} />;
                        }}
                    />
                </LegacyCard>
            </Layout.Section>
            <Layout.Section>
                <Card>
                    <InlineStack align="space-between">
                        <Text as="h3" variant="bodyMd">
                            Total
                        </Text>
                        <Text as="h3" variant="headingMd">
                            ₹ {products.reduce((a, b) => a + b.product.sale * b.quantity, 0) * 2}
                        </Text>
                    </InlineStack>
                </Card>
            </Layout.Section>
        </Layout>
    );
}

export default OrderItems;
