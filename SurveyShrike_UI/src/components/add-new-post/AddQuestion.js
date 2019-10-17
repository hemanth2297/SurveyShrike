/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  FormSelect,
  FormGroup,
  FormInput,
  Form,
  Button,
  Row, Col
} from "shards-react";

export default class SidebarActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };
  }


  render() {
    let questionClass = "", optionClass = "", rangeClass = ""
    if (this.props.validate) {
      if (this.props.question === "") {
        questionClass = "Invalid"
      }
      else if ((this.props.questionType === "DropDown" || this.props.questionType === "Radio") && this.props.options === "") {
        optionClass = "Invalid"
      }

      else if (this.props.questionType === "Slider") {
        if (this.props.rangeFrom === "" || this.props.rangeTo === "" || (parseInt(this.props.rangeFrom) >= parseInt(this.props.rangeTo))) {
          rangeClass = "Invalid"
        }
      }
    }

    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Add Question</h6>
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup flush>

            <ListGroupItem className="p-1">
              <strong className="text d-block my-2">Question Type</strong>
              <FormSelect id="feInputState" placeholder='Select Option' name="questionType" onChange={this.props.addToState}>
                <option>Text</option>
                <option>Radio</option>
                <option>DropDown</option>
                <option>Slider</option>
              </FormSelect>

              <FormGroup>
                <label htmlFor="feInputAddress">Add Question</label>
                <FormInput className={questionClass} cid="feInputAddress" placeholder="Add Question" name="question" onChange={this.props.addToState} />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress">Add Options</label>
                <FormInput className={optionClass} id="feInputAddress" placeholder="Comma Separated" name="options"
                  onChange={this.props.addToState} disabled={this.props.disableOptions} />
              </FormGroup>

              <label htmlFor="forRange">Select Range</label>
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      <Col md="6" className="form-group">
                        <FormInput
                          id="from"
                          type="number"
                          placeholder="From"
                          name="rangeFrom"
                          className={rangeClass}
                          disabled={this.props.disableRange}
                          onChange={this.props.addToState}
                        />
                      </Col>
                      <Col md="6">
                        <FormInput
                          id="to"
                          type="number"
                          placeholder="To"
                          name="rangeTo"
                          className={rangeClass}
                          disabled={this.props.disableRange}
                          onChange={this.props.addToState}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem className="p-3">
              <Row>

                <Button theme="primary" className="mb-2 mr-2 ml-2" onClick={this.props.addQuestion}>Add Question</Button>
              </Row>
            </ListGroupItem>

          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}


