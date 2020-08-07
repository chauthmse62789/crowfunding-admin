import React from "react"
import { Row, Col } from "reactstrap"
import SalesCard from "./SalesCard"
import ApexBarChart from "../../../views/apps/charts/apex/ApexBarChart"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import Customers from "../../ui-elements/cards/analytics/Customers"
import CallAPI from './../../../services/CallAPI';
import StatisticsCards from './../../../components/@vuexy/statisticsCard/StatisticsCard';
import { Users, Package } from 'react-feather';
let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $success = "#28C76F",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292"



  let themeColors = [$primary, $success, $danger, $warning, $info]

class AnalyticsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      staticUser: null,
      nameUser:null,
      staticCampaign:null,
      staticIndividial:0,
      staticNon:0,
      staticStartup:0,
      tempCampaigns:[],
      staticCategoryDesignAndArt:0,
      staticCategoryComics:0,
      staticCategoryCrafts:0,
      staticCategoryFashion:0,
      staticCategoryFilm:0,
      staticCategoryPhotography:0,
      staticCategoryFood:0,
      staticCategoryMusic:0,
      staticCategoryGames:0,
      staticCategoryTechnology:0,
      staticCategoryPublishing:0,

    };

}
 


  loadAllUser(){
    const token = localStorage.getItem('Token');

    CallAPI('/api/User/All', 'GET', null, token).then(res => {
      


      this.setState({
        staticUser:res.data.length
      })
        res.data.map(item=>{
              if(item.type==='Individual User'){
                this.setState({
                  staticIndividial:(this.state.staticIndividial+1),
                })

              }

              if(item.type==='Nonprofit Organization'){
                this.setState({
                  staticNon:(this.state.staticNon+1),
                })
        
        
              }

              if(item.type==='Start up'){
                this.setState({
                  staticStartup:(this.state.staticStartup+1),
                })
        
        
              }

                return null
        })
     

     
  });

  }


   loadInfoUser (){
    const token = localStorage.getItem('Token');
    if (!localStorage.getItem('Token')) {
        return true;
    }
    else {
       CallAPI('/api/User/UserProfile', 'GET', null, token).then(res => {
          
            this.setState({
              nameUser:res.data.fullName
            })
            this.loadAllUser()
            this.loadAllCampaign()

        });

    }


}


async loadAllCampaign() {
  const token = localStorage.getItem('Token');
  await CallAPI('/api/Campaign/AllCampaignId', 'GET', null, token).then(res => {
          
    this.setState({
      staticCampaign:res.data.length,tempCampaigns:res.data
    })

    this.state.tempCampaigns.map(async item =>
      await CallAPI('/api/Campaign/Detail?campaignId=' + item, 'GET', null, token).then(response2 => {
  
        if(response2.data.categoryId===1){
          this.setState({staticCategoryDesignAndArt:this.state.staticCategoryDesignAndArt+1,
             })
        }



        if(response2.data.categoryId===2){
        
          this.setState({staticCategoryComics:this.state.staticCategoryComics+1,
          })


        }
        if(response2.data.categoryId===3){
          this.setState({staticCategoryCrafts:this.state.staticCategoryCrafts+1,
          })


        }
        if(response2.data.categoryId===4){
          this.setState({staticCategoryFashion:this.state.staticCategoryFashion+1,
          })


        }
        if(response2.data.categoryId===5){

          this.setState({staticCategoryFilm:this.state.staticCategoryFilm+1,
          })

        }
        if(response2.data.categoryId===6){

          this.setState({staticCategoryPhotography:this.state.staticCategoryPhotography+1,
          })

        }
        if(response2.data.categoryId===7){

          this.setState({staticCategoryFood:this.state.staticCategoryFood+1,
          })

        }
        if(response2.data.categoryId===8){
          this.setState({staticCategoryMusic:this.state.staticCategoryMusic+1,
          })


        }
        if(response2.data.categoryId===9){
          this.setState({staticCategoryGames:this.state.staticCategoryGames+1,
          })


        }
        if(response2.data.categoryId===10){
          this.setState({staticCategoryTechnology:this.state.staticCategoryTechnology+1,
          })


        }
        if(response2.data.categoryId===11){

          this.setState({staticCategoryPublishing:this.state.staticCategoryPublishing+1,
          })

        }
        
        
        
        






      }).catch(err => {
        console.log('inside catch block.');
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log('Error', err.message);
            this.setState({ itemUpdates: [] });
        }
        console.log(JSON.stringify(err));
    }))



       
        

        






});






}

  async componentDidMount() {

    this.loadInfoUser()
   
  }

  render() {


    

    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="6" md="12">
            <SalesCard nameUser={this.state.nameUser} />
          </Col>
          <Col lg="3" md="6" sm="12">
           


      <StatisticsCards
              hideChart
              iconBg="primary"
              icon={<Users className="primary" size={22} />}
              stat={this.state.staticUser}
              statTitle="Users"
            />
          </Col>
          <Col lg="3" md="6" sm="12">
       

            <StatisticsCards
              hideChart
              iconBg="primary"
              icon={<Package className="warning" size={22} />}
              stat={this.state.staticCampaign}
              statTitle="Campaigns (Included Deleted)"
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col md="6" sm="12">
             <Customers
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}

              staticNonprofit={this.state.staticNon}
              staticIndividual={this.state.staticIndividial}
              staticStartUp={this.state.staticStartup}
            />

          </Col>
          <Col md="6" sm="12">


          <ApexBarChart themeColors={themeColors} 
          
          
          
          staticCategoryDesignAndArt={this.state.staticCategoryDesignAndArt}
          staticCategoryComics={this.state.staticCategoryComics}
          staticCategoryCrafts={this.state.staticCategoryCrafts}
          staticCategoryFashion={this.state.staticCategoryFashion}
          staticCategoryFilm={this.state.staticCategoryFilm}
          staticCategoryPhotography={this.state.staticCategoryPhotography}
          staticCategoryFood={this.state.staticCategoryFood}
          staticCategoryMusic={this.state.staticCategoryMusic}
          staticCategoryGames={this.state.staticCategoryGames}
          staticCategoryTechnology={this.state.staticCategoryTechnology}
          staticCategoryPublishing={this.state.staticCategoryPublishing}
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          />
          </Col>
        </Row>
        
        
      </React.Fragment>
    )
  }
}

export default AnalyticsDashboard
