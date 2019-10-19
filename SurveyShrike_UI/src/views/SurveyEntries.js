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
  CardImg
} from "shards-react";

import { Modal, ModalBody, ModalHeader } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import SurveyUsers from "../components/add-new-post/SurveyUsers";

import { getSurvey, getSurveyEntries } from '../assets/form';
import FusionCharts from "./FusionCharts"
import AnswerTable from "./AnswerTable"
import DialChart from "./DialChart"

export default class AddNewSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyForm: {},
      answers: {},
      surveyEntries: [],
      open: false,
      gender: "",
      surveyStats: {},
      statsRender: {},
      question: "",
      openText: false,
      openSlider: false,
      textqsnIndex: 0,
      rangeTo: 0,
      rangeFrom: 0,
      avgValue: {}
    };
  }

  getUserSurveyAnswer = (username) => {


    for (const i in this.state.surveyEntries) {
      if (username === this.state.surveyEntries[i].userName) {
        this.setState({
          answers: this.state.surveyEntries[i].entryForm,
          gender: this.state.surveyEntries[i].gender
        })
      }

    }
  }

  componentDidMount = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const surveyName = params.get("surveyName")

    getSurvey(surveyName).then(response => {

      this.setState({
        surveyForm: response
      })

    })

    getSurveyEntries(surveyName).then(response => {

      this.setState({
        surveyEntries: response.results,
        surveyStats: response.stats
      })

    })

  }
  AddRadioQuestion = (QuestionObject, index) => {

    const Question = (<div className="RadioOption">
      <ListGroupItem className="p-0 px-3 pt-3">
        <strong className="text d-block my-2">{QuestionObject.question}</strong>
        <i class="fas fa-chart-pie" onClick={() => this.toggle(QuestionObject.question, index)} style={{ fontSize: "18px", color: "blue", float: 'right' }} />
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
      <i class="fas fa-chart-pie" onClick={() => this.toggleSlider(QuestionObject.question, index, parseInt(QuestionObject.rangeFrom), parseInt(QuestionObject.rangeTo))} style={{ fontSize: "18px", color: "blue", float: 'right' }} />

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
      <i class="fas fa-chart-pie" onClick={() => this.toggle(QuestionObject.question, index)} style={{ fontSize: "18px", color: "blue", float: 'right' }} />

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


  toggle = (question, index) => {
    this.setState({
      open: !this.state.open,
      question: question,
      statsRender: this.state.surveyStats[index]
    });
  }

  toggleSlider = (question, index, rangeFrom, rangeTo) => {
    console.log(question)
    if (question) {
      const stats = this.state.surveyStats[index]
      let total = { "total": 0, "Male": 0, "Female": 0 }
      let val = { "total": 0, "Male": 0, "Female": 0 }
      let mean = { "total": 0, "Male": 0, "Female": 0 }

      console.log(stats)

      Object.entries(stats).forEach(([key, value]) => {
        Object.entries(value).forEach(([key2, value2]) => {
          total[key] += parseInt(key2) * parseInt(value2)
          val[key] += value2
        })
      })
      Object.entries(total).forEach(([key, value]) => {
        mean[key] = total[key] / val[key]
      })
      this.setState({
        question: question,
        textqsnIndex: index,
        rangeFrom: rangeFrom,
        rangeTo: rangeTo,
        avgValue: mean
      });
    }
    this.setState({
      openSlider: !this.state.openSlider,

    });
  }


  toggleText = (question, index) => {
    this.setState({
      openText: !this.state.openText,
      question: question,
      textqsnIndex: index
    });
  }

  AddTextQuestion = (QuestionObject, index) => {
    const Question = (<ListGroupItem className="p-3">
      <FormGroup>
        <label htmlFor="feInputAddress">{QuestionObject.question}</label>
        <i class="fas fa-chart-pie" onClick={() => this.toggleText(QuestionObject.question, index)} style={{ fontSize: "18px", color: "blue", float: 'right' }} />
        <FormInput id="feInputAddress" value={this.state.answers[index] ? this.state.answers[index] : ""} />
      </FormGroup>
    </ListGroupItem>);


    return Question
  }
  AddUploadQuestion = (QuestionObject, index) => {

    const img = this.state.answers[index] ?
      (<CardImg style={{ width: "200px", height: "200px" }} src={this.state.answers[index]} alt="" />
      ) : ""

    const Question = (<ListGroupItem className="p-3">
      <FormGroup>
        <label inline-block htmlFor="feInputAddress">{QuestionObject.question}</label>
        {img}
      </FormGroup>
    </ListGroupItem>);

    return Question

  }
  render() {

    return (


      <Container fluid className="main-content-container px-4 pb-4">
        <Modal open={this.state.open} toggle={this.toggle}>
          <ModalHeader>Statistics</ModalHeader>
          <ModalBody>
            <FusionCharts
              statsRender={this.state.statsRender}
              question={this.state.question}
            ></FusionCharts>

          </ModalBody>
        </Modal>

        <Modal open={this.state.openText} toggle={this.toggleText}>
          <ModalHeader>Statistics</ModalHeader>
          <ModalBody>
            <AnswerTable
              surveyEntries={this.state.surveyEntries}
              textqsnIndex={this.state.textqsnIndex}
              question={this.state.question}
            ></AnswerTable>

          </ModalBody>
        </Modal>

        <Modal open={this.state.openSlider} toggle={this.toggleSlider}>
          <ModalHeader>Statistics</ModalHeader>
          <ModalBody>
            <DialChart
              rangeFrom={parseInt(this.state.rangeFrom)}
              rangeTo={parseInt(this.state.rangeTo)}
              avgValue={this.state.avgValue}
              question={this.state.question}
            ></DialChart>

          </ModalBody>
        </Modal>
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

                    <ListGroupItem className="p-0 px-3 pt-3">
                      <strong className={"text d-block my-2 "}>Gender</strong>
                      <Row>
                        <Col sm="12" md="8" className="mb-3">
                          <fieldset >
                            <FormRadio inline name="gender" checked={this.state.gender === "Male"}>Male</FormRadio>
                            <FormRadio inline name="gender" checked={this.state.gender === "Female"}>Female</FormRadio>
                          </fieldset>
                        </Col>
                      </Row>
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
                          if (obj.questionType === "Upload") {
                            return this.AddUploadQuestion(obj, index)
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
      </Container >
    )
  }
};
