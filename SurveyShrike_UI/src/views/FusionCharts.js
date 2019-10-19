// Step 1 - Include react
import React from 'react';
// import ReactDOM from 'react-dom';

// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Include the chart type
import Pie2D from 'fusioncharts/fusioncharts.charts';

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { Col, FormRadio, } from "shards-react";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
// const chartConfigs = {
//     type: 'pie2d',// The chart type
//     width: '400', // Width of the chart
//     height: '500', // Height of the chart
//     dataFormat: 'json', // Data type

// };

// Step 9 - Creating the DOM element to pass the react-fusioncharts component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "total",
            dataSource: {
                // Chart Configuration
                chart: {
                    "caption": this.props.question,
                    "xAxisName": "Country",
                    "yAxisName": "Reserves (MMbbl)",
                    "theme": "fusion",
                },
                // Chart Data
                data: []
            }
        };
    }
    convertTodata = (data) => {
        console.log(data)
        let finalData = []

        Object.entries(data).forEach(([key, value]) => {
            const val = {
                label: key,
                value: value
            }
            finalData.push(val)

        })
        console.log(finalData)
        return finalData
    }
    componentDidMount = () => {
        let datasource = this.state.dataSource
        datasource.data = this.convertTodata(this.props.statsRender["total"])
        console.log(datasource)
        this.setState({
            datasource: datasource,

        })
    }
    addToState = (event) => {
        let datasource = this.state.dataSource
        datasource.data = this.convertTodata(this.props.statsRender[event.target.value])
        console.log(datasource)
        this.setState({
            datasource: datasource,
            viewType: event.target.value
        })
    }
    render() {
        // chartConfigs.dataSource.data = this.state.data

        return (
            <div>
                <ReactFC
                    type='pie2d'
                    width='400'
                    height='500'
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


            </div >
        );
    }
}

export default App