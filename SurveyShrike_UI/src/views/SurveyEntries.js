import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Button,
  FormRadio,
  FormInput,
  FormGroup,
  FormSelect,
  Slider,
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import SurveyUsers from "../components/add-new-post/SurveyUsers";

import { getSurvey, getSurveyEntries } from '../assets/form';

export default class AddNewSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyForm: {},
      answers: {},
      surveyEntries: []
    };
  }

  getUserSurveyAnswer = (username) => {


    for (const i in this.state.surveyEntries) {
      if (username === this.state.surveyEntries[i].userName) {
        this.setState({
          answers: this.state.surveyEntries[i].entryForm
        })
      }

    }
    console.log(this.state.answers)
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

    getSurveyEntries(surveyName).then(response => {
      console.log(response)
      this.setState({
        surveyEntries: response.results
      })
      console.log(response)
    })

  }
  AddRadioQuestion = (QuestionObject, index) => {

    const Question = (<div className="RadioOption">
      <ListGroupItem className="p-0 px-3 pt-3">
        <strong className="text d-block my-2">{QuestionObject.question}</strong>
        <Row>
          <Col sm="12" md="8" className="mb-3">
            <fieldset >
              {
                QuestionObject.options.split(",").map((option, index2) => {
                  return <FormRadio inline key={index2} checked={this.state.answers[index] === option}
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
    const value = this.state.answers[index] > 0 ? this.state.answers[index] : 0
    const Question = (<ListGroupItem className="p-3">
      <strong className="text d-block my-2">{QuestionObject.question}</strong>
      <Col sm="12" md="8" className="mb-3">
        <Slider
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
    const Question = (<ListGroupItem className="p-3">
      <strong className="text d-block my-2">{QuestionObject.question}</strong>
      <FormSelect id="feInputState" placeholder='Select Option' value={this.state.answers[index] ? this.state.answers[index] : ""} >
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
    const Question = (<ListGroupItem className="p-3">
      <FormGroup>
        <label htmlFor="feInputAddress">{QuestionObject.question}</label>
        <FormInput id="feInputAddress" value={this.state.answers[index] ? this.state.answers[index] : ""} />
      </FormGroup>
    </ListGroupItem>);


    return Question
  }
  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Survey Details" className="text-sm-left" />
        </Row>

        <Row>
          <Col lg="9" md="8">
            <Row>
              <Col lg="12" className="mb-4">
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">{this.state.surveyForm.surveyName}</h6>
                  </CardHeader>

                  <ListGroup flush>

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
                        }) : ""
                    }


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
            <SurveyUsers
              surveyEntries={this.state.surveyEntries}
              getUserSurveyAnswer={this.getUserSurveyAnswer}  >
            </SurveyUsers>
          </Col>
        </Row>
      </Container>
    )
  }
};
