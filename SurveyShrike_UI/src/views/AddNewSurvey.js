import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormRadio,
  FormInput,
  FormGroup,
  Slider,
  FormSelect,
  Button
} from "shards-react";


import { createForm } from '../assets/form';

import PageTitle from "../components/common/PageTitle";
import SidebarActions from "../components/add-new-post/AddQuestion";
import SidebarCategories from "../components/add-new-post/SidebarCategories";


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

  createSurvey = () => {
    console.log(localStorage.getItem('userName'))
    const surveyForm = {}
    this.state.surveyQuestions.map((value, index) =>
      surveyForm[index] = value
    )
    const surveyObject = {
      'userName': localStorage.getItem('userName'),
      'surveyName': this.state.surveyName,
      'surveyDescription': this.state.surveyDescription,
      'surveyForm': surveyForm
    }
    createForm(surveyObject)
  }
  addQuestion = () => {
    const obj = {
      "question": this.state.question,
      "questionType": this.state.questionType,
      "options": this.state.options,
      "rangeFrom": this.state.rangeFrom,
      "rangeTo": this.state.rangeTo,
    }
    const intialQuestions = this.state.surveyQuestions
    intialQuestions.push(obj)
    this.setState({
      surveyQuestions: intialQuestions
    })

    console.log(this.state.surveyQuestions)
  }

  AddRadioQuestion = (QuestionObject) => {

    const Question = (<div className="RadioOption">
      <ListGroupItem className="p-0 px-3 pt-3">
        <strong className="text d-block my-2">{QuestionObject.question}</strong>
        <Row>
          <Col sm="12" md="8" className="mb-3">
            <fieldset>

              {
                QuestionObject.options.split(",").map(option => {
                  return <FormRadio>{option}</FormRadio>
                })
              }
            </fieldset>
          </Col>
        </Row>
      </ListGroupItem>
    </div>);

    return Question
  }
  AddSliderQuestion = (QuestionObject) => {
    const Question = (<ListGroupItem className="p-3">
      <strong className="text d-block my-2">{QuestionObject.question}</strong>
      <Col sm="12" md="8" className="mb-3">
        <Slider
          connect={[true, false]}
          start={[parseInt(QuestionObject.rangeFrom)]}
          pips={{
            mode: "positions",
            values: [0, 25, 50, 75, 100],
            stepped: true,
            density: 5
          }}
          range={{ min: parseInt(QuestionObject.rangeFrom), max: parseInt(QuestionObject.rangeTo) }}
        />
      </Col>
    </ListGroupItem>)
    return Question
  }
  AddDropDownQuestion = (QuestionObject) => {
    const Question = (<ListGroupItem className="p-3">
      <strong className="text d-block my-2">{QuestionObject.question}</strong>
      <FormSelect id="feInputState" placeholder='Select Option'>
        {
          QuestionObject.options.split(",").map(option => {
            return <option>{option}</option>
          })
        }
      </FormSelect>
    </ListGroupItem>);
    return Question
  }


  AddTextQuestion = (QuestionObject) => {
    const Question = (<ListGroupItem className="p-3">
      <FormGroup>
        <label htmlFor="feInputAddress">{QuestionObject.question}</label>
        <FormInput id="feInputAddress" placeholder="1234 Main St" />
      </FormGroup>
    </ListGroupItem>);


    return Question
  }

  addToState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    if (event.target.name === "questionType") {
      this.setState({
        disableOptions: event.target.value === "Text" || event.target.value === "Slider" ? true : false,
        disaleRange: event.target.value === "Slider" ? false : true,
      })
    }

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
