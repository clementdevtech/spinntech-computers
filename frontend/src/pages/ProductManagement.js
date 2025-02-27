import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addProduct, updateProduct, deleteProduct } from "../services/productService";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "../assets/css/productmanager.css";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "", images: [] });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleShowModal = (product = null) => {
    setSelectedProduct(product);
    setFormData(product || { name: "", description: "", price: "", category: "", images: [] });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrop = useCallback((acceptedFiles) => {
    if (formData.images.length + acceptedFiles.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  }, [formData.images]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      await addProduct(formData);
    }
    dispatch(fetchProducts());
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      dispatch(fetchProducts());
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>+ Add Product</Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const images = JSON.parse(product.image);
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    {images.length > 0 && <img src={images[0]} alt="" style={{ width: "50px" }} />}
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleShowModal(product)}>Edit</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>

            {/* Drag & Drop Zone */}
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select files</p>
            </div>

            {/* Image Previews */}
            <div className="image-preview">
              {formData.images.map((file, index) => (
                <img key={index} src={file.preview || file} alt="preview" className="preview-img" />
              ))}
            </div>

            <Button variant="primary" type="submit" className="mt-3">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductManager;
