import React from "react";
// import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
// import MainFooter from "../components/layout/MainFooter";


const DefaultLayout = ({ children, noNavbar, noSidebar }) => (
  <Container fluid>
    <Row>
      {!noSidebar && <MainSidebar />}
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {/* {!noFooter && <MainFooter />} */}
      </Col>
    </Row>
  </Container>
);

// console.log(props)

// DefaultLayout.propTypes = {

//   /**
//    * Whether to display the navbar, or not.
//    */
//   noNavbar: PropTypes.bool,
//   /**
//    * Whether to display the footer, or not.
//    */
//   noFooter: PropTypes.bool
// };

// DefaultLayout.defaultProps = {
//   noNavbar: false,
//   noSidebar: false
// };

// console.log(window.location.pathname)
// if (window.location.pathname === '/login' || window.location.pathname === '/register' ||
//   window.location.pathname === '/logout' || window.location.pathname === '/survey-form') {
//   DefaultLayout.defaultProps = {
//     noNavbar: true,
//     noSidebar: true
//   };
// }
// else {
//   DefaultLayout.defaultProps = {
//     noNavbar: false,
//     noSidebar: false
//   };
// }

export default DefaultLayout;
