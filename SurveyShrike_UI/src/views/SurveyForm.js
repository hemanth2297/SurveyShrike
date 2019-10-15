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

const ComponentsOverview = () => (
  <div>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Forms & Components"
          subtitle="Overview"
          className="text-sm-left"
        />
      </Row>


      <Row>
        <Col lg="8" className="mb-4">
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Form Inputs</h6>
            </CardHeader>

            <ListGroup flush>
              <div className="RadioOption">
                <ListGroupItem className="p-0 px-3 pt-3">
                  <strong className="text d-block my-2">For a Radio Button Question ?</strong>
                  <Row>
                    <Col sm="12" md="8" className="mb-3">
                      <fieldset>
                        <FormRadio>Default</FormRadio>
                        <FormRadio defaultChecked>Checked</FormRadio>
                        <FormRadio disabled>Disabled</FormRadio>
                        <FormRadio disabled defaultChecked>
                          Disabled Checked </FormRadio>
                      </fieldset>
                    </Col>
                  </Row>
                </ListGroupItem>
              </div>

              <ListGroupItem className="p-3">
                <strong className="text d-block my-2">For a Slider Option ?</strong>
                <Col sm="12" md="8" className="mb-3">
                  <Slider
                    connect={[true, false]}
                    start={[85]}
                    pips={{
                      mode: "positions",
                      values: [0, 25, 50, 75, 100],
                      stepped: true,
                      density: 5
                    }}
                    range={{ min: 0, max: 100 }}
                  />
                </Col>
              </ListGroupItem>


              <ListGroupItem className="p-3">
                <strong className="text d-block my-2">For a Slider Option ?</strong>
                <FormSelect id="feInputState" placeholder='Select Option'>
                  <option>,dfbv,</option>
                  <option>,dfbv,</option>
                  <option>sd.vn.,m</option>
                  <option>sdv</option>
                </FormSelect>

              </ListGroupItem>


              <ListGroupItem className="p-3">
                <FormGroup>
                  <label htmlFor="feInputAddress">Address</label>
                  <FormInput id="feInputAddress" placeholder="1234 Main St" />
                </FormGroup>
              </ListGroupItem>



              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Button theme="primary" className="mb-2 mr-2">
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
    </Container>
  </div>
);

export default ComponentsOverview;
