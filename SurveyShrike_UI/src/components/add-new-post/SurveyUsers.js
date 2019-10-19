/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

export default class SurveyUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };
  }


  render() {

    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Survey Users</h6>
        </CardHeader>

        <CardBody className="p-0">
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    User Name
                  </th>
                </tr>
              </thead>
              <tbody>

                {

                  this.props.surveyEntries.length > 0 ? this.props.surveyEntries.map((obj, index) => {

                    return (<tr>
                      <td>{index}</td>
                      <td onClick={() => { this.props.getUserSurveyAnswer(obj.userName) }} >{obj.userName}</td>
                    </tr>);
                  }) : ""
                }

              </tbody>
            </table>
          </CardBody>
        </CardBody>
      </Card>
    );
  }
}


