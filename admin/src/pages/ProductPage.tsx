import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from '../components/Products/ProductModal';
import ProductTable from '../components/Products/ProductTable';
import { Button, Row } from 'react-bootstrap';
import { Product } from '../components/Products/Product';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    const deleteProduct = async (id: string) => {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
        if (!modalOpen) {
            setProductToEdit(null);
        }
    }, [modalOpen]);

    useEffect(() => {
        if (productToEdit) setModalOpen(true);
    }, [productToEdit]);

    return (
        <Row className="g-4">
            <ProductModal show={modalOpen} handleClose={() => setModalOpen(false)} productToEdit={productToEdit} />
            <Button variant="primary" className="w-auto noPrint" onClick={() => setModalOpen(true)}>
                New Product
            </Button>
            <ProductTable products={products} handleDelete={deleteProduct} editProduct={setProductToEdit} />
        </Row>
    );
}

export default ProductPage;
