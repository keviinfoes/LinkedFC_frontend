import React from "react";

// core components
import IndexNavbar from "./elements/Navbars/IndexNavbar.jsx";
import PageHeader from "./elements/PageHeader/PageHeader.jsx";
import Main from "./elements/Main/Main.jsx";
import Main0 from "./elements/Main/Main0.jsx";
import Footer from "./elements/Footer/Footer.jsx";

class Front extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <PageHeader />
            <div className="main">
            <Main />
            <Main0 />
            </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Front;
