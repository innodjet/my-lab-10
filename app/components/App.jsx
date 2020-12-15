import React from 'react';
import Content from "./content/Content";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";

export default class App extends React.Component {
  render() {
    return <>
    <Nav></Nav>
    <Content></Content>
    <Footer></Footer>
    </>
  }
}
