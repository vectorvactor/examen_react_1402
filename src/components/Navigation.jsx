import React from 'react';
import MenuOptions from './MenuOptions';
import Boton from './Boton';
import { Navbar, Offcanvas, Container, Nav } from 'react-bootstrap';
import { BOOTSTRAP_LG_SIZE } from '../data/Constants';
import logo from '../assets/images/logo.png';
import './navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.authorized=props.authorized;
    this.baseUrl = props.baseUrl;
    this.state = { width: window.innerWidth };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  generateMenu() {
    if (this.state.width < BOOTSTRAP_LG_SIZE) {
      return (
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
                <MenuOptions baseUrl={this.baseUrl} />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </>
      );
    } else {
      return (
        <Nav className="justify-content-end nav-expanded">
          <MenuOptions baseUrl={this.baseUrl} />
        </Nav>
      );
    }
}
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
    if (!this.authorized) {
      return (<></>);
    }
    else {
      let options = this.generateMenu();

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
}

export default Navigation;
