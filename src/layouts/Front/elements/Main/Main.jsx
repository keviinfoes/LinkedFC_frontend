import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import {
  Row,
  Col
} from "reactstrap";

class Main extends React.Component {
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
             <Col className="mb-5 mb-lg-0" lg="5">
               <h1 className="text-white font-weight-light">
                 Linked USD
               </h1>
               <p className="text-white mt-4">
                 A decentralized stablecoin linked to the USD.
                 Using the linked protocol.
               </p>
             </Col>
             <Col lg="6">
               <img
                 alt="..."
                 className="img-fluid rounded-circle shadow"
                 src={require("../../../../assets/img/dollar-logo.png")}
                 style={{ width: "300px" }}
               />
             </Col>
           </Row>

           </Container>
       </div>
     </div>
    );
  }
}

export default Main;
