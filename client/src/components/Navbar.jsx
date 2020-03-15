import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function AppNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Node REST API Challenge</Navbar.Brand>
          <Nav className="mr-auto">
            <NavLink to="/" exact activeClassName="selected">
              Home
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/add-project" activeClassName="selected-btn">
              <Button variant="outline-info">Add</Button>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
