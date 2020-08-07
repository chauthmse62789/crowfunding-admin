import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"

class SubscriberGained extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Users className="primary" size={22} />}
        stat={this.props.staticUser}
        statTitle="Participated Users"
        options={true}
        series={true}
        type="area"
      />
    )
  }
}
export default SubscriberGained
