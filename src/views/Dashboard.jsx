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
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeReceiver = this.handleChangeReceiver.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.state = {
      bigChartData: "data1",
      transferReceiver: "0x",
      transferAmount: 0,
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  handleChangeReceiver(e) {
        this.setState({transferReceiver: e.target.value});
  }
  handleChangeAmount(e) {
        this.setState({transferAmount: (e.target.value * 10**20).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  sendTokens = receiver => {
    const web3 = this.props.web3;
    const instanceToken = this.props.instanceToken;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceToken.methods.transfer(this.state.transferReceiver,
                                       this.state.transferAmount).send(
                                         {from: result,
                                          value: 0}).then(result =>
                                            window.location.reload()
                                          ))};
  };
  render() {
    return (
      <>
        <div className="content">
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Balance USD</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-wallet-43 text-info" />{" "}
                  {isNaN(this.props.balanceTKN) ? ("0.00"
                    ):(this.props.balanceTKN/10**20).toLocaleString(
                                "en", {minimumFractionDigits: 2,
                                            maximumFractionDigits:2})} LUSD
                </CardTitle>
              </CardHeader>
              <CardBody>
              <h4 className="card-category"><Col lg="8">Balance ETH: {this.props.balanceETH}</Col></h4>
              <Col md="12">
              <p
               id="tooltip789511871"
              >
              Stability tax: 2% LUSD per year</p>
              <UncontrolledTooltip
                delay={0}
                placement="bottom"
                target="tooltip789511871"
              >
              The tax is automatically deducted every block.
              </UncontrolledTooltip>
              </Col>
              </CardBody>
            </Card>
          </Col>


        {/* CODE: EURO and GOLD token
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Balance EURO</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-wallet-43 text-success" />{" "}
                  N/A
                </CardTitle>
              </CardHeader>
              <CardBody>
              <h5 className="card-category"><Col lg="8">Balance ETH: {this.props.balanceETH}</Col></h5>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Balance GOLD</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-wallet-43 text-primary" />{" "}
                  N/A
                </CardTitle>
              </CardHeader>
              <CardBody>
              <h5 className="card-category"><Col lg="8">Balance ETH: {this.props.balanceETH}</Col></h5>
              </CardBody>
            </Card>
          </Col>
          </Row>
          <Row>
        */}



          <Col lg="6" xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Transfer</h5>
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-coins text-success" />{" "}
                      USD
                    </CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: this.state.bigChartData === "data1"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                      >
                        <input
                          defaultChecked
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          USD
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fas fa-dollar-sign" />
                        </span>
                      </Button>

                      {/* CODE: EURO and GOLD token
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: this.state.bigChartData === "data2"
                        })}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          EURO
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fas fa-euro-sign" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: this.state.bigChartData === "data3"
                        })}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          GOLD
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-bank" />
                        </span>
                      </Button>
                      */}

                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col lg="8">Receiver
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0x"
                      type="text"
                      onChange={this.handleChangeReceiver}
                    />
                  </FormGroup>
                </Col>
                <Col lg="8">amount
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0.00"
                      type="text"
                      onChange={this.handleChangeAmount}
                    />
                  </FormGroup>
                </Col>
                <ButtonGroup
                  className="btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <Col sm="6">
                  <Button
                  className="btn-icon btn-round"
                  color="success"
                  type="button"
                  onClick={this.sendTokens}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
