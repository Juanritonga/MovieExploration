// Navbar.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <Container fluid>
        <Row className="align-items-center">
          <Col className="text-center">
            <h1 className="navbar-title">Popcorn Central</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Navbar;
