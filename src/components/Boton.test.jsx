import React from 'react';
//import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, prettyDOM} from '@testing-library/react';
import Boton from './Boton';

test('Tests unitarios botón', ()  => {
    // Definimos una función para pasar al botón
    //const funcionTest = () => {console.log("hola :)")};
    // O mockeamos la función
    const funcionTest = jest.fn();
    const botonTest = render(<Boton text="Hola" onClickButton={funcionTest} />);

    // Mockeamos la consola 
    //console.log = jest.fn();
    // Testeando elemento
    const boton = botonTest.getByText("Hola");
    console.log(prettyDOM(boton));
    //.click();
    fireEvent.click(boton);
    expect(funcionTest).toHaveBeenCalledTimes(1);
    // Testeando llamada a la función del botón (imprime en consola)
    //expect(console.log.mock.calls[0][0]).toBe('hola :)');

});



