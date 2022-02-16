import React from 'react';
import uuid from 'react-uuid';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import CardMovil from './CardMovil';

class PaginaFavoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouritesList: [],
    };
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  removeFavourite = (phone_name) => {
    console.log('telefono a eliminar: ' + phone_name);
    let favouritesDelete = this.state.favouritesList;
    let index = favouritesDelete.findIndex(
      (item) => item.phone_name == phone_name
    );
    console.log('Indice en array: ' + index);
    index !== -1
      ? (favouritesDelete = favouritesDelete.filter((item) => {
          return item.phone_name !== phone_name;
        }))
      : console.log('No está en favoritos');
    this.setState({ favouritesList: favouritesDelete });
  };

  componentDidMount() {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    favourites =
      favourites !== null && favourites !== undefined && favourites !== ''
        ? favourites
        : [];
    console.log('Favoritos:' + favourites);
    this.setState({ favouritesList: favourites });
  }

  componentWillUnmount() {
    localStorage.setItem(
      'favourites',
      JSON.stringify(this.state.favouritesList)
    );
  }

  render() {
    return (
      <div>
        <h1>Favoritos</h1>
        <Container>
          <Row>
            {this.state.favouritesList.map((item) => {
              return (
                <Col key={uuid()} lg={4} md={6}>
                  <CardMovil
                    cardItem={item}
                    onClickCard={() => this.removeFavourite(item.phone_name)}
                    buttonText="Eliminar de favoritos"
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default PaginaFavoritos;
