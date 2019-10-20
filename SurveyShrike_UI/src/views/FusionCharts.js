// Step 1 - Include react
import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Pie2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Col, FormRadio, } from "shards-react";
ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme);

// This Component is used to view Pie Chart for Radio and DrillDown Questions
class FusionCharts2 extends React.Component {
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

    // Converting API data to render into Fusion Charts
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

    // Setting intial view for the stats
    componentDidMount = () => {
        let datasource = this.state.dataSource
        datasource.data = this.convertTodata(this.props.statsRender["total"])
        console.log(datasource)
        this.setState({
            datasource: datasource,

        })
    }

    // Adding to State on change of the form Value
    addToState = (event) => {
        let datasource = this.state.dataSource
        if (event.target.name === "gender2") {
            datasource.data = this.convertTodata(this.props.statsRender[event.target.value])
            this.setState({
                datasource: datasource,
                viewType: event.target.value
            })
        }

    }
    render() {
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
                        <FormRadio inline value="total" name='gender2' onChange={this.addToState} checked={this.state.viewType === "total"}>Total</FormRadio>
                        <FormRadio inline value="Male" name='gender2' onChange={this.addToState} checked={this.state.viewType === "Male"}>Male</FormRadio>
                        <FormRadio inline value="Female" name='gender2' onChange={this.addToState} checked={this.state.viewType === "Female"}> Female</FormRadio>
                    </fieldset>
                </Col>


            </div >
        );
    }
}

export default FusionCharts2