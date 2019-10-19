import React from "react";
import { Container, Button } from "shards-react";

export default class Error extends React.Component {

  redirectToLogin = (event) => {

    console.log("test")
    this.props.history.push("/login")

  }
  render() {
    localStorage.removeItem('userName');
    localStorage.removeItem('access_token');
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h2>401</h2>
            <h3>Session Expired</h3>
            <p>Please Login again to continue</p>
            <Button pill onClick={this.redirectToLogin} name="goTo">&larr; Go to LoginPage</Button>
          </div>
        </div>
      </Container >
    )
  }
}


