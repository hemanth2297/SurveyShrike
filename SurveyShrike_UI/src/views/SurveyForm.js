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

import PageTitle from "../components/common/PageTitle";

import { getSurvey, fillForm } from '../assets/form';


export default class SurveyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // First list of posts.
      surveyForm: {},
      answers: {},
      userName: "",
      validate: false,
    };
  }


  componentDidMount = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const surveyName = params.get("surveyName")

    getSurvey(surveyName).then(response => {
      console.log(response)
      this.setState({
        surveyForm: response
      })

    })
  }
  submitSurvey = () => {
    this.setState({
      validate: true
    })
    if (Object.keys(this.state.answers).length !== Object.keys(this.state.surveyForm.surveyForm).length) {
      return;
    }
    let submit = true;
    Object.values(this.state.answers).forEach(ans => {
      if (ans === "") {
        submit = false;
      }
    })
    if (!submit) {
      return;
    }

    const surveyEntry = {
      'userName': this.state.userName,
      'surveyName': this.state.surveyForm.surveyName,
      'entryForm': this.state.answers
    }
    fillForm(surveyEntry)
  }
  addToState = (event) => {
    if (event.target.name === "userName") {
      this.setState({
        userName: event.target.value,
        validate: false
      })
      return;
    }
    const answer = this.state.answers
    answer[event.target.name] = event.target.value
    this.setState({
      answers: answer
    })
    console.log(this.state.answers)
  }

  addToSlide = (name, event) => {

    const answer = this.state.answers
    answer[name] = event[0]
    this.setState({
      answers: answer,
      validate: false
    })
  }

  addToRadio = (name, value) => {
    const answer = this.state.answers
    answer[name] = value
    this.setState({
      answers: answer,
      validate: false
    })

  }
  AddRadioQuestion = (QuestionObject, index) => {
    let QuestionClass = ""
    if (this.state.validate) {
      QuestionClass = this.state.answers[index] !== "" && this.state.answers[index] ? "" : "InvalidEntry"
    }
    const Question = (<div className="RadioOption p-3">
      <ListGroupItem className="p-0 ">
        <strong className={"text d-block my-2 " + QuestionClass}>{QuestionObject.question}</strong>
        <Row>
          <Col sm="12" md="8" className="mb-3">
            <fieldset >
              {
                QuestionObject.options.split(",").map((option, index2) => {
                  return <FormRadio inline key={index2} onChange={() => {
                    this.addToRadio(index, option);
                  }}
                    checked={this.state.answers[index] === option}
                  >{option}</FormRadio>
                })
              }
            </fieldset>
          </Col>
        </Row>
      </ListGroupItem>
    </div>);

    return Question
  }
  AddSliderQuestion = (QuestionObject, index) => {
    let QuestionClass = ""
    if (this.state.validate) {
      QuestionClass = this.state.answers[index] !== "" && this.state.answers[index] ? "" : "InvalidEntry"
    }
    const value = this.state.answers[index] > 0 ? this.state.answers[index] : 0
    const Question = (<ListGroupItem className="p-3">
      <strong className={"text d-block my-2 " + QuestionClass}>{QuestionObject.question}</strong>
      <Col sm="12" md="8" className="mb-3">
        <Slider
          onSlide={(e) => this.addToSlide(index, e)}
          connect={[true, false]}
          start={[value]}
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
  AddDropDownQuestion = (QuestionObject, index) => {
    let QuestionClass = ""
    if (this.state.validate) {
      QuestionClass = this.state.answers[index] !== "" && this.state.answers[index] ? "" : "InvalidEntry"
    }
    const Question = (<ListGroupItem className="p-3">
      <strong className={"text d-block my-2 " + QuestionClass}>{QuestionObject.question}</strong>
      <FormSelect id="feInputState" placeholder='Select Option' name={index} onChange={this.addToState} >
        {
          QuestionObject.options.split(",").map(option => {
            return <option>{option}</option>
          })
        }
      </FormSelect>
    </ListGroupItem>);
    return Question
  }


  AddTextQuestion = (QuestionObject, index) => {
    let QuestionClass = ""
    if (this.state.validate) {
      QuestionClass = this.state.answers[index] !== "" && this.state.answers[index] ? "" : "InvalidEntry"
    }
    const Question = (<ListGroupItem className="p-3">
      <FormGroup>
        <label htmlFor="feInputAddress" className={QuestionClass}>{QuestionObject.question}</label>
        <FormInput id="feInputAddress" name={index} onChange={this.addToState} placeholder="1234 Main St" />
      </FormGroup>
    </ListGroupItem>);


    return Question
  }




  render() {
    let userNameClass = ""
    if (this.state.validate) {
      if (this.state.userName === "") {
        userNameClass = "Invalid"
      }
    }


    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title={this.state.surveyForm.surveyName}
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="8" className="mb-4">
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Fill Form</h6>
                </CardHeader>

                <ListGroup flush>

                  <ListGroupItem className="p-0 px-3 pt-3">
                    <FormInput size="lg" className={"mb-3 ml-1 mr-3 " + userNameClass} name="userName" onChange={this.addToState} placeholder="Your Name" />
                  </ListGroupItem>

                  {
                    this.state.surveyForm.surveyForm ?
                      Object.values(this.state.surveyForm.surveyForm).map((obj, index) => {
                        if (obj.questionType === "Text") {
                          return this.AddTextQuestion(obj, index)
                        }
                        if (obj.questionType === "Radio") {
                          return this.AddRadioQuestion(obj, index)
                        }
                        if (obj.questionType === "DropDown") {
                          return this.AddDropDownQuestion(obj, index)
                        }
                        if (obj.questionType === "Slider") {
                          return this.AddSliderQuestion(obj, index)
                        }
                        return ""
                      }) : ""}

                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Button theme="primary" className="mb-2 mr-2" onClick={this.submitSurvey}>
                          Submit</Button>
                        <Button theme="danger" className="mb-2 mr-2" onClick={this.infoClick}>
                          Cancel</Button>
                      </Col>
                    </Row>
                  </ListGroupItem>

                </ListGroup>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

