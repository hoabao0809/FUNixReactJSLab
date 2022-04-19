import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class NavbarComponent extends Component {
  render() {
    return (
      <Navbar className="container-fluid" dark color="primary">
        <div className="container">
          <NavbarBrand href="#">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
        </div>
      </Navbar>
    );
  }
}

export default NavbarComponent;
