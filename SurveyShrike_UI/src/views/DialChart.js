// Step 1 - Including react
import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Col, FormRadio, } from "shards-react";
// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);



// Step 9 - Creating the DOM element to pass the react-fusioncharts component
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "total",
            dataSource: {
                // Chart Configuration
                "chart": {
                    "caption": this.props.question,
                    "lowerLimit": this.props.rangeFrom,
                    "upperLimit": this.props.rangeTo,
                    "showValue": "1",
                    "theme": "fusion",
                    "showToolTip": "0"
                },
                // Chart Data
                "colorRange": {
                    "color": [{
                        "minValue": this.props.rangeFrom,
                        "maxValue": 0.50 * (this.props.rangeTo - this.props.rangeFrom),
                        "code": "#F2726F"
                    }, {
                        "minValue": 0.50 * (this.props.rangeTo - this.props.rangeFrom),
                        "maxValue": 0.75 * (this.props.rangeTo - this.props.rangeFrom),
                        "code": "#FFC533"
                    }, {
                        "minValue": 0.75 * (this.props.rangeTo - this.props.rangeFrom),
                        "maxValue": this.props.rangeTo,
                        "code": "#62B58F"
                    }]
                },
                "dials": {
                    "dial": [{
                        "value": this.props.avgValue["total"]
                    }]
                }
            }
        };
    }

    addToState = (event) => {
        let datasource = this.state.dataSource
        datasource.dials.dial[0].value = this.props.avgValue[event.target.value]

        this.setState({
            datasource: datasource,
            viewType: event.target.value
        })
    }

    render() {
        console.log(this.props.question)
        return (
            <div>
                <ReactFC
                    type='angulargauge'
                    width='400'
                    height='300'
                    dataFormat='json'
                    dataSource={this.state.dataSource}
                />
                <Col sm="12" md="8" className="mb-3 ml-4" width={400}>
                    <fieldset>
                        <FormRadio inline value="total" onChange={this.addToState} checked={this.state.viewType === "total"}>Total</FormRadio>
                        <FormRadio inline value="Male" onChange={this.addToState} checked={this.state.viewType === "Male"}>Male</FormRadio>
                        <FormRadio inline value="Female" onChange={this.addToState} checked={this.state.viewType === "Female"}> Female</FormRadio>
                    </fieldset>
                </Col>
            </div>
        );
    }
}

