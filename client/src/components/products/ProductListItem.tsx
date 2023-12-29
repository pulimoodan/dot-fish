import { BlockStack, Button, InlineStack, ResourceItem, Text, TextField, Thumbnail } from '@shopify/polaris';
import { OrderProduct, Product } from '../../types/Product';
import { AddMajor, MinusMajor } from '@shopify/polaris-icons';

interface Props {
    item: Product;
    products: OrderProduct[];
    setProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
}

export default function ProductListItem({ item, products, setProducts }: Props) {
    const { id, name, sale } = item;
    const media = <Thumbnail source={'https://picsum.photos/seed/picsum/50/50'} alt={name} size="small" />;

    const addItem = (product: Product) => {
        setProducts(state => [...state, { product, quantity: 0.5 }]);
    };

    const adjustQuantity = (id: string, action: 'decrease' | 'increase') => {
        let tempProducts = products;
        tempProducts = tempProducts.filter(t => {
            if (t.product.id == id) {
                if (action == 'decrease') t.quantity -= 0.5;
                else if (action == 'increase') t.quantity += 0.5;
                if (t.quantity == 0) return;
            }
            return t;
        });

        setProducts([...tempProducts]);
    };

    return (
        <ResourceItem onClick={() => {}} id={id} media={media} accessibilityLabel={`View details for ${name}`} verticalAlignment="center">
            <InlineStack align="space-between">
                <BlockStack gap="025" align="start">
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                    </Text>
                    {products.find(p => p.product.id == id)?.quantity ? (
                        <div>₹ {sale * (products.find(p => p.product.id == id)?.quantity || 0) * 2}</div>
                    ) : (
                        <div>₹ {sale} / 500 g</div>
                    )}
                </BlockStack>

                {products.find(p => p.product.id == id)?.quantity ? (
                    <div style={{ maxWidth: '150px' }}>
                        <TextField
                            label="Quantity"
                            labelHidden
                            suffix="kg"
                            type="number"
                            value={products.find(p => p.product.id == id)?.quantity.toString()}
                            onChange={() => {}}
                            autoComplete="off"
                            readOnly
                            connectedLeft={<Button icon={MinusMajor} onClick={() => adjustQuantity(id, 'decrease')}></Button>}
                            connectedRight={<Button icon={AddMajor} onClick={() => adjustQuantity(id, 'increase')}></Button>}
                        />
                    </div>
                ) : (
                    <Button icon={AddMajor} variant="primary" onClick={() => addItem(item)}></Button>
                )}
            </InlineStack>
        </ResourceItem>
    );
}
