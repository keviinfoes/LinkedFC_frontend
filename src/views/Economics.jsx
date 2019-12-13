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
// react plugin used to create charts
import { defaults,  Line, Bar } from "react-chartjs-2";

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
  Table,
} from "reactstrap";

// core components
import {
  performanceChart,
  linkedTokens
} from "../variables/charts.jsx";

// Disable animating charts by default.
defaults.global.animation = false;

class Economics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      charsLoaded: false,
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Collateral Positions</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
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
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            ETH
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            LUSD
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
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
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            CPs
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={performanceChart[this.state.bigChartData]}
                      options={performanceChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">USD - EURO - GOLD</h5>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                  <Bar
                    data={linkedTokens.data}
                    options={linkedTokens.options}
                  />
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="8" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Linked</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Type</th>
                        <th>Number CPS</th>
                        <th>Total Collateral</th>
                        <th>Total Tokens</th>
                        <th>Current Rate</th>
                        <th className="text-center">Total collateralization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>USD</td>
                        <td>{this.props.totalCP[0]}</td>
                        <td>{(this.props.totalCP[1]/10**18).toLocaleString(
                                      undefined, {minimumFractionDigits: 2,
                                                  maximumFractionDigits:2})} ETH</td>
                        <td>{(this.props.totalCP[2]/10**20).toLocaleString(
                                      undefined, {minimumFractionDigits: 2,
                                                  maximumFractionDigits:2})} LUSD</td>
                        <td>{(this.props.rateUSD/10**2).toLocaleString(
                                    undefined, {minimumFractionDigits: 2,
                                                maximumFractionDigits:2})} USD</td>
                        <td className="text-center">{
                          ((this.props.totalCP[1] * this.props.rateUSD) /
                          (this.props.totalCP[2] / 10**2)).toLocaleString(
                                      undefined, {minimumFractionDigits: 0,
                                                  maximumFractionDigits:0})} %
                        </td>
                      </tr>
                      <tr>
                        <td>EURO</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td className="text-center">0,00</td>
                      </tr>
                      <tr>
                        <td>GOLD</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td>0,00</td>
                        <td className="text-center">0,00</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Economics;
