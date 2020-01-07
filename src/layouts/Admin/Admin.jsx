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
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import Web3 from "web3";

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.jsx";
import Dashboard from "../../views/Dashboard.jsx"
import Vault from "../../views/Vault.jsx"
import Exchange from "../../views/Exchange.jsx";
import Economics from "../../views/Economics.jsx"
import Liquidations from "../../views/Liquidations.jsx"
import Footer from "../../components/Footer/Footer.jsx"

import routes from "../../routes.js";
import logo from "../../assets/img/dollar-logo-gray.png";

var ps;
let web3 = "";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
      web3Available: "false",
      metamask: true,
      unlocked: "",
      networkID: "",
      instanceToken: "",
      instanceColl: "",
      instanceExch: "",
      coinbase: "0x",
      rateUSD: "",
      balanceETH: "0,00",
      balanceTKN: "0,00",
      indexCP: "",
      dataTotalCP: "",
      individualCPs: [],
      liqRange: [],
      liqCPs: [],
      loop: 0,
      liquidityETH: 0,
      liquidityTokens: 0,
      claimETH: 0,
      claimTokens: 0,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    const TokenLinked = require("../../web3/LinkedTKN.json");
    const tokenaddress = "0x6B2dF5E744ccCC94c5B1c01BF8349b543594157c";
    const CollateralLinked = require("../../web3/LinkedCOL.json");
    const colladdress = "0x3AA50B60A7a54EA6950f9f074E81FbF86d893352";
    const TaxLinked = require("../../web3/LinkedTAX.json");
    const taxaddress = "0xC9c0E917F7Fd6B02d0751112Dc7e2DbC1Bf49D2D";
    const ExchangeLinked = require("../../web3/LinkedEXC.json");
    const exchangeaddress = "0x6417573b78b8d3E4Ba756c02b7Fc975348213333";
    if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        web3 = new Web3(window.ethereum);
        web3.eth.net.getId().then(netId => this.setState({networkID: netId}));
        if (this.state.networkID === "" || this.state.networkID === 3) {
          try {
            window.ethereum.enable().then(
              result => this.setState({unlocked: result}),
              this.setState({web3Available: "true"}),
              this.setState({instanceToken: new web3.eth.Contract(TokenLinked.abi,
                        tokenaddress)}),
              this.setState({instanceColl: new web3.eth.Contract(CollateralLinked.abi,
                        colladdress)}),
              this.setState({instanceTax: new web3.eth.Contract(TaxLinked.abi,
                        taxaddress)}),
              this.setState({instanceExch: new web3.eth.Contract(ExchangeLinked.abi,
                        exchangeaddress)}))
          } catch(e) {console.log("web3 blocked")}
        }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        web3.eth.net.getId().then(netId => this.setState({networkID: netId}));
        if (this.state.networkID === "" || this.state.networkID === 3) {
            this.setState({web3Available: "true"});
            this.setState({instanceToken: new web3.eth.Contract(TokenLinked.abi,
                    tokenaddress)});
            this.setState({instanceColl: new web3.eth.Contract(CollateralLinked.abi,
                    colladdress)});
            this.setState({instanceTax: new web3.eth.Contract(TaxLinked.abi,
                    taxaddress)});
            this.setState({instanceExch: new web3.eth.Contract(ExchangeLinked.abi,
                    exchangeaddress)});
        }
    }
    // Non-DApp Browsers
    else {
      this.setState({metamask: false});
    }
    this.getWeb3Data();
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
    this.getWeb3Data();
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.path === "/dashboard") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => <Dashboard
                                  web3={web3}
                                  web3Available={this.state.web3Available}
                                  instanceToken={this.state.instanceToken}
                                  instanceColl={this.state.instanceColl}
                                  balanceETH={this.state.balanceETH}
                                  balanceTKN={this.state.balanceTKN}
                                />}
              key={key}
            />);
        } else if (prop.path === "/collateral") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={() => <Vault
                                web3={web3}
                                web3Available={this.state.web3Available}
                                instanceToken={this.state.instanceToken}
                                instanceColl={this.state.instanceColl}
                                instanceTax={this.state.instanceTax}
                                balanceTKN={this.state.balanceTKN}
                                indexCP={this.state.indexCP}
                                individualCPs={this.state.individualCPs}
                                rateUSD={this.state.rateUSD}
                              />}
            key={key}
          />);
        } else if (prop.path === "/economics") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={() => <Economics
                              web3={web3}
                              web3Available={this.state.web3Available}
                              instanceToken={this.state.instanceToken}
                              instanceColl={this.state.instanceColl}
                              balanceTKN={this.state.balanceTKN}
                              totalCP={this.state.dataTotalCP}
                              rateUSD={this.state.rateUSD}
                              />}
            key={key}
          />);
        } else if (prop.path === "/liquidations") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={() => <Liquidations
                              web3={web3}
                              web3Available={this.state.web3Available}
                              instanceToken={this.state.instanceToken}
                              instanceColl={this.state.instanceColl}
                              rateUSD={this.state.rateUSD}
                              liqGroups={this.state.liqRange}
                              loop={this.state.loop}
                              />}
            key={key}
          />);
        } else if (prop.path === "/exchange") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => <Exchange
                                  web3={web3}
                                  web3Available={this.state.web3Available}
                                  instanceToken={this.state.instanceToken}
                                  instanceColl={this.state.instanceColl}
                                  instanceExch={this.state.instanceExch}
                                  balanceETH={this.state.balanceETH}
                                  balanceTKN={this.state.balanceTKN}
                                  liquidityETH={this.state.liquidityETH}
                                  liquidityTokens={this.state.liquidityTokens}
                                  claimETH={this.state.claimETH}
                                  claimTokens={this.state.claimTokens}
                                  rateUSD={this.state.rateUSD}
                                  coinbase={this.state.coinbase}
                                />}
              key={key}
            />);
        } else {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              />);
        }
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  async getWeb3Data () {
   if (this.state.unlocked !== ""){
    if (this.state.web3Available === "true" && this.state.coinbase === "0x"
        && this.state.networkID === 3) {
      //Get coinbase and ETH balance for user
      web3.eth.getCoinbase().then(result =>
        this.setState({coinbase: result}))
      web3.eth.getCoinbase().then(result =>
        web3.eth.getBalance(result).then(
          result => this.setState({balanceETH: (result/10**18).toLocaleString(
                        undefined, {minimumFractionDigits: 2,
                                    maximumFractionDigits:2})})));
      //Get Token balance for user
      web3.eth.getCoinbase().then(result =>
        this.state.instanceToken.methods.balanceOf(result).call().then(
          (result => this.setState({balanceTKN: (result)}))));
      //Get Total CP info
      this.state.instanceColl.methods.dataTotalCP().call().then(
            (result => this.setState({dataTotalCP: (result)})));
      //Get number of created CPs for user
      web3.eth.getCoinbase().then(result =>
        this.state.instanceColl.methods.index(result).call().then(
          (result => this.setState({indexCP: (result)}))));
      //Get current rateUSD
      this.state.instanceColl.methods.rate().call().then(
        (result => this.setState({rateUSD: (result)})));
      //Get liquidity of exchange
      web3.eth.getBalance("0x6417573b78b8d3E4Ba756c02b7Fc975348213333").then(
        result => this.setState({liquidityETH: (result/10**18).toLocaleString(
                        undefined, {minimumFractionDigits: 2,
                                    maximumFractionDigits:2})}));
      this.state.instanceToken.methods.balanceOf("0x6417573b78b8d3E4Ba756c02b7Fc975348213333").call().then(
        (result => this.setState({liquidityTokens: (result/10**20).toLocaleString(
                        undefined, {minimumFractionDigits: 2,
                                    maximumFractionDigits:2})})));
      web3.eth.getCoinbase().then(result =>
          this.state.instanceExch.methods.claimOfETH(result).call().then(
            (result => this.setState({claimETH: (result)}))));
      web3.eth.getCoinbase().then(result =>
          this.state.instanceExch.methods.claimOfTKN(result).call().then(
            (result => this.setState({claimTokens: (result)}))));
      //Get liquidation groups
      if (this.state.liqRange.length === 0) {
        for (var z = 0; z < 50; z++) {
          var liqrange = await this.state.instanceColl.methods._LiqRange(z).call();
          this.setState({liqRange: this.state.liqRange.concat(liqrange),
                         loop: z});

        }
      }

    }
    var CPdata = [];
    if (this.state.web3Available === "true" && this.state.coinbase !== "0x"
        && this.state.individualCPs[0] === undefined
        && this.state.networkID === 3
        && this.state.indexCP > 0) {
          for (var i = 0; i < this.state.indexCP; i++) {
            CPdata = await this.state.instanceColl.methods.individualCPdata(this.state.coinbase, i).call();
            if (this.state.individualCPs.length === i) {
              this.state.individualCPs[i] = CPdata
            }
          }
    }};
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "/",
              text: "Linked stablecoin",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              coinbase={this.state.coinbase}
              coinbase_load={this.state.coinbase_load}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              metamask={this.state.metamask}
              networkID={this.state.networkID}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid/>
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}

export default Admin;
