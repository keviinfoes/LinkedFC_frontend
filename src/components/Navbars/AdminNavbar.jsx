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
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  UncontrolledAlert,
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
    };
  }
  componentDidMount() {
    //setInterval(() => this.setState({ time: Date.now()}), 3)
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  render() {
    var url = "https://ropsten.etherscan.io/address/"+this.props.coinbase;
    var network = "";
    if (this.props.networkID === 5777) {
      network = "Private"
    } else if (this.props.networkID === 3) {
      network = "Ropsten"
    };
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            {this.props.metamask === true ?(
              <div className="section section-notifications" id="notifications">
                  <Container>
                      <UncontrolledAlert
                        className="alert-with-icon"
                        color="danger">
                            <span data-notify="icon" className="tim-icons icon-alert-circle-exc" />
                            <span>
                              <b>Alpha release -</b>
                              This application runs on the ropsten testnet!
                              Current network: {network}.
                              <br/>
                              <br/>
                              <a href= "https://faucet.metamask.io"
                                  className="text-white"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                PRESS HERE FOR TEST ETHER!
                              </a>
                            </span>
                      </UncontrolledAlert>
                  </Container>
                </div>
              ):(
              <div className="section section-notifications" id="notifications">
                    <Container>
                        <UncontrolledAlert
                          className="alert-with-icon"
                          color="danger">
                              <span data-notify="icon" className="tim-icons icon-alert-circle-exc" />
                              <span>
                                <b>No web3 </b>
                                  <a href= "https://metamask.io/"
                                    className="text-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                  detected in browser. Please use a
                                  web3 supported browser and install MetaMask!
                                  </a>
                              </span>
                        </UncontrolledAlert>
                    </Container>
              </div>)}
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require("../../assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Account</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem
                        className="nav-item"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      {this.props.coinbase}
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
