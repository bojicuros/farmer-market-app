import { Component } from "react";
import Chart from "react-apexcharts";

type BarChartData = {
  name: string;
  data: number[];
};

type BarChartOptions = {};

type BarChartProps = {
  data: BarChartData[];
  options: BarChartOptions;
};

type BarChartState = {
  chartData: BarChartData[];
  chartOptions: ApexCharts.ApexOptions;
};

class BarChart extends Component<BarChartProps, BarChartState> {
  constructor(props: BarChartProps) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.data,
      chartOptions: this.props.options,
    });
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BarChart;
