import { Dispatch, SetStateAction } from "react";
import { Button, Stack } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Category } from "./Category";

interface Props {
  categories: Category[];
  handleDelete: (id: string) => Promise<void>;
  editCategory: Dispatch<SetStateAction<Category | null>>;
}

function CategoryTable({ categories, handleDelete, editCategory }: Props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="noPrint">#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(({ id, name }, index) => (
          <tr key={id}>
            <td className="noPrint">{index + 1}</td>
            <td>{name}</td>
            <td className="noPrint">
              <Stack gap={2} direction="horizontal">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => editCategory(categories[index])}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              </Stack>
            </td>
          </tr>
        ))}
        {categories.length == 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              Nothing here.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default CategoryTable;
