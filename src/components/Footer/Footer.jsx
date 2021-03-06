/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink, UncontrolledAlert,
} from "reactstrap";

class Footer extends React.Component {
  render() {
    var url = "https://github.com/keviinfoes/LinkedFC_backend";
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
          <NavItem>
              <NavLink
                href={url}
                target="_blank"
              >
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
