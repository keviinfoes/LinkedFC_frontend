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

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Modal,
} from "reactstrap";

class Liquidations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liqActive: [],
      miniModal: false,
      userCP: "",
      liqRange: [],
    };
  }
  componentDidMount() {
    var liqrate = this.props.rateUSD/1000
    if (this.props.web3Available === "true") {
      for (var i = liqrate; i < this.props.liqGroups.length; i++) {
        if (this.props.liqGroups[i] > 0){
          for (var n = 0; n < this.props.liqGroups[i]; n++) {
            this.props.instanceColl.methods.liqInfo(i, (n + 1)
              ).call().then((result =>
              this.setState({
                liqActive: this.state.liqActive.concat(result),
              })))}}}}
  }
  toggleModal = (modalState, owner, id) => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    this.setState({
      [modalState]: !this.state[modalState],
      dataMiniModal: [owner, id]
    });
    if (owner !== undefined && id !== undefined) {
      if (this.props.web3Available !== "false") {
        web3.eth.getCoinbase().then(result =>
          instanceColl.methods.cPosition(owner, id).call().then(
            (result => this.setState({userCP: result}))
      ))};
    }
  };
  liquidateCP = (owner, id) => {
     const web3 = this.props.web3;
     const instanceColl = this.props.instanceColl;
     if (this.props.web3Available !== "false") {
       web3.eth.getCoinbase().then(result =>
         instanceColl.methods.liquidateCP(this.state.dataMiniModal[0],
                                          this.state.dataMiniModal[1]).send(
                                          {from: result}).then(result =>
                                            window.location.reload()
                                          ))};
   };
  renderTableGroupData() {
    var rows = [];
    if (this.props.loop === 49) {
     for (var i = 0; i < this.props.liqGroups.length; i++) {
      if (this.props.liqGroups[i] > 0){
        rows[i] = (
          <tr key={i}>
            <td>{i*10} - {(i + 1) *10} USD</td>
            <td>{this.props.liqGroups[i]} CPs</td>
          </tr>
        )};
    }
    return (rows);
  } else {return(<tr><td>loading liquidation groups</td><td/></tr>)}
  }

  renderTableActiveLiqData() {
    var rowsActive = [];
    var liqrate = this.props.rateUSD/1000
    var index = 0;
      for (var i = liqrate; i < this.props.liqGroups.length; i++) {
        if (this.props.liqGroups[i] > 0){
          index = index + (this.props.liqGroups[i] * 1);
        }
      }

        if (index > 0) {
          if (this.props.loop === 49) {
          for (var n = 0; n < index; n++) {
              rowsActive[n] = (
                  <tr key={n}>
                      <td>{n+1}</td>
                      {this.state.liqActive[n] !== undefined ?
                        (<td>{this.state.liqActive[n][1]}</td>):(<td></td>)}

                      {this.state.liqActive[n] !== undefined ?
                        (<td>{(this.state.liqActive[n][0] * 1) + 1}</td>):(<td></td>)}
                      {this.state.liqActive[n] !== undefined ?
                        (<td>
                          <Button
                          className="btn-link tim-icons icon-simple-remove"
                          color="danger"
                          onClick={this.toggleModal.bind("", "miniModal",
                                        this.state.liqActive[n][1],
                                        this.state.liqActive[n][0])}
                          />
                        </td>
                        ):(<td></td>)}
                  </tr>);
        }
          return (rowsActive);
        } else {return(<tr><td>loading active liquidations</td><td/></tr>)}
      } else {
        return (<tr><td>No active liquidations </td>
                <td></td><td></td></tr>)
      }
  }
  render() {

    console.log(this.state.liqActive)

    return (
      <>
        <div className="content">
        <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Active Liquidation Positions</CardTitle>
            </CardHeader>
            <Col md="12">
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID</th>
                    <th>Owner</th>
                    <th>Owners ID</th>
                  </tr>
                </thead>
                <tbody>
                {this.renderTableActiveLiqData()}
                </tbody>
              </Table>
              Current rate: {(this.props.rateUSD/10**2).toLocaleString(
                          undefined, {minimumFractionDigits: 2,
                                      maximumFractionDigits:2})} USD
            </CardBody>
          </Col>
          </Card>
        </Col>
        </Row>
        <Row>
        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Liquidation groups</CardTitle>
            </CardHeader>
              <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Liquidation amount</th>
                    <th>Total CPs</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTableGroupData()}
                </tbody>
              </Table>
              </CardBody>
          </Card>
        </Col>
        </Row>
        </div>
        {/* Start Mini Modal */}
          <Modal
            modalClassName="modal-mini modal-danger modal-mini"
            isOpen={this.state.miniModal}
            toggle={() => this.toggleModal("miniModal")}
          >
            <div className="modal-header justify-content-center">
              <button
                className="close"
                onClick={() => this.toggleModal("miniModal")}
              >
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                  <i className="tim-icons icon-trash-simple" />
              </div>
            </div>
            <div className="modal-body text-center">
              <div/>
              <p>Tokens burn: {(this.state.userCP[1]/10**20).toLocaleString(
                        undefined, {minimumFractionDigits: 2,
                                    maximumFractionDigits:2})} </p>
              <p>ETH available: {(this.state.userCP[0]/10**18).toLocaleString(
                        undefined, {minimumFractionDigits: 2,
                                    maximumFractionDigits:2})}</p>
            </div>

            <div className="modal-footer">
              <Button
                className="btn-neutral"
                color="link"
                type="button"
                onClick={this.liquidateCP}
              >
               Liquidate
              </Button>
              <Button
                className="btn-neutral"
                color="link"
                onClick={() => this.toggleModal("miniModal")}
                type="button"
              >
               Cancel
              </Button>
            </div>
          </Modal>
          {/* End Mini Modal */}
      </>
    );
  }
}

export default Liquidations;
