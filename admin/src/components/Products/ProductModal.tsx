import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "./Product";
import { Category } from "../Categories/Category";

interface Props {
  show: boolean;
  handleClose: () => void;
  productToEdit: Product | null;
}

interface Inputs {
  name: string;
  purchase: number;
  cleaning: boolean;
}

function ProductModal({ show, handleClose, productToEdit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (!category) return setCategoryError(true);
    if (productToEdit) await updateProduct(input, productToEdit.id);
    else await addProduct(input);
    handleClose();
  };

  const addProduct = async (input: Inputs) => {
    await axios.post("/api/products", {
      ...input,
      categoryId: category,
    });
  };

  const getCategories = async () => {
    const { data } = await axios.get("/api/categories");
    setCategories(data);
  };

  const updateProduct = async (input: Inputs, id: string) => {
    await axios.patch(`/api/products/${id}`, {
      ...input,
      categoryId: category,
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setCategory(productToEdit.category.id);
      setValue("name", productToEdit.name);
      setValue("purchase", productToEdit.purchase);
      setValue("cleaning", productToEdit.cleaning);
    } else {
      reset();
    }
  }, [productToEdit]);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{productToEdit ? "Edit" : "New"} Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              {...register("name", { required: true })}
              placeholder="Enter product name"
            />
            {errors.name && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={(e) =>
                setCategory(
                  categories.find((c) => c.id == e.target.value)?.id || ""
                )
              }
              value={categories.find((c) => c.id == category)?.id}
            >
              <option value="">Select category</option>
              {categories.map(({ name, id }, index) => (
                <option value={id} key={index}>
                  {name}
                </option>
              ))}
            </Form.Select>
            {categoryError && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Purchase Price</Form.Label>
            <Form.Control
              {...register("purchase", { required: true })}
              placeholder="Enter purchase price / kg"
            />
            {errors.purchase && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Check {...register("cleaning")} label="Require cleaning" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {productToEdit ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProductModal;
