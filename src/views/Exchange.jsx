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
  Table,
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeAmountBuy = this.handleChangeAmountBuy.bind(this);
    this.handleChangeAmountSell = this.handleChangeAmountSell.bind(this);
    this.handleChangeAmountBuyClaim = this.handleChangeAmountBuyClaim.bind(this);
    this.handleChangeAmountSellClaim = this.handleChangeAmountSellClaim.bind(this);
    this.state = {
      exchangeDataDep: "TKN",
      exchangeDataWith: "TKN",
      buyAmount: 0,
      sellAmount: 0,
      buyClaimAmount: 0,
      sellClaimAmount: 0,
    };
  }
  setExchDataDep = name => {
    this.setState({
      exchangeDataDep: name
    });
  };
  setExchDataWith = name => {
    this.setState({
      exchangeDataWith: name
    });
  };
  handleChangeAmountBuy(e) {
        this.setState({buyAmount: (e.target.value * 10**18).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleChangeAmountSell(e) {
        this.setState({sellAmount: (e.target.value * 10**20).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleChangeAmountBuyClaim(e) {
        this.setState({buyClaimAmount: (e.target.value * 10**20).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleChangeAmountSellClaim(e) {
        this.setState({sellClaimAmount: (e.target.value * 10**18).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  depositETH = receiver => {
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      instanceExch.methods.depositETH().send(
                                      {from: this.props.coinbase,
                                      value: this.state.buyAmount}).then(result =>
                                        window.location.reload()
                                      )};
  };
  depositTKN = receiver => {
    const web3 = this.props.web3;
    const instanceToken = this.props.instanceToken;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceToken.methods.depositExchange(this.state.sellAmount).send(
                                         {from: result,
                                          value: 0}).then(result =>
                                            window.location.reload()
                                          ))};
  };
  withdrawTKN = receiver => {
    const web3 = this.props.web3;
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceExch.methods.withdrawTKN(this.state.buyClaimAmount).send(
                                         {from: result,
                                          value: 0}).then(result =>
                                            window.location.reload()
                                          ))};
  };
  withdrawETH = receiver => {
    const web3 = this.props.web3;
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceExch.methods.withdrawETH(this.state.sellClaimAmount).send(
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
                <h5 className="card-category">Balance Wallet</h5>
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
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Balance Exchange</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bank text-info" />{" "}
                  Deposited amounts
                </CardTitle>
              </CardHeader>
              <CardBody>
              <h4 className="card-category"><Col lg="8">Balance LUSD: {isNaN(this.props.claimTokens) ? ("0.00") : (
                      (this.props.claimTokens/10**20).toLocaleString(
                            "en", {minimumFractionDigits: 2,
                                        maximumFractionDigits:2}))}</Col></h4>
              <h4 className="card-category"><Col lg="8">Balance ETH: {(this.props.claimETH/10**18).toLocaleString(
                            "en", {minimumFractionDigits: 2,
                                        maximumFractionDigits:2})}</Col></h4>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Exchange liquidity</CardTitle>
            </CardHeader>
            <Col md="12">
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>LUSD liquidity</th>
                    <th>ETH liquidity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                   <td>{this.props.liquidityTokens} LUSD</td>
                   <td>{this.props.liquidityETH} ETH</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Col>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" xs="12">







            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Exchange</h5>
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-coins text-success" />{" "}
                      Deposit
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
                          active: this.state.exchangeDataDep === "TKN"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => this.setExchDataDep("TKN")}
                      >
                        <input
                          defaultChecked
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          LUSD
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fab fa-ethereum" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: this.state.exchangeDataDep === "ETH"
                        })}
                        onClick={() => this.setExchDataDep("ETH")}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          ETH
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fas fa-dollar-sign" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              {this.state.exchangeDataDep === "TKN" ? (
              <CardBody>
                <Col lg="8">amount LUSD
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0.00"
                      type="text"
                      onChange={this.handleChangeAmountSell}
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
                  onClick={this.depositTKN}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>

                </ButtonGroup>
              </CardBody>
              ):(
              <CardBody>
                <Col lg="8">amount ETH
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0.00"
                      type="text"
                      onChange={this.handleChangeAmountBuy}
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
                  onClick={this.depositETH}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col lg="6" xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Exchange</h5>
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-coins text-danger" />{" "}
                      Withdraw
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
                          active: this.state.exchangeDataWith === "TKN"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => this.setExchDataWith("TKN")}
                      >
                        <input
                          defaultChecked
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          LUSD
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fab fa-ethereum" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: this.state.exchangeDataWith === "ETH"
                        })}
                        onClick={() => this.setExchDataWith("ETH")}
                      >
                        <input
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          ETH
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="fas fa-dollar-sign" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              {this.state.exchangeDataWith === "TKN" ? (
              <CardBody>
                <h5 className="card-category"><Col lg="8">
                  Maximum LUSD withdraw available: {((this.props.claimETH*this.props.rateUSD/10**20)
                                                      +(this.props.claimTokens/10**20)).toLocaleString(
                                                      "en", {minimumFractionDigits: 2,
                                                        maximumFractionDigits:2})}
                </Col></h5>
                <Col lg="8">amount LUSD
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0.00"
                      type="text"
                      onChange={this.handleChangeAmountBuyClaim}
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
                  onClick={this.withdrawTKN}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
              ) : (
              <CardBody>
                <h5 className="card-category"><Col lg="8">
                  Maximum ETH withdraw: {isNaN(this.props.claimTokens) ? ("0.00") : (
                    ((this.props.claimTokens/this.props.rateUSD/10**18)
                      +(this.props.claimETH/10**18)).toLocaleString(
                                "en", {minimumFractionDigits: 2,
                                            maximumFractionDigits:2}))}
                </Col></h5>
                <Col lg="8">amount ETH
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0.00"
                      type="text"
                      onChange={this.handleChangeAmountSellClaim}
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
                  onClick={this.withdrawETH}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
            )}
            </Card>
          </Col>
        </Row>
       </div>
      </>
    );
  }
}

export default Dashboard;
