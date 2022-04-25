import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  NavbarToggler,
  Collapse,
} from 'reactstrap';
import NavLink from 'react-router-dom/NavLink';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img src="assets/images/logo.png" height="30" width="41" alt="" />
            </NavbarBrand>

            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/staff">
                    <span className="fa fa-users fa-lg"> Nhân viên</span>
                  </NavLink>
                </NavItem>
                <NavItem className="nav-link" to="/department">
                  <span className="fa fa-address-card fa-lg"> Phòng ban</span>
                </NavItem>
                <NavItem className="nav-link" to="/salary">
                  <span className="fa fa-money fa-lg"> Lương</span>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
