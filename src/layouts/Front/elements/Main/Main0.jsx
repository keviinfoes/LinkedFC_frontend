import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import {
  Row,
  Col,
  Button
} from "reactstrap";

class Main0 extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <div className="section section-javascript">
          <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg="6">
              <img
                alt="..."
                className="img-fluid"
                src={require("../../../../assets/img/ethereum.png")}
                style={{ width: "300px" }}
              />
            </Col>
            <Col className="mb-5 mb-lg-0" lg="5">
              <div className="section" />
              <h1 className="text-white font-weight-light">
              Earn rewards
              </h1>
              <p className="text-white mt-4">
              A stablecoin that rewards eth holders for minting new stablecoins.
              </p>
            </Col>
          </Row>
          </Container>
      </div>

      <div className="section" />
      <div className="section" />
      <div className="section section-javascript">
        <Container>
        <Row className="justify-content-between align-items-center">
          <Col className="text-center" lg="12" md="12">
          <Button
            className="btn-round"
            color="info"
            href="https://www.banq.link/admin/dashboard"
            role="button"
            size="lg"
            >
              Linked Dashboard
            </Button>
          </Col>

          </Row>
        </Container>
      </div>

     </div >
    );
  }
}

export default Main0;
