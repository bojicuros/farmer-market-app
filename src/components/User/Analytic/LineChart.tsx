import React from "react";
import ReactApexChart from "react-apexcharts";

type LineChartData = {
  name: string;
  data: number[];
};

type LineChartOptions = {
};

type LineChartProps = {
  data: LineChartData[];
  options: LineChartOptions;
};

type LineChartState = {
  chartData: LineChartData[];
  chartOptions: ApexCharts.ApexOptions; 
};

class LineChart extends React.Component<LineChartProps, LineChartState> {
  constructor(props: LineChartProps) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.data,
      chartOptions: this.props.options as ApexCharts.ApexOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
