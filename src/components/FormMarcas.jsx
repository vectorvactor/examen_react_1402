import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import SelectMarcas from './SelectMarcas';
import Boton from './Boton';

class FormMarcas extends React.Component {
  constructor(props) {
    super(props);
    this.reference = props.reference;
    this.onClickForm = props.onClickForm;
  }

  render() {
    return (
      <Form>
        <Form.Group as={Row} className="mb-3">     
          <Form.Label column sm="2" lg="2">Marca</Form.Label>
          <Col sm="8" lg="9">
            <SelectMarcas reference={this.reference} />
          </Col>
          <Col sm="2" lg="1">
            <Boton text="Actualizar" onClickButton={this.onClickForm} />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
export default FormMarcas;
