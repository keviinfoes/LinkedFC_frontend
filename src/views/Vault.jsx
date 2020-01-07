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
  Table,
  FormGroup,
  Input,
  Modal,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
} from "reactstrap";

class Vault extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeETH = this.handleChangeETH.bind(this);
    this.handleChangeAmountTokenUSD = this.handleChangeAmountTokenUSD.bind(this);
    this.handleChangeAmountCP = this.handleChangeAmountCP.bind(this);
    this.handleTransferCP = this.handleTransferCP.bind(this);
    this.state = {
      bigChartData: "data1",
      miniModal: false,
      formModal: false,
      formModal_CP: false,
      formModal_Claim: false,
      dataMiniModal: [],
      CPamountETH: 0,
      CPamountTokenUSD: 0,
      ChangeAmountCP: 0,
      CPTransfeReceiver: "",
      closedCPs: false,
      pendingEarnings: 0,
      claimID: "",
    }
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  toggleModal = (modalState, id, tokens, ETH, entry) => {
    this.setState({
      [modalState]: !this.state[modalState],
      dataMiniModal: [id, tokens, ETH, entry]
    });
  };
  handleChangeETH(e) {
        this.setState({CPamountETH: (e.target.value * 10**18).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleChangeAmountTokenUSD(e) {
        this.setState({CPamountTokenUSD: (e.target.value * 10**20).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleChangeAmountCP(e) {
        this.setState({ChangeAmountCP: (e.target.value).toLocaleString(
          'fullwide', { useGrouping: false })});
  }
  handleTransferCP(e) {
        this.setState({CPTransfeReceiver: (e.target.value)});
  }
  createCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.openCP(this.state.CPamountTokenUSD).send(
                                         {from: result,
                                          value: this.state.CPamountETH}))};
  };
  closeCP = (id, ETH) => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.withdrawETHCP(ETH, id).send(
                                         {from: result}))};
    this.setState({miniModal: !this.state.miniModal});
  };
  filterCP = () => {
    this.setState({
      closedCPs: !this.state.closedCPs});
  }
  transferCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.transfer(this.state.CPTransfeReceiver, this.state.dataMiniModal[0]).send(
                                         {from: result}))};
    this.setState({formModal: !this.state.formModal});
  };
  burnTokenCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    const changeAmount = (this.state.ChangeAmountCP * 10**20).toLocaleString(
      'fullwide', { useGrouping: false });
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.depositTokenCP(changeAmount , this.state.dataMiniModal[0]).send(
                                         {from: result}))};
    this.setState({formModal_CP: !this.state.formModal_CP});
  };
  mintTokenCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    const changeAmount = (this.state.ChangeAmountCP * 10**20).toLocaleString(
      'fullwide', { useGrouping: false });
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.withdrawTokenCP(changeAmount, this.state.dataMiniModal[0]).send(
                                         {from: result}))};
    this.setState({formModal_CP: !this.state.formModal_CP});
  };
  depositETHCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    const changeAmount = (this.state.ChangeAmountCP * 10**18).toLocaleString(
      'fullwide', { useGrouping: false });
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.depositETHCP(this.state.dataMiniModal[0]).send(
                                         {from: result,
                                          value: changeAmount}))};
    this.setState({formModal_CP: !this.state.formModal_CP});
  };
  withdrawETHCP = receiver => {
    const web3 = this.props.web3;
    const instanceColl = this.props.instanceColl;
    const changeAmount = (this.state.ChangeAmountCP * 10**18).toLocaleString(
      'fullwide', { useGrouping: false });
    if (this.props.web3Available !== "false") {
      web3.eth.getCoinbase().then(result =>
        instanceColl.methods.withdrawETHCP(changeAmount, this.state.dataMiniModal[0]).send(
                                         {from: result}))};
    this.setState({formModal_CP: !this.state.formModal_CP});
  };
  renderTableData() {
    if(this.props.indexCP > 0){
      var index = this.props.indexCP;
      var CP = [];
      var rows = [];
      if (this.props.individualCPs.length > 0) {
        for(var i = 0; i < index; i++) {
          CP[i] = this.props.individualCPs[i];
          if (CP[i] !== undefined) {
            rows[i] = (
             <tr key={i}>
               <td>{i+1}</td>
               <td>{CP[i][1] < 1 ? ("closed"):("open")}</td>
               <td>{(CP[i][1]/10**20).toLocaleString(
                         undefined, {minimumFractionDigits: 2,
                                     maximumFractionDigits:2})} LUSD
               </td>
               {CP[i][2] === 0 ? (<td/>):(
               <td>
                  <Button
                    className="btn-link"
                    color="info"
                    onClick={this.toggleModal.bind("", "formModal_CP", i, CP[i][1], CP[i][0], "burn tokens")}
                  >
                  burn
                  </Button> |
                  <Button
                    className="btn-link"
                    color="info"
                    onClick={this.toggleModal.bind("", "formModal_CP", i, CP[i][1], CP[i][0], "mint tokens")}
                  >
                  mint
                  </Button>
               </td>)}
               <td>{(CP[i][0]/10**18).toLocaleString(
                         undefined, {minimumFractionDigits: 2,
                                     maximumFractionDigits:2})} ETH</td>

               {CP[i][2] === true ? (<td/>):(<td>
                  <Button
                    className="btn-link"
                    color="info"
                    onClick={this.toggleModal.bind("", "formModal_CP", i, CP[i][1], CP[i][0], "deposit ETH")}
                  >
                  deposit
                  </Button> |
                  <Button
                    className="btn-link"
                    color="info"
                    onClick={this.toggleModal.bind("", "formModal_CP", i, CP[i][1], CP[i][0], "withdraw ETH")}
                  >
                  withdraw
                  </Button>
                  </td>)}
               <td className="text-center">
                   {isNaN((CP[i][1]/10**20)/(CP[i][0]/10**18)) ? (
                       <div> 0,00 USD </div>
                     ):(
                       <div>{((CP[i][1]/10**20)/(CP[i][0]/10**18) * 1.5).toLocaleString(
                           undefined, {minimumFractionDigits: 2,
                                       maximumFractionDigits:2})} USD
                       </div>
                   )}
               </td>
               {CP[i][2] === true ? (<td/>):(
                <td>
                <Button
                  className="btn-link tim-icons icon-send"
                  color="success"
                  onClick={this.toggleModal.bind("", "formModal", i, CP[i][1], CP[i][0])}
                />
               <Button
                 className="btn-link tim-icons icon-simple-remove"
                 color="danger"
                 onClick={this.toggleModal.bind("", "miniModal", i, CP[i][1], CP[i][0])}
               />
               </td>)}
             </tr>
           )}}
      } return (rows)}
  }

  render() {
    var change_tokens = this.state.dataMiniModal[1]/10**20;
    if (this.state.dataMiniModal[3] === "burn tokens") {
      change_tokens = this.state.dataMiniModal[1]/10**20;
      change_tokens = (this.state.dataMiniModal[1]/10**20 - this.state.ChangeAmountCP);
    } else if (this.state.dataMiniModal[3] === "mint tokens") {
      change_tokens = this.state.dataMiniModal[1]/10**20;
      change_tokens = (this.state.dataMiniModal[1]/10**20 + (1*this.state.ChangeAmountCP));
    } else {
      change_tokens = this.state.dataMiniModal[1]/10**20;
    }
    var change_ETH = this.state.dataMiniModal[2]/10**18;
    if (this.state.dataMiniModal[3] === "deposit ETH") {
      change_ETH = this.state.dataMiniModal[2]/10**18;
      change_ETH = (this.state.dataMiniModal[2]/10**18 + (1*this.state.ChangeAmountCP));
    } else if (this.state.dataMiniModal[3] === "withdraw ETH") {
      change_ETH = this.state.dataMiniModal[2]/10**18;
      change_ETH = (this.state.dataMiniModal[2]/10**18 - this.state.ChangeAmountCP);
    } else {
      change_ETH = this.state.dataMiniModal[2]/10**18;
    }
    return (
      <>
        <div className="content">
          <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Collateral Positions</CardTitle>
              </CardHeader>
              <Col md="12">
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Active</th>
                      <th>Tokens</th>
                      <th/>
                      <th>Collateral</th>
                      <th/>
                      <th className="text-center">Liquidation rate</th>
                      <th/>
                      <th/>
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderTableData()}
                  </tbody>
                </Table>
                <table>
                <tbody>
                  <tr>
                  <td>Current rate: {(this.props.rateUSD/10**2).toLocaleString(
                              undefined, {minimumFractionDigits: 2,
                                          maximumFractionDigits:2})} USD</td>
                  </tr>
                  <tr>
                  <td
                   id="tooltip789511872"
                  >
                  interest earnings: 1,5% per year</td>

                  <UncontrolledTooltip
                    delay={0}
                    placement="bottom"
                    target="tooltip789511872"
                  >
                  The interest automatically decreases the CP token debt
                  every block.
                  </UncontrolledTooltip>

                  </tr>
                </tbody>
                </table>
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
                      <h5 className="card-category">Create Collateral Position</h5>
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
                          color="info"
                          id="0"
                          size="sm"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
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
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Col lg="8">Token amount
                    <FormGroup>
                      <Input
                        defaultValue=""
                        placeholder="0,00"
                        type="text"
                        onChange={this.handleChangeAmountTokenUSD}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="8">ETH amount
                    <FormGroup>
                      <Input
                        defaultValue=""
                        placeholder="0,00"
                        type="text"
                        onChange={this.handleChangeETH}
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
                    onClick={this.createCP}
                    >
                    <i className="tim-icons icon-cloud-upload-94" />
                    </Button>
                    </Col>
                  </ButtonGroup>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Collateral details</CardTitle>
                </CardHeader>
                  <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Collateral amount</th>
                        <th>Liquidation price</th>
                        <th>Current Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{(this.state.CPamountETH / 10**18).toLocaleString(
                                      undefined, {minimumFractionDigits: 2,
                                                  maximumFractionDigits:2})} ETH
                        </td>
                        <td>{isNaN(this.state.CPamountTokenUSD/this.state.CPamountETH) ? (
                          <div> 0,00 USD </div>
                        ):(
                          <div>{((this.state.CPamountTokenUSD / 10**2)/
                          (this.state.CPamountETH) * 1.5).toLocaleString(
                                        undefined, {minimumFractionDigits: 2,
                                                    maximumFractionDigits:2})} USD
                          </div>
                        )}
                        </td>
                        <td>{(this.props.rateUSD/10**2).toLocaleString(
                                      undefined, {minimumFractionDigits: 2,
                                                  maximumFractionDigits:2})} USD
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  </CardBody>
              </Card>
            </Col>
          </Row>
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
                <h3 className="mb-0">
                  Remove Collateral position {this.state.dataMiniModal[0]+1}
                </h3>
                </div>
              </div>
              <div className="modal-body text-center">
                <div/>
                <p>Tokens burn: {(this.state.dataMiniModal[1]/10**20).toLocaleString(
                              undefined, {minimumFractionDigits: 2,
                                          maximumFractionDigits:2})}</p>
                <p>ETH receive: {(this.state.dataMiniModal[2]/10**18).toLocaleString(
                              undefined, {minimumFractionDigits: 2,
                                          maximumFractionDigits:2})} </p>
              </div>

              {this.state.dataMiniModal[0] !== undefined ? (
              <div className="modal-footer">
                <Button
                  className="btn-neutral"
                  color="link"
                  type="button"
                  onClick={() => this.closeCP(this.state.dataMiniModal[0],
                                              this.state.dataMiniModal[2])}
                >
                Remove
                </Button>
                <Button
                  className="btn-neutral"
                  color="link"
                  onClick={() => this.toggleModal("miniModal")}
                  type="button"
                >
                  Cancel
                </Button>
              </div>):(<div/>)}
            </Modal>
            {/* End Mini Modal */}
            {/* Start Form Modal Transfer */}
            <Modal
              modalClassName="modal-black"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("formModal")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0">Transfer Collateral position {
                      this.state.dataMiniModal[0]+1}</h3>
                </div>
              </div>
              <div className="modal-body">
                <div className="text-left text-muted mb-4 mt-3">
                <table>
                <tbody>
                  <tr>
                    <td>Tokens: {(this.state.dataMiniModal[1]/10**20).toLocaleString(
                                  undefined, {minimumFractionDigits: 2,
                                              maximumFractionDigits:2})} LUSD</td>
                  </tr>
                  <tr>
                    <td>Collateral: {(this.state.dataMiniModal[2]/10**18).toLocaleString(
                                  undefined, {minimumFractionDigits: 2,
                                              maximumFractionDigits:2})} ETH</td>
                  </tr>
                </tbody>
                </table>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classNames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Receiver"
                        type="text"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                        onChange={this.handleTransferCP}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      type="button"
                      onClick={this.transferCP}
                    >
                    <i className="tim-icons icon-send" />
                    </Button>
                </ButtonGroup>
                </div>
                </Form>
              </div>
            </Modal>
            {/* End Form Modal Transfer */}
            {/* Start Form Modal Adjust CP */}
            <Modal
              modalClassName="modal-black"
              isOpen={this.state.formModal_CP}
              toggle={() => this.toggleModal("formModal_CP")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("formModal_CP")}
                >
                  <i className="tim-icons icon-simple-remove"/>
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0">Adjust Collateral position {
                      this.state.dataMiniModal[0]+1}</h3>
                </div>
              </div>
              <div className="modal-body">
                <div className="text-left text-muted mb-4 mt-3">
                <table>
                <thead className="text-info">
                  <tr>
                    <td>New Position</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tokens: </td>
                    <td>{(change_tokens).toLocaleString(
                                  undefined, {minimumFractionDigits: 2,
                                              maximumFractionDigits:2})}
                    </td>
                    <td>
                    LUSD
                    </td>
                  </tr>
                  <tr>
                    <td>Collateral: </td>
                    <td>{(change_ETH).toLocaleString(
                                  undefined, {minimumFractionDigits: 2,
                                              maximumFractionDigits:2})}
                    </td>
                    <td>
                    ETH
                    </td>
                  </tr>
                  <tr>
                    <td>Liquidation: </td>
                    <td>
                    {((change_tokens * 1)/
                    (change_ETH * 1) * 1.5).toLocaleString(
                                  undefined, {minimumFractionDigits: 2,
                                              maximumFractionDigits:2})}
                    </td>
                    <td>USD</td>
                  </tr>
                </tbody>
                </table>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classNames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-coins" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={this.state.ChangeAmountCP}
                        type="text"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                        onChange={this.handleChangeAmountCP}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                  {this.state.dataMiniModal[3] === "burn tokens" ?
                    (<ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                     >
                      <Button
                      className="btn-round"
                      color="success"
                      type="button"
                      onClick={this.burnTokenCP}
                      >
                      {this.state.dataMiniModal[3]}
                      </Button>
                    </ButtonGroup>):(<div/>)
                  }
                  {this.state.dataMiniModal[3] === "mint tokens" ?
                  (<ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                   >
                    <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={this.mintTokenCP}
                    >
                    {this.state.dataMiniModal[3]}
                    </Button>
                  </ButtonGroup>):(<div/>)
                  }
                  {this.state.dataMiniModal[3] === "deposit ETH" ?
                  (<ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                   >
                    <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={this.depositETHCP}
                    >
                    {this.state.dataMiniModal[3]}
                    </Button>
                  </ButtonGroup>):(<div/>)
                  }
                  {this.state.dataMiniModal[3] === "withdraw ETH" ?
                  (<ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                   >
                    <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={this.withdrawETHCP}
                    >
                    {this.state.dataMiniModal[3]}
                    </Button>
                  </ButtonGroup>):(<div/>)
                  }
                </div>
                </Form>
              </div>
            </Modal>
            {/* End Form Modal Adjust CP */}
        </div>
      </>
    );
  }
}

export default Vault;
