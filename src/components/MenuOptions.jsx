import React from "react";
import uuid from "react-uuid";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaginasApp } from "../data/PaginasApp";

export default function MenuOptions(props) {
  return (
    <>
      {PaginasApp.map((item) => {
        return (
          <Nav.Link
            className="navlink-expanded"
            key={uuid()}
            as={Link}
            to={`${props.baseUrl}/${item.path}`}
          >
            {item.title}
          </Nav.Link>
        );
      })}
    </>
  );
}
