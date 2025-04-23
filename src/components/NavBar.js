import React from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import { NavDropdown } from "react-bootstrap";

const NavBar = () => {
  const location = useLocation();
  const user = useSelector(state => state.user);
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3">
      <Navbar.Brand as={Link} to="/inventories">Inventories</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/consumables" active={location.pathname === '/consumables'}>Consumables</Nav.Link>
          <Nav.Link as={Link} to="/materials" active={location.pathname === '/materials'}>Materials</Nav.Link>
        </Nav>
      </Navbar.Collapse>
        <div>
          <Link className="navbar-brand" to="/users">{user.name}</Link>
        </div>
    </Navbar>
  )
}

export default NavBar;