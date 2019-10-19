/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // CardFooter,
  Badge,
  // Button
} from "shards-react";


import { getUserSurvyes } from '../assets/form';
import PageTitle from "../components/common/PageTitle";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [],
    };
  }


  componentDidMount = () => {
    if (localStorage.getItem('access_token') === null) {
      this.props.history.push("/login");
      return
    }

    getUserSurvyes().then(response => {
      if (!response.ok) {
        this.props.history.push("/sessionExpired");
        return;
      }
      for (let i = 0; i < response.results.length; i++) {
        const min = 1;
        const max = 9;
        const rand = parseInt(min + Math.random() * (max - min))
        response["results"][i]["backgroundImage"] = require("../images/content-management/" + rand + ".jpeg")
        response["results"][i]["date"] = "29 February 2019"
        response["results"][i]["authorAvatar"] = require("../images/avatars/3.jpg")
        response["results"][i]["category"] = "Business"
        response["results"][i]["categoryTheme"] = "warning"
      }
      this.setState({
        PostsListOne: response.results
      })
    })

  }
  render() {
    const {
      PostsListOne,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Surveys" subtitle="User" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.userName}
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title" style={{ minHeight: "20px" }}>
                    <a href={"/survey-entries?surveyName=" + post.surveyName} className="text-fiord-blue">
                      {post.surveyName}
                    </a>
                  </h5>
                  <p style={{ minHeight: "75px" }} className="card-text d-inline-block mb-3">{post.surveyDescription}</p>
                  <div className="d-flex flex-column justify-content-center ">
                    <span className="card-post__author-name">
                      {post.userName}
                    </span>
                    <small className="text-muted">{post.date}</small>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
