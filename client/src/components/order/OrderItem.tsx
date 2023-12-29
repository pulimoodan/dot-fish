import { BlockStack, Button, InlineStack, ResourceItem, Text, TextField, Thumbnail } from '@shopify/polaris';
import { OrderProduct } from '../../types/Product';
import { AddMajor, MinusMajor } from '@shopify/polaris-icons';

interface Props {
    item: OrderProduct;
    index: number;
    products: OrderProduct[];
    setProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
}

export default function OrderItem({ item, index, products, setProducts }: Props) {
    const { product, quantity } = item;
    const media = <Thumbnail source={'https://picsum.photos/seed/picsum/50/50'} alt={product.name} size="small" />;

    const adjustQuantity = (index: number, action: 'decrease' | 'increase') => {
        let tempProducts = products;
        if (action == 'decrease') tempProducts[index].quantity -= 0.5;
        else if (action == 'increase') tempProducts[index].quantity += 0.5;
        if (tempProducts[index].quantity == 0) {
            tempProducts.splice(index, 1);
        }
        setProducts([...tempProducts]);
    };

    return (
        <ResourceItem onClick={() => {}} id={product.id} media={media} accessibilityLabel={`View details for ${product.name}`} verticalAlignment="center">
            <InlineStack align="space-between">
                <BlockStack gap="025" align="start">
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {product.name}
                    </Text>
                    <div>₹ {product.sale * item.quantity * 2}</div>
                </BlockStack>
                <div style={{ maxWidth: '150px' }}>
                    <TextField
                        label="Quantity"
                        labelHidden
                        suffix="kg"
                        type="number"
                        value={quantity.toString()}
                        onChange={() => {}}
                        autoComplete="off"
                        readOnly
                        connectedLeft={<Button icon={MinusMajor} onClick={() => adjustQuantity(index, 'decrease')}></Button>}
                        connectedRight={<Button icon={AddMajor} onClick={() => adjustQuantity(index, 'increase')}></Button>}
                    />
                </div>
            </InlineStack>
        </ResourceItem>
    );
}
