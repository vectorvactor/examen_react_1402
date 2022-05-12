import React from 'react';
import uuid from 'react-uuid';
import { Container, Table, Row, Col } from 'react-bootstrap';
import FormMarcas from './FormMarcas';
import CardMovil from './CardMovil';
import { BASE_API_URL } from '../data/Constants';
import './table.css';

class PaginaMoviles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
      tableData: [],
    };
    this.favouritesList = [];
    this.brandInput = React.createRef();
    this.changeSelected = this.changeSelected.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.updateTableAPI = this.updateTableAPI.bind(this);
    this.addFavourites = this.addFavourites.bind(this);
    this.userName = localStorage.getItem("loggedUser");
  }

  /**
   * Llama a la API que recupera información de un modelo concreto
   * @param {*} itemEndpoint : Fragmento de URL con el identificador del elemento
   */
  changeSelected = async (itemEndpoint) => {
    const response = await fetch(BASE_API_URL + itemEndpoint);
    const responseData = await response.json();
    this.setState({
      selectedItem: responseData.data,
    });
  };

  /**
   * Recupera los modelos de la marca seleccionada en el formulario
   */
  updateTable = async () => {
    this.updateTableAPI('brands/' + this.brandInput.current.value);
  };

  /**
   * Recupera los modelos que devuelve la API 
   * @param {*} endpointURL Fragmento de URL con el método de la API concreto 
   */
  updateTableAPI = async (endpointURL) => {
    const response = await fetch(BASE_API_URL + endpointURL);
    const responseData = await response.json();
    const parsedData = responseData.data.phones.map((item) => {
      const row = {// Hay endpoints que no devuelven información sobre la marca, en ese caso la sacamos del nombre 
        brand: item.brand !== undefined ? item.brand : item.phone_name.split(' ')[0],
        phone_name: item.phone_name,
        slug: item.slug,
      };
      return row;
    });
    this.setState({
      tableData: parsedData,
    });
    // Establecemos un modelo por defecto
    this.changeSelected(parsedData[0].slug);
  };

  /**
   * Añade un smartphone a la lista de favoritos
   */
  addFavourites = () => {
    // Comprobamos si el elemento ya está en la lista, en cuyo caso no lo añadimos
    const index = this.favouritesList.findIndex(
      (item) => item.phone_name == this.state.selectedItem.phone_name
    );

    index === -1
      ? this.favouritesList.push(this.state.selectedItem)
      : console.log('Ya está en favoritos');
  };

  /**
   * Al cargar el componente, se comprueba si existe una lista de favoritos
   */
  async componentDidMount() {
    const favourites = JSON.parse(localStorage.getItem(`favourites-${this.userName}`));
    console.log('Favoritos:' + favourites);
    this.favouritesList =
      favourites !== null && favourites !== undefined && favourites !== ''
        ? favourites
        : [];
    this.updateTableAPI('top-by-fans');
  }

  /**
   * Al eliminar el componente, se copia la lista de favoritos al localStorage
   */
  componentWillUnmount() {
    localStorage.setItem(`favourites-${this.userName}`, JSON.stringify(this.favouritesList));
  }

  render() {
    return (
      <div className="main-site">
        <h1>Smartphones</h1>
        <Container>
          <Row>
            <FormMarcas
              reference={this.brandInput}
              onClickForm={this.updateTable}
            />
          </Row>
          <Row>
            <Col lg={8} md={6}>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableData.map((item) => {
                    return (
                      <tr
                        key={uuid()}
                        onClick={() => this.changeSelected(item.slug)}
                      >
                        <td>{item.brand}</td>
                        <td>{item.phone_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col lg={4} md={6}>
              <CardMovil
                cardItem={this.state.selectedItem}
                onClickCard={this.addFavourites}
                buttonText="Añadir a favoritos"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PaginaMoviles;
