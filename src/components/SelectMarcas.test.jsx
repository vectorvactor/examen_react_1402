import React from 'react';

import {fireEvent, render, prettyDOM, waitFor} from '@testing-library/react';
import SelectMarcas from './SelectMarcas';

test('Tests unitarios lista marcas', ()  => {

  const marcaSelected = React.createRef();
  const component = render(<SelectMarcas reference={marcaSelected}/>);

  component.getByText("Marca");
  component.getByRole("combobox");

});