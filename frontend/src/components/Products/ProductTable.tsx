import { Dispatch, SetStateAction } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Product } from './Product';

interface Props {
    products: Product[];
    handleDelete: (id: string) => Promise<void>;
    editProduct: Dispatch<SetStateAction<Product | null>>;
}

function ProductTable({ products, handleDelete, editProduct }: Props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="noPrint">#</th>
                    <th>Name</th>
                    <th className="noPrint">Purchase Price</th>
                    <th>Sale Price</th>
                    <th className="noPrint">Require Cleaning</th>
                    <th className="noPrint">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(({ id, name, purchase, sale, cleaning }, index) => (
                    <tr key={id}>
                        <td className="noPrint">{index + 1}</td>
                        <td>{name}</td>
                        <td className="noPrint">{purchase}</td>
                        <td>₹ {sale} / kg</td>
                        <td className="noPrint">{cleaning ? 'Yes' : 'No'}</td>
                        <td className="noPrint">
                            <Stack gap={2} direction="horizontal">
                                <Button variant="primary" size="sm" onClick={() => editProduct(products[index])}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                                    Delete
                                </Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
                {products.length == 0 && (
                    <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                            Nothing here.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default ProductTable;
