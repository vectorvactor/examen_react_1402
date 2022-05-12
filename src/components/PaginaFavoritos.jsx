import React from 'react';
import uuid from 'react-uuid';
import { Container,Row, Col } from 'react-bootstrap';
import CardMovil from './CardMovil';

class PaginaFavoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouritesList: [],
    };
    this.userName = localStorage.getItem("loggedUser");
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  /**
   * Elimina un elemento de la lista de favoritos
   * @param {*} phone_name 
   */
  removeFavourite = (phone_name) => {
    let favouritesDelete = this.state.favouritesList;
    const index = favouritesDelete.findIndex(
      (item) => item.phone_name === phone_name
    );
    // Si el elemento está en la lista de favoritos, devolvemos la lista original filtrada 
    // quitando el elemento seleccionado
    index !== -1
      ? (favouritesDelete = favouritesDelete.filter((item) => {
          return item.phone_name !== phone_name;
        }))
      : console.log('No está en favoritos');
    this.setState({ favouritesList: favouritesDelete });
  };

  /**
   * Al cargar la página, se recupera de localStorage la lista de favoritos
   */
  componentDidMount() {
    
    let favourites = JSON.parse(localStorage.getItem(`favourites-${this.userName}`));
    favourites =
      favourites !== null && favourites !== undefined && favourites !== ''
        ? favourites
        : [];
    this.setState({ favouritesList: favourites });
  }

  /**
   * Al eliminar el componente, se copia la lista de favoritos al localStorage
   */
  componentWillUnmount() {
    localStorage.setItem(`favourites-${this.userName}`, JSON.stringify(this.state.favouritesList));
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
