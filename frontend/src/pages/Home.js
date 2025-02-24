import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { fetchCategories } from "../services/productService";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaFilter, FaComments } from "react-icons/fa";
import Loader from "../components/ui/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    dispatch(fetchProducts());
    loadCategories();
  }, [dispatch]);

  // Load categories from backend
  const loadCategories = async () => {
    const response = await fetchCategories();
    setCategories(response);
  };

  // Filter products based on selected category and price range
  const filteredProducts = products.filter((product) => {
    const withinPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return withinPriceRange && matchesCategory;
  });

  return (
    <>
      <div className="bg-light">
        {/* Hero Section */}
        <section className="hero bg-dark text-white text-center py-5">
          <Container>
            <h1 className="display-4 fw-bold">Find the Best Deals Here!</h1>
            <p className="lead">Shop the most recent and best-priced commodities.</p>
            <Link to="/shop">
              <Button variant="warning" size="lg">
                Shop Now
              </Button>
            </Link>
          </Container>
        </section>

        {/* Filters Section */}
        <Container className="my-4">
          <h2 className="text-center mb-4">
            <FaFilter /> Filter Products
          </h2>
          <Row className="justify-content-center">
            <Col md={4}>
              <Form.Group controlId="categorySelect">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="priceRange">
                <Form.Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Form.Label>
                <Form.Range
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>

        {/* Most Recent Commodities */}
        <Container className="my-5">
          <h2 className="text-center mb-4">Most Recent Commodities</h2>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              {filteredProducts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)
                .map((product) => (
                  <Col md={3} key={product.id} className="mb-4">
                    <Card className="shadow-sm">
                      <Card.Img variant="top" src={product.image} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <Link to={`/product/${product.id}`}>
                          <Button variant="primary">View</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Container>

        {/* Best Prices */}
        <Container className="my-5">
          <h2 className="text-center mb-4">Best Prices</h2>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              {filteredProducts
                .sort((a, b) => a.price - b.price)
                .slice(0, 4)
                .map((product) => (
                  <Col md={3} key={product.id} className="mb-4">
                    <Card className="shadow-sm">
                      <Card.Img variant="top" src={product.image} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <Link to={`/product/${product.id}`}>
                          <Button variant="success">View</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Container>

        {/* Chat Button */}
        <div className="position-fixed bottom-0 end-0 m-3">
          <Link to="/chat-support">
            <Button variant="info" className="p-3 shadow-lg">
              <FaComments size={24} /> Chat Support
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
