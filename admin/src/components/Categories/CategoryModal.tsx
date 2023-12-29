import axios from "axios";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "./Category";

interface Props {
  show: boolean;
  handleClose: () => void;
  categoryToEdit: Category | null;
}

interface Inputs {
  name: string;
}

function CategoryModal({ show, handleClose, categoryToEdit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (categoryToEdit) await updateCategory(input, categoryToEdit.id);
    else await addCategory(input);
    handleClose();
  };

  const addCategory = async (input: Inputs) => {
    await axios.post("/api/categories", input);
  };

  const updateCategory = async (input: Inputs, id: string) => {
    await axios.patch(`/api/categories/${id}`, input);
  };

  useEffect(() => {
    if (categoryToEdit) {
      setValue("name", categoryToEdit.name);
    } else {
      reset();
    }
  }, [categoryToEdit]);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{categoryToEdit ? "Edit" : "New"} Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {categoryToEdit ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CategoryModal;
