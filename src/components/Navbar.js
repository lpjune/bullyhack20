import React from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Button,
    Form,
    FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Hands Up</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    <Nav.Link href="/classsearch">Class Search</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" drop="left">
                        <NavDropdown.Item href="/profile">
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
