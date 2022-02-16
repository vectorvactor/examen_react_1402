import React from 'react';
import uuid from 'react-uuid';
import { Navbar, Offcanvas, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PaginasApp } from '../data/PaginasApp';
import { BOOTSTRAP_LG_SIZE } from '../data/Constants';
import logo from '../assets/images/logo.png';
import './menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
    let options;
    if (this.state.width < BOOTSTRAP_LG_SIZE) {
      options = (
        <>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Ejercicios
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {PaginasApp.map((item) => {
                  return (
                    <Nav.Link key={uuid()} as={Link} to={item.path}>
                      {item.title}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </>
      );
    } else {
      options = (
        <Nav className="justify-content-end nav-expanded">
          {PaginasApp.map((item) => {
            return (
              <Nav.Link
                className="navlink-expanded"
                key={uuid()}
                as={Link}
                to={item.path}
              >
                {item.title}
              </Nav.Link>
            );
          })}
        </Nav>
      );
    }

    return (
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              className="logo-image"
              src={logo}
              width="50px"
              alt="logo"
            />
            Examen react
          </Navbar.Brand>
          {options}
        </Container>
      </Navbar>
    );
  }
}

export default Menu;
