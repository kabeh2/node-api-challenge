import React from "react";
import { Row, Col } from "react-bootstrap";
import ProjectForm from "./ProjectForm";

function Form() {
  return (
    <Row className="justify-content-center">
      <Col sm={8} md={6}>
        <ProjectForm />
      </Col>
    </Row>
  );
}

export default Form;
