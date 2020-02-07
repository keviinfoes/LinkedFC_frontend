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
import Dashboard from "./views/Dashboard.jsx";
import Economics from "./views/Economics.jsx";
import Vault from "./views/Vault.jsx";
import Liquidations from"./views/Liquidations.jsx";
import Exchange from "./views/Exchange.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/dapp"
  },
  {
    path: "/collateral",
    name: "Collateral",
    icon: "tim-icons icon-coins",
    component: Vault,
    layout: "/dapp"
  },
  {
    path: "/exchange",
    name: "Exchange",
    icon: "tim-icons icon-money-coins",
    component: Exchange,
    layout: "/dapp"
  },
  {
    path: "/liquidations",
    name: "Liquidations",
    icon: "tim-icons icon-bank",
    component: Liquidations,
    layout: "/dapp"
  },
  {
    path: "/economics",
    name: "Economics",
    icon: "tim-icons icon-chart-bar-32",
    component: Economics,
    layout: "/dapp"
  }
];
export default routes;
