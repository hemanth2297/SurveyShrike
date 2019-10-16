import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormInput,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import SidebarActions from "../components/add-new-post/AddQuestion";
import SidebarCategories from "../components/add-new-post/SidebarCategories";

import { getSurvey } from '../assets/form';

export default class AddNewSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "Text",
      options: "",
      question: "",
      rangeFrom: "",
      rangeTo: "",
      surveyName: "",
      surveyDescription: "",
      disableOptions: true,
      disaleRange: true,
      surveyQuestions: [],
    };
  }

  componentDidMount = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const surveyName = params.get("surveyName")
    getSurvey(surveyName)


    getSurvey(surveyName).then(response => {
      console.log(response)
    })
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add New Survey" subtitle="Blog Posts" className="text-sm-left" />
        </Row>

        <Row>
          <Col lg="9" md="8">
            <Row>
              <Col lg="12" className="mb-4">
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Form Inputs</h6>
                  </CardHeader>

                  <ListGroup flush>
                    <ListGroupItem className="p-0 px-3 pt-3">
                      <FormInput size="lg" className="mb-3 ml-1 mr-3" name="surveyName" onChange={this.addToState} placeholder="Your Post Title" />
                      <FormInput size="lg" className="mb-3 ml-1 mr-3" name="surveyDescription" onChange={this.addToState} placeholder="Your Post Description" />
                    </ListGroupItem>

                    {this.state.surveyQuestions.map(obj => {
                      if (obj.questionType === "Text") {
                        return this.AddTextQuestion(obj)
                      }
                      if (obj.questionType === "Radio") {
                        return this.AddRadioQuestion(obj)
                      }
                      if (obj.questionType === "DropDown") {
                        return this.AddDropDownQuestion(obj)
                      }
                      if (obj.questionType === "Slider") {
                        return this.AddSliderQuestion(obj)
                      }
                      return ""
                    })}


                    <ListGroupItem className="p-3">
                      <Row>
                        <Col>
                          <Button theme="primary" className="mb-2 mr-2" onClick={this.createSurvey}>
                            Submit</Button>
                          <Button theme="danger" className="mb-2 mr-2">
                            Cancel</Button>
                        </Col>
                      </Row>
                    </ListGroupItem>

                  </ListGroup>
                </Card>

              </Col>
            </Row>
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <SidebarActions
              addToState={this.addToState}
              disableOptions={this.state.disableOptions}
              disableRange={this.state.disaleRange}
              addQuestion={this.addQuestion}
            ></SidebarActions>
            <SidebarCategories />
          </Col>
        </Row>
      </Container>
    )
  }
};
