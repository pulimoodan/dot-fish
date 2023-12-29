import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import { Category } from "../components/Categories/Category";
import CategoryModal from "../components/Categories/CategoryModal";
import CategoryTable from "../components/Categories/CategoryTable";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const fetchCategories = async () => {
    const { data } = await axios.get("/api/categories");
    setCategories(data);
  };

  const deleteCategory = async (id: string) => {
    await axios.delete(`/api/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
    if (!modalOpen) {
      setCategoryToEdit(null);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (categoryToEdit) setModalOpen(true);
  }, [categoryToEdit]);

  return (
    <Row className="g-4">
      <CategoryModal
        show={modalOpen}
        handleClose={() => setModalOpen(false)}
        categoryToEdit={categoryToEdit}
      />
      <Button
        variant="primary"
        className="w-auto noPrint"
        onClick={() => setModalOpen(true)}
      >
        New Category
      </Button>
      <CategoryTable
        categories={categories}
        handleDelete={deleteCategory}
        editCategory={setCategoryToEdit}
      />
    </Row>
  );
}

export default CategoryPage;
