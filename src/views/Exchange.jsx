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
      bigChartData: "data1",
      buyAmount: 0,
      sellAmount: 0,
      buyClaimAmount: 0,
      sellClaimAmount: 0,
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
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
  buyTokens = receiver => {
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      instanceExch.methods.sellETH().send(
                                      {from: this.props.coinbase,
                                      value: this.state.buyAmount})
                                      };
  };
  sellTokens = receiver => {
    const web3 = this.props.web3;
    const instanceToken = this.props.instanceToken;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceToken.methods.approveExchange(this.state.sellAmount).send(
                                         {from: result,
                                          value: 0})
                                        )};
  };
  claimETH = receiver => {
    const web3 = this.props.web3;
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceExch.methods.buyTKN(this.state.buyClaimAmount).send(
                                         {from: result,
                                          value: 0})
                                        )};
  };
  claimTokens = receiver => {
    const web3 = this.props.web3;
    const instanceExch = this.props.instanceExch;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceExch.methods.buyETH(this.state.sellClaimAmount).send(
                                         {from: result,
                                          value: 0})
                                        )};
  };




// TO DO - ADD REMOVE CLAIM
//  claimRemoveETH = receiver => {
//    const web3 = this.props.web3;
//    const instanceToken = this.props.instanceToken;
//    if (this.props.web3Available !== "false") {
//      web3.eth.getCoinbase().then(result =>
//        instanceToken.methods.transfer(this.state.transferReceiver,
//                                       this.state.transferAmount).send(
//                                         {from: result,
//                                          value: 0})
//                                        )};
//  };
//  claimRemoveTokens = receiver => {
//    const web3 = this.props.web3;
//    const instanceToken = this.props.instanceToken;
//    if (this.props.web3Available !== "false") {
//      web3.eth.getCoinbase().then(result =>
//        instanceToken.methods.transfer(this.state.transferReceiver,
//                                       this.state.transferAmount).send(
//                                         {from: result,
//                                          value: 0})
//                                        )};
//  };



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
                  {isNaN(this.props.balanceTKN) ? ("0,00"
                    ):(this.props.balanceTKN/10**20).toLocaleString(
                                undefined, {minimumFractionDigits: 2,
                                            maximumFractionDigits:2})} LUSD
                </CardTitle>
              </CardHeader>
              <CardBody>
              <h4 className="card-category"><Col lg="8">Balance ETH: {this.props.balanceETH}</Col></h4>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8">
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
                      Deposit ETH
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col lg="8">amount ETH
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0,00"
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
                  onClick={this.buyTokens}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-coins text-success" />{" "}
                      Claim LUSD
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h5 className="card-category"><Col lg="8">
                  Deposited ETH: {(this.props.claimETH/10**18).toLocaleString(
                                undefined, {minimumFractionDigits: 2,
                                            maximumFractionDigits:2})}
                </Col></h5>
                <h5 className="card-category"><Col lg="8">
                  Claim LUSD available: {(this.props.claimETH*this.props.rateUSD/10**20).toLocaleString(
                                undefined, {minimumFractionDigits: 2,
                                            maximumFractionDigits:2})}
                </Col></h5>
                <Col lg="8">amount LUSD
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0,00"
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
                  onClick={this.claimETH}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
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
                      Deposit LUSD
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col lg="8">amount LUSD
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0,00"
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
                  color="danger"
                  type="button"
                  onClick={this.sellTokens}
                  >
                  <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                </ButtonGroup>
              </CardBody>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-coins text-danger" />{" "}
                      Claim ETH
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h5 className="card-category"><Col lg="8">
                  Deposited LUSD:  {isNaN(this.props.claimTokens) ? ("0,00") : (
                          (this.props.claimTokens/10**20).toLocaleString(
                                undefined, {minimumFractionDigits: 2,
                                            maximumFractionDigits:2}))}
                </Col></h5>
                <h5 className="card-category"><Col lg="8">
                  Claim ETH available: {isNaN(this.props.claimTokens) ? ("0,00") : (
                    (this.props.claimTokens/this.props.rateUSD/10**18).toLocaleString(
                                undefined, {minimumFractionDigits: 2,
                                            maximumFractionDigits:2}))}
                </Col></h5>
                <Col lg="8">amount ETH
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="0,00"
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
                  color="danger"
                  type="button"
                  onClick={this.claimTokens}
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
