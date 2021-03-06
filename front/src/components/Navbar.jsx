import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Login from "./Login";

function NavBar(props) {
  const logout = () => {
    fetch("/logout").then(() => {
      props.setUser(null);
    });
  };
  return (
    <>
      <Navbar expand="lg" fixed="top" id="navbar-principal">
        <Navbar.Brand className="white-text logo font-match" href="/">
          Nutricheck
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!props.user ? (
              <Login {...props} />
            ) : (
              <>
                <Nav.Item className="white-text pr-4">
                  Bienvenid@ {props.user.nombre}! 😊
                </Nav.Item>
                {props.user.nutri || (
                  <Nav.Link className="white-text" href="#datos">
                    Mis datos
                  </Nav.Link>
                )}
                {props.user.nutri || (
                  <Nav.Link className="white-text" href="#progreso">
                    Mi progreso
                  </Nav.Link>
                )}
                {!props.user.nutri || (
                  <Nav.Link className="white-text" href="/">
                    Mis pacientes
                  </Nav.Link>
                )}
                <Button className=" ml-sm-2" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
