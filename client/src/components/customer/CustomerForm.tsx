import { Button, Card, FormLayout, InlineStack, Layout, LegacyCard, Text, TextField } from '@shopify/polaris';
import { TickMinor } from '@shopify/polaris-icons';
import axios from 'axios';
import { useState } from 'react';
import { Customer } from '../../types/Customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderProduct } from '../../types/Product';

function CustomerForm() {
    const location = useLocation();

    const products: OrderProduct[] = location.state?.items ? location.state?.items : [];
    const payment = location.state?.payment;
    const slot = location.state?.slot;

    const [mobile, setMobile] = useState(location.state?.customer ? location.state?.customer?.mobile : '');
    const [saved, setSaved] = useState(false);
    const [customer, setCustomer] = useState<Customer>(
        location.state?.customer
            ? location.state?.customer
            : {
                  id: '',
                  name: '',
                  mobile: '',
                  address: '',
                  location: '',
              },
    );
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();

    const fetchCustomer = async () => {
        setFetching(true);
        const { data } = await axios.get(`/api/customers/mobile/${mobile}`);
        if (data) {
            setCustomer(data);
            setSaved(true);
        } else {
            setCustomer(state => {
                return { ...state, id: '1' };
            });
        }
        setFetching(false);
    };

    const updateCustomer = async () => {
        setFetching(true);
        const { data } = await axios.patch(`/api/customers/mobile/${mobile}`, { name: customer.name, address: customer.address, location: customer.location });
        setCustomer(data);
        setSaved(true);
        setFetching(false);
    };

    return (
        <Layout>
            <Layout.Section>
                <InlineStack align="space-between">
                    <Text as="h1" variant="headingLg">
                        Select Products
                    </Text>
                    <InlineStack gap="150">
                        <Button onClick={() => navigate('/details', { state: { items: products, slot, payment } })}>Go back</Button>
                        <Button
                            variant="primary"
                            disabled={!saved}
                            onClick={() =>
                                navigate('/completed', {
                                    state: {
                                        customer,
                                        items: products,
                                        slot,
                                        payment,
                                    },
                                })
                            }>
                            Next
                        </Button>
                    </InlineStack>
                </InlineStack>
            </Layout.Section>
            <Layout.Section>
                <Card>
                    <TextField
                        label="Mobile number"
                        type="text"
                        inputMode="tel"
                        autoComplete=""
                        value={mobile}
                        onChange={value => setMobile(value)}
                        connectedRight={<Button variant="primary" icon={TickMinor} onClick={fetchCustomer} loading={fetching}></Button>}
                    />
                </Card>
            </Layout.Section>
            {customer?.id && (
                <Layout.Section>
                    <LegacyCard
                        primaryFooterAction={{
                            content: 'Save',
                            onAction: updateCustomer,
                            disabled: !customer.name.trim() || !customer.address.trim() || !customer.location.trim(),
                        }}>
                        <LegacyCard.Section>
                            <Text as="h2" variant="headingMd">
                                Delivery details
                            </Text>
                        </LegacyCard.Section>
                        <LegacyCard.Section>
                            <FormLayout>
                                <TextField
                                    label="Name"
                                    type="text"
                                    autoComplete=""
                                    value={customer?.name}
                                    onChange={value =>
                                        setCustomer(state => {
                                            return { ...state, name: value };
                                        })
                                    }
                                />
                                <TextField
                                    label="Address"
                                    type="text"
                                    autoComplete=""
                                    value={customer?.address}
                                    onChange={value =>
                                        setCustomer(state => {
                                            return { ...state, address: value };
                                        })
                                    }
                                />
                            </FormLayout>
                        </LegacyCard.Section>
                    </LegacyCard>
                </Layout.Section>
            )}
        </Layout>
    );
}

export default CustomerForm;
