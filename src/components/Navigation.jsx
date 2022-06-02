import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuOptions from './MenuOptions';
import Boton from './Boton';
import { Navbar, Offcanvas, Container, Nav } from 'react-bootstrap';
import { BOOTSTRAP_LG_SIZE } from '../data/Constants';
import logo from '../assets/images/logo.png';
import './navigation.css';

export default function Navigation(props) {

  const [ width, setWidth ] = useState();
  const history = useHistory();

  useEffect(() => {
    console.log("Montado Navigation");
    window.addEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    history.push("/");
  }

  const generateMenu = () => {
    if (width < BOOTSTRAP_LG_SIZE) {
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
                <MenuOptions baseUrl={props.baseUrl} />
                <Boton text="Logout" onClickButton={logout} />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </>
      );
    } else {
      return (
        <Nav className="justify-content-end nav-expanded">
          <MenuOptions baseUrl={props.baseUrl} />
          <Boton text="Logout" onClickButton={logout} />
        </Nav>
      );
    }
  };

  if (!props.authorized) {
    return (<></>);
  }
  else {
    let options = generateMenu();

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