import { Col, Row } from 'react-bootstrap';
import ItemCard from '../components/Dashboard/ItemCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [stats, setStats] = useState({ products: 0, customers: 0, orders: 0 });

    const fetchStats = async () => {
        const { data } = await axios.get('/api/settings/stats');
        setStats(data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <Row className="g-4">
            <Col xl={4}>
                <ItemCard title="Products" value={stats.products} />
            </Col>
            <Col xl={4}>
                <ItemCard title="Customers" value={stats.customers} />
            </Col>
            <Col xl={4}>
                <ItemCard title="Orders" value={stats.orders} />
            </Col>
        </Row>
    );
}

export default HomePage;
