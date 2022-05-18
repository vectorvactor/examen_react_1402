import { render, fireEvent } from '@testing-library/react';
import CardMovil from './CardMovil';


test("Pruebas sobre componente CardMovil", () => {

    const elementoTarjeta = {
        os:"Android",
        brand:"Samsung",
        phone_name:"Galaxy S21",
        dimensions:"200x150x10",
        storage:"64GB"
    }

    const funcion = jest.fn();

    const componente = render(
        <CardMovil cardItem={elementoTarjeta}
            onClickCard={funcion}
            buttonText="Boton tarjeta"/>
    );


    componente.getByText("Almacenamiento: 64GB");
    const botonTarjeta = componente.getByText("Boton tarjeta");
    
    fireEvent.click(botonTarjeta);
    fireEvent.click(botonTarjeta);
    expect(funcion).toHaveBeenCalledTimes(2);


});