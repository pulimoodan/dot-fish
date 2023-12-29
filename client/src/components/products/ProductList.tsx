import { ResourceList, Text, LegacyFilters, InlineStack, Button, Layout, Badge, Tabs, LegacyCard, RangeSlider } from '@shopify/polaris';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { OrderProduct, Product } from '../../types/Product';
import { Category } from '../../types/Category';
import ProductListItem from './ProductListItem';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductList() {
    const location = useLocation();
    const [products, setProducts] = useState<Product[]>([]);
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(location.state?.items ? location.state?.items : []);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState([50, 500]);
    const navigate = useNavigate();

    const fetchProducts = async (name = '') => {
        const query = {
            name,
            categoryId: category != 0 ? categories[category - 1].id : '',
            priceMin: priceRange[0].toString(),
            priceMax: priceRange[1].toString(),
        };
        const { data } = await axios.get(`/api/products?${new URLSearchParams(query).toString()}`);
        setProducts(data);
    };

    const fetchCategories = async () => {
        const { data } = await axios.get(`/api/categories`);
        setCategories(data);
    };

    useMemo(() => {
        fetchProducts(search);
    }, [search]);

    useMemo(() => {
        fetchProducts();
    }, [category]);

    useMemo(() => {
        fetchProducts();
    }, [priceRange]);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Select Products
                    </Text>
                    <InlineStack gap="150">
                        <Badge tone="warning-strong">{orderProducts.length.toString()}</Badge>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/confirm', { state: { items: orderProducts } })}
                            disabled={orderProducts.length == 0}>
                            Place order
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <LegacyCard>
                    <LegacyCard.Section>
                        <LegacyFilters
                            queryPlaceholder="Search products"
                            queryValue={search}
                            onQueryChange={value => setSearch(value)}
                            filters={[]}
                            onQueryClear={() => setSearch('')}
                            onClearAll={() => {}}></LegacyFilters>
                    </LegacyCard.Section>
                    <Tabs
                        selected={category}
                        tabs={[
                            { content: 'All', id: '' },
                            ...categories.map(i => {
                                return { content: i.name, id: i.id };
                            }),
                        ]}
                        onSelect={value => setCategory(value)}></Tabs>
                    <LegacyCard.Section>
                        <InlineStack align="space-between">
                            <Text as="h3" variant="headingMd">
                                Price range
                            </Text>
                            <Text as="h3" variant="bodyMd">
                                ₹{priceRange.join(' - ₹')}
                            </Text>
                        </InlineStack>
                        <RangeSlider
                            output
                            // @ts-ignore
                            value={priceRange}
                            prefix={'₹'}
                            min={0}
                            max={1000}
                            step={10}
                            onChange={(value: [number, number]) => {
                                setPriceRange(value);
                            }}
                        />
                    </LegacyCard.Section>
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
                        renderItem={item => {
                            return <ProductListItem item={item} products={orderProducts} setProducts={setOrderProducts} />;
                        }}
                    />
                </LegacyCard>
            </Layout.Section>
        </Layout>
    );
}
