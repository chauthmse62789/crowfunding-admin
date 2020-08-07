import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import Chart from "react-apexcharts"

class Productorders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    options: {
      chart: {
        dropShadow: {
          enabled: false,
          blur: 5,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [this.props.primary, this.props.warning, this.props.danger],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: [
            this.props.primaryLight,
            this.props.warningLight,
            this.props.dangerLight
          ]
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      stroke: {
        width: 5
      },
      labels: ["Individual User", "Nonprofit Organization", "Start up"]
    },
    series: [0,0,0],
    
  }
}

  

componentWillReceiveProps(){
  this.setState({series:[this.props.staticIndividual,this.props.staticNonprofit,this.props.staticStartUp]})
}


  render() {

      
    return (
    
      <Card>
        
        <CardHeader>
          <CardTitle>Type User</CardTitle>
          <UncontrolledDropdown>
          
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody className="pt-0">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            height={290}          />
        </CardBody>
        <ListGroup flush>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-primary"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Individual User</span>
            </div>
            <div className="product-result">
              <span>{this.props.staticIndividual}</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-warning"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Nonprofit Organization</span>
            </div>
            <div className="product-result">
              <span>{this.props.staticNonprofit}</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-danger"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Start up</span>
            </div>
            <div className="product-result">
              <span>{this.props.staticStartUp}</span>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}
export default Productorders
