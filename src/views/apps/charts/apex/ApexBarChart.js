import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexBarCharts extends React.Component {
  state = {
    options: {
      colors: this.props.themeColors,
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Design & Art",
          "Comics",
          "Crafts",
          "Fashion",
          "Film",
          "Photography",
          "Food",
          "Music",
          "Games",
          "Technology",
          "Publishing"
        ],
        tickAmount: 5
      }
    },
    series: [
      {
        data: [0,0,0,0,0,0,0,0,0,0,0]
      }
    ]
  }


  componentWillReceiveProps(){
    this.setState({series:[{data:[this.props.staticCategoryDesignAndArt,this.props.staticCategoryComics,this.props.staticCategoryCrafts,this.props.staticCategoryFashion,this.props.staticCategoryFilm,this.props.staticCategoryPhotography,this.props.staticCategoryFood,this.props.staticCategoryMusic,this.props.staticCategoryGames,this.props.staticCategoryTechnology,this.props.staticCategoryPublishing   ]}]})
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Categories Campaign</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexBarCharts
