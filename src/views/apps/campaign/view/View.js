import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap"

import { Spinner } from "reactstrap"
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios"
import DataTable from "react-data-table-component"
import {  Lock, PauseCircle, Unlock, Play, ArrowDownCircle, Delete, Check } from "react-feather"
import "../../../../assets/scss/pages/users.scss"
import CallAPI from './../../../../services/CallAPI';


const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true
  },
  {
    name: "Percent",
    selector: "percent",
    sortable: true
  },
  {
    name: "Begin",
    selector: "beginDate",
    sortable: true
  },
  {
    name: "End",
    selector: "endDate",
    sortable: true
  },
  {
    name: "Status",
    selector: "status",
    sortable: true
  }
]




class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoCampaign: [],
      nameCreator: null,
      typeAccount: null,
      imageCampaign: null,
      infoPlanCampaign: [],
      amountOptions: null,
      valueCheck: null,
      checkedName: true,
      defaultAlertLock: false,
      confirmAlertLock: false,
      cancelAlertLock: false,
      defaultAlertFinishFunding: false,
      confirmAlertFinishFunding: false,
      cancelAlertFinishFunding: false,
      defaultAlertUnlock: false,
      confirmAlertUnlock: false,
      cancelAlertUnlock: false,
      defaultAlertFinishCampaign: false,
      confirmAlertFinishCampaign: false,
      cancelAlertFinishCampaign: false,
      defaultAlertDeleteCampaign: false,
      confirmAlertDeleteCampaign: false,
      cancelAlertDeleteCampaign: false,
      defaultAlertStartingPlan: false,
      confirmAlertStartingPlan: false,
      cancelAlertStartingPlan: false,
      defaultAlertFinishPlan: false,
      confirmAlertFinishPlan: false,
      cancelAlertFinishPlan: false,

      selectedOption: '7',
      loading: true,
      loadingButton: false,
      loadingButtonFinish: false,
      loadingButtonFinishFunding: false,
      loadingButtonFinishCampaign: false,
      loadingButtonFinishPlan: false,
      loadingButtonStartingPlan: false,
      TxHash: null,
      alertFinishCampaign: null,
      alertDeleteCampaign: null,
      checkStatusFinalPlan:0,
      checkIdFinalPlan:0


    }
  }

  handleAlertLock = (state, value) => {
    this.setState({ [state]: value })
  }
  handleAlertUnlock = (state, value) => {
    this.setState({ [state]: value })
  }




  handleAlertFinishFunding = (state, value) => {
    this.setState({ [state]: value })
  }




  handleAlertFinishCampaign = (state, value) => {
    this.setState({ [state]: value })
  }

  handleAlertDeleteCampaign = (state, value) => {
    this.setState({ [state]: value })
  }

  handleAlertStartingPlan = (state, value) => {
    this.setState({ [state]: value })
  }
  handleAlertFinishPlan = (state, value) => {
    this.setState({ [state]: value })
  }

  handleChangeCheckbox = (e, { value }) => this.setState({ valueCheck: value })
  //   handleChangeCheckbox = (e, result) => {
  //     const { name, value } = result;
  //     this.setState({
  //         [name]: value
  //     });

  // };
  async lockDetailCampaign(id) {
    this.setState({ loadingButton: true })
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
        'Content-Type': 'application/json'
      }
    }
    var converNumSelectedOption = this.state.selectedOption;
    axios.put(`https://fptfunding.com/api/Campaign/Block?campaignId=${id}`, {
      "campaignId": id,
      "days": parseInt(converNumSelectedOption)
    }, config).then(response => {
      this.handleAlertLock("basicAlertLock", false)
      this.handleAlertLock("confirmAlertLock", true)
      this.setState({ loadingButton: false })
      this.getDetailCampaign();
    })


  }



  async unlockDetailCampaign(id) {
    this.setState({ loadingButton: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/UnBlock?campaignId=${id}`, 'PUT',
      null

      , token).then(res => {
        console.log(res.data)
        this.setState({ loadingButton: false })
        this.getDetailCampaign()





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

        }
        console.log(JSON.stringify(err));
      });


  }
  async fisnishFundingCampaign(id) {
    this.setState({ loadingButtonFinishFunding: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/FinishFunding?campaignId=${id}`, 'PUT',
      null

      , token).then(res => {
        this.handleAlertFinishFunding("basicAlertFinishFunding", false)
        this.handleAlertFinishFunding("confirmAlertFinishFunding", true)



        this.setState({ loadingButtonFinishFunding: false, TxHash: res.data.transactionHash })

       setTimeout(this.getDetailCampaign(),5000) 



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

        }
        console.log(JSON.stringify(err));
      });


  }


  async fisnishCampaign(id) {
    this.setState({ loadingButtonFinishCampaign: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/FinishCampaign?campaignId=${id}`, 'PUT',
      null

      , token).then(res => {
        this.setState({ loadingButtonFinishCampaign: false, alertFinishCampaign: res.data })
        this.handleAlertFinishCampaign("basicAlertFinishCampaign", false)
        this.handleAlertFinishCampaign("confirmAlertFinishCampaign", true)


        setTimeout(this.getDetailCampaign(),5000) 



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

        }
        console.log(JSON.stringify(err));
      });


  }



  async deleteCampaign(id) {
    this.setState({ loadingButtonDeleteCampaign: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/Delete?campaignId=${id}`, 'DELETE',
      null

      , token).then(res => {
        this.setState({ loadingButtonDeleteCampaign: false, alertDeleteCampaign: res.data })
        this.handleAlertDeleteCampaign("basicAlertDeleteCampaign", false)
        this.handleAlertDeleteCampaign("confirmAlertDeleteCampaign", true)

        window.location.replace('/app/campaign/list')

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

        }
        console.log(JSON.stringify(err));
      });


  }







  async startingPlan(campaignId, planId) {

    this.setState({ loadingButtonStartingPlan: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/StartingPlan?campaignId=${campaignId}&&planId=${planId}`, 'PUT',
      null

      , token).then(res => {
        console.log(res.data)


        this.handleAlertStartingPlan("basicAlertStartingPlan", false)
        this.handleAlertStartingPlan("confirmAlertStartingPlan", true)


        this.setState({ loadingButtonStartingPlan: false, TxHash: res.data.transactionHash })
        setTimeout(this.getDetailCampaign(),5000) 
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

        }
        console.log(JSON.stringify(err));
      });


  }




  async finishPlan(campaignId, planId) {
    this.setState({ loadingButtonFinishPlan: true })
    const token = localStorage.getItem('Token');


    CallAPI(`/api/Campaign/FinishPlan?campaignId=${campaignId}&&planId=${planId}`, 'PUT',
      null

      , token).then(res => {
        console.log(res.data)
        this.handleAlertFinishPlan("basicAlertFinishPlan", false)
        this.handleAlertFinishPlan("confirmAlertFinishPlan", true)
        this.setState({ loadingButtonFinishPlan: false })
        setTimeout(this.getDetailCampaign(),5000) 
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

        }
        console.log(JSON.stringify(err));
      });


  }




  getDetailCampaign() {
    CallAPI(`/api/Campaign/Detail?campaignId=` + this.props.match.params.idCampaign, 'GET', null, null).then(res => {
      console.log(res.data)
      this.setState({
        infoCampaign: res.data,
        isLoaded: true,
        alertLoaded: 'Loading...',
        amountOptions: res.data.options.length,
        nameCreator: res.data.creator.userName,
        typeAccount: res.data.creator.type,
        imageCampaign: res.data.imageUrls,
        loading: false

      })
      this.getPlanCampaign()

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
        this.setState({ infoCampaign: [] })
      }
      console.log(JSON.stringify(err));
    });

  }
  getPlanCampaign() {
    const token = localStorage.getItem('Token');
    CallAPI(`/api/Campaign/Plans?campaignId=` + this.props.match.params.idCampaign, 'GET', null, token).then(res => {

      this.setState({
        infoPlanCampaign: res.data,


      })

      this.state.infoPlanCampaign.map(item=>this.setState({checkStatusFinalPlan:item.status,checkIdFinalPlan:item.id}))

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
        this.setState({ infoCampaign: [] })
      }
      console.log(JSON.stringify(err));
    });

  }




  componentDidMount() {
    this.getDetailCampaign()



  }

  calDaysLeft(createdDate,fundingDeadline){
      var dateCreated = new Date(createdDate).getTime();
      var dateDeadline = new Date(fundingDeadline).getTime();
      var diff = dateDeadline-dateCreated
      return diff = Math.floor(diff / 1000 % 60);
  }

  changeDateAndTime(day){
    var dayWantChange = new Date(day);
   
    return dayWantChange.toUTCString()
}

  render() {
    const { infoCampaign, infoPlanCampaign } = this.state;
    console.log(infoCampaign)


    const ExpandableTable = ({ data }) => {
      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Description</td>
              <td>{data.description}</td>
            </tr>
            <tr>
              <td>Starting Plan</td>
              <td>{data.status===1?<Button.Ripple className="mr-1" color="warning" disabled={this.state.loadingButtonStartingPlan} outline onClick={() => this.handleAlertStartingPlan("defaultAlertStartingPlan", true)}  >

<Play size={15} />
<span className="align-middle ml-50">Starting</span>

</Button.Ripple>:data.status===2?<div>Blocked!</div>:data.status===3?<div>Processing Plan + {data.id}</div>:data.status===4?<div>Finished!</div>:<div></div>}



                <SweetAlert title="You want to start this plan ?"
                  warning
                  show={this.state.defaultAlertStartingPlan}
                  showCancel
                  reverseButtons
                  cancelBtnBsStyle="danger"
                  confirmBtnText="Yes, Actived it!"
                  cancelBtnText="Cancel"
                  onConfirm={() => this.startingPlan(data.campaignId, data.id)}
                  onCancel={() => {
                    this.handleAlertStartingPlan("basicAlertStartingPlan", false)
                    this.handleAlertStartingPlan("cancelAlertStartingPlan", true)
                  }}
                >

                  <p>{this.state.loadingButtonStartingPlan && <Spinner size="sm" color="primary" />}</p>
                  <p>{this.state.TxHash}</p>








                </SweetAlert>

                <SweetAlert success title="Actived!"
                  confirmBtnBsStyle="success"
                  show={this.state.confirmAlertStartingPlan}
                  onConfirm={() => {
                    this.handleAlertStartingPlan("defaultAlertStartingPlan", false)
                    this.handleAlertStartingPlan("confirmAlertStartingPlan", false)
                  }}
                >

                  <p>{this.state.TxHash}</p>
                  <p className="sweet-alert-text">Starting Campaign is actived!</p>
                </SweetAlert>

                <SweetAlert error title="Cancelled"
                  confirmBtnBsStyle="success"
                  show={this.state.cancelAlertStartingPlan}
                  onConfirm={() => {
                    this.handleAlertStartingPlan("defaultAlertStartingPlan", false)
                    this.handleAlertStartingPlan("cancelAlertStartingPlan", false)
                  }}
                >
                  <p className="sweet-alert-text">
                    Starting Campaign is deactived :)
                          </p>
                </SweetAlert>




              </td>
            </tr>
            <tr>
              <td>Finish Plan</td>
              <td>{data.status === 3 ? <Button.Ripple className="mr-1" color="success" disabled={this.state.loadingButtonFinishPlan} outline onClick={() => this.handleAlertFinishPlan("defaultAlertFinishPlan", true)}>

                <Check size={15} />
                <span className="align-middle ml-50">Finish</span>

              </Button.Ripple> : data.status === 4 ? <div>Finished!</div> : data.status === 2 ? <div>Blocked!</div>:data.status === 1?<div>Can not finish plan because you didn't start plan!</div>:<div></div>}


                <SweetAlert title="You want to to finish this plan ?"
                  warning
                  show={this.state.defaultAlertFinishPlan}
                  showCancel
                  reverseButtons
                  cancelBtnBsStyle="danger"
                  confirmBtnText="Yes, Actived it!"
                  cancelBtnText="Cancel"
                  onConfirm={() => this.finishPlan(data.campaignId, data.id)}
                  onCancel={() => {
                    this.handleAlertFinishPlan("basicAlertFinishPlan", false)
                    this.handleAlertFinishPlan("cancelAlertFinishPlan", true)
                  }}
                >


                  <p>{this.state.loadingButtonFinishPlan && <Spinner size="sm" color="primary" />}</p>







                </SweetAlert>

                <SweetAlert success title="Actived!"
                  confirmBtnBsStyle="success"
                  show={this.state.confirmAlertFinishPlan}
                  onConfirm={() => {
                    this.handleAlertFinishPlan("defaultAlertFinishPlan", false)
                    this.handleAlertFinishPlan("confirmAlertFinishPlan", false)
                  }}
                >
                  <p>{this.state.TxHash}</p>
                  <p className="sweet-alert-text">Finishing this plan is actived!</p>
                </SweetAlert>

                <SweetAlert error title="Cancelled"
                  confirmBtnBsStyle="success"
                  show={this.state.cancelAlertFinishPlan}
                  onConfirm={() => {
                    this.handleAlertFinishPlan("defaultAlertFinishPlan", false)
                    this.handleAlertFinishPlan("cancelAlertFinishPlan", false)
                  }}
                >
                  <p className="sweet-alert-text">
                    Finishing this plan is deactived :)
                          </p>
                </SweetAlert>


                
              </td>
            </tr>


          </tbody>
        </Table>
      )
    }
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Campaign</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        <Media
                          className="rounded mr-2"
                          object
                          src={this.state.imageCampaign!==null?this.state.imageCampaign[0]:'/campaign.svg'}
                          alt="Image Campaign"
                          height="112"
                          width="112"
                        />
                      </Media>
                      <Media body>
                        <Row>
                          <Col sm="9" md="6" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Name
                                </div>
                                <div>{infoCampaign.name}</div>
                              </div>


                            </div>



                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Status
                                </div>
                                <div>{infoCampaign.isBlocked === 1 ? <span>Locked</span> : <span>Active</span>}</div>
                              </div>


                            </div>
                          </Col>
                          <Col md="12" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Plight
                                </div>
                                <div>{infoCampaign.status}</div>
                              </div>
                             
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Created Date
                                </div>
                                <div>
                                  <span>{this.changeDateAndTime(infoCampaign.createdDate)}</span>
                                </div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Days Left
                                </div>
                                <div>
                                  <span>{this.calDaysLeft(infoCampaign.createdDate,infoCampaign.fundingDeadline)}</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                  <Col className="mt-1 pl-0" sm="12">

                    {this.state.loading ? <Spinner color="primary" />: infoCampaign.isBlocked===1?
                    
                    
                    <div>
                    <Button.Ripple color="primary" disabled={this.state.loadingButton} outline onClick={() => this.unlockDetailCampaign(infoCampaign.id)}>
                      {this.state.loadingButton && <Spinner size="sm" color="primary" />}<Unlock size={15} />
                      <span className="align-middle ml-50">Unlock</span>
                     </Button.Ripple>

<Button.Ripple color="danger" disabled={this.state.loadingButtonDeleteCampaign} outline onClick={() => this.handleAlertDeleteCampaign("defaultAlertDeleteCampaign", true)}>
{this.state.loadingButtonDeleteCampaign && <Spinner size="sm" color="primary" />}<Delete size={15} />
<span className="align-middle ml-50">Delete Campaign</span>
</Button.Ripple>
                     
</div>
                     
                     
                     
                     : infoCampaign.isBlocked===0&&infoCampaign.status!=='Campaign Finished'?<Button.Ripple color="danger" disabled={this.state.loadingButton} outline onClick={() => this.handleAlertLock("defaultAlertLock", true)}>

                        {this.state.loadingButton && <Spinner size="sm" color="primary" />}<Lock size={15} />
                        <span className="align-middle ml-50">Lock</span>

                      </Button.Ripple> :<span></span>
                      
    
                      
                      
                      
                      }

{(infoCampaign.currentLedged >= infoCampaign.goal)&&infoCampaign.status==='New'?<Button.Ripple className="mr-1 ml-1" disabled={this.state.loadingButtonFinishFunding} color="warning" outline onClick={() => this.handleAlertFinishFunding("defaultAlertFinishFunding", true)}>
                      {this.state.loadingButtonFinishFunding && <Spinner size="sm" color="primary" />}
                      <PauseCircle size={15} />
                      <span className="align-middle ml-50">Finish Funding</span>

                    </Button.Ripple>:<span></span>}
                    

                        {this.state.checkStatusFinalPlan===4&&this.state.checkIdFinalPlan===infoPlanCampaign[this.state.checkIdFinalPlan-1].id&&infoCampaign.status!=='Campaign Finished'?<Button.Ripple className="ml-1" color="success" outline onClick={() => this.handleAlertFinishCampaign("defaultAlertFinishCampaign", true)}>
                      {this.state.loadingButtonFinishCampaign && <Spinner size="sm" color="primary" />} <ArrowDownCircle size={15} />
                      <span className="align-middle ml-50">Finish Campaign</span>
                    </Button.Ripple> :<span></span>}



                   





                




                    



                    <SweetAlert title="How many days to lock for ?"
                      warning
                      show={this.state.defaultAlertLock}
                      showCancel
                      reverseButtons
                      cancelBtnBsStyle="danger"
                      confirmBtnText="Yes, Lock it!"
                      cancelBtnText="Cancel"
                      onConfirm={() => this.lockDetailCampaign(infoCampaign.id)}
                      onCancel={() => {
                        this.handleAlertLock("basicAlertLock", false)
                        this.handleAlertLock("cancelAlertLock", true)
                      }}
                    >


                      {this.state.loadingButton && <Spinner size="sm" color="primary" />}
                      <Form>
                        <FormGroup check inline>

                          <Label check>
                            <Input
                              type="radio"
                              value='7'
                              checked={this.state.selectedOption === '7'}
                              onChange={e => this.setState({ selectedOption: e.target.value })}

                            /> 7 days
                     </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              value='15'
                              checked={this.state.selectedOption === '15'}
                              onChange={e => this.setState({ selectedOption: e.target.value })} /> 15 days
                     </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input type="radio"
                              value='30'
                              checked={this.state.selectedOption === '30'}
                              onChange={e => this.setState({ selectedOption: e.target.value })} /> 30 days
              </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input type="radio"
                              value='-1'
                              checked={this.state.selectedOption === '-1'}
                              onChange={e => this.setState({ selectedOption: e.target.value })} /> Forever
              </Label>
                        </FormGroup>

                      </Form>






                    </SweetAlert>

                    <SweetAlert success title="Locked!"
                      confirmBtnBsStyle="success"
                      show={this.state.confirmAlertLock}
                      onConfirm={() => {
                        this.handleAlertLock("defaultAlertLock", false)
                        this.handleAlertLock("confirmAlertLock", false)
                      }}
                    >
                      <p className="sweet-alert-text">Your campaign has been locked.</p>
                    </SweetAlert>

                    <SweetAlert error title="Cancelled"
                      confirmBtnBsStyle="success"
                      show={this.state.cancelAlertLock}
                      onConfirm={() => {
                        this.handleAlertLock("defaultAlertLock", false)
                        this.handleAlertLock("cancelAlertLock", false)
                      }}
                    >
                      <p className="sweet-alert-text">
                        Your campaign is safe :)
                      </p>
                    </SweetAlert>




                    <SweetAlert title="Are you sure to delete this campaign ?"
                      warning
                      show={this.state.defaultAlertDeleteCampaign}
                      showCancel
                      reverseButtons
                      cancelBtnBsStyle="danger"
                      confirmBtnText="Yes, Actived it!"
                      cancelBtnText="Cancel"
                      onConfirm={() => this.deleteCampaign(infoCampaign.id)}
                      onCancel={() => {
                        this.handleAlertDeleteCampaign("basicAlertDeleteCampaign", false)
                        this.handleAlertDeleteCampaign("cancelAlertDeleteCampaign", true)
                      }}
                    >
                        {this.state.loadingButtonDeleteCampaign && <Spinner size="sm" color="primary" />}
                       










                    </SweetAlert>

                    <SweetAlert success title="Actived!"
                      confirmBtnBsStyle="success"
                      show={this.state.confirmAlertDeleteCampaign}
                      onConfirm={() => {
                        this.handleAlertDeleteCampaign("defaultAlertDeleteCampaign", false)
                        this.handleAlertDeleteCampaign("confirmAlertDeleteCampaign", false)
                      }}
                    >
                      <p>{this.state.alertDeleteCampaign}</p>
                      <p className="sweet-alert-text">Delete Campaign is actived!</p>
                    </SweetAlert>

                    <SweetAlert error title="Cancelled"
                      confirmBtnBsStyle="success"
                      show={this.state.cancelAlertDeleteCampaign}
                      onConfirm={() => {
                        this.handleAlertDeleteCampaign("defaultAlertDeleteCampaign", false)
                        this.handleAlertDeleteCampaign("cancelAlertDeleteCampaign", false)
                      }}
                    >
                      <p className="sweet-alert-text">
                        Delete Campaign is deactived :)
                      </p>
                    </SweetAlert>
































                    <SweetAlert title="Are you sure to finish funding this campaign ?"
                      warning
                      show={this.state.defaultAlertFinishFunding}
                      showCancel
                      reverseButtons
                      cancelBtnBsStyle="danger"
                      confirmBtnText="Yes, Actived it!"
                      cancelBtnText="Cancel"
                      onConfirm={() => this.fisnishFundingCampaign(infoCampaign.id)}
                      onCancel={() => {
                        this.handleAlertFinishFunding("basicAlertFinishFunding", false)
                        this.handleAlertFinishFunding("cancelAlertFinishFunding", true)
                      }}
                    >
                        {this.state.loadingButtonFinishFunding && <Spinner size="sm" color="primary" />}
                       










                    </SweetAlert>

                    <SweetAlert success title="Actived!"
                      confirmBtnBsStyle="success"
                      show={this.state.confirmAlertFinishFunding}
                      onConfirm={() => {
                        this.handleAlertFinishFunding("defaultAlertFinishFunding", false)
                        this.handleAlertFinishFunding("confirmAlertFinishFunding", false)
                      }}
                    >
                      <p>{this.state.TxHash}</p>
                      <p className="sweet-alert-text">Finish Funding is actived!</p>
                    </SweetAlert>

                    <SweetAlert error title="Cancelled"
                      confirmBtnBsStyle="success"
                      show={this.state.cancelAlertFinishFunding}
                      onConfirm={() => {
                        this.handleAlertFinishFunding("defaultAlertFinishFunding", false)
                        this.handleAlertFinishFunding("cancelAlertFinishFunding", false)
                      }}
                    >
                      <p className="sweet-alert-text">
                        Finish Funding is deactived :)
                      </p>
                    </SweetAlert>

















                    <SweetAlert title="Are you sure to finish this campaign ?"
                      warning
                      show={this.state.defaultAlertFinishCampaign}
                      showCancel
                      reverseButtons
                      cancelBtnBsStyle="danger"
                      confirmBtnText="Yes, Actived it!"
                      cancelBtnText="Cancel"
                      onConfirm={() => this.fisnishCampaign(infoCampaign.id)}
                      onCancel={() => {
                        this.handleAlertFinishCampaign("basicAlertFinishCampaign", false)
                        this.handleAlertFinishCampaign("cancelAlertFinishCampaign", true)
                      }}
                    >
                      {this.state.loadingButtonFinishCampaign && <Spinner size="sm" color="primary" />}


                     






                    </SweetAlert>

                    <SweetAlert success title="Actived!"
                      confirmBtnBsStyle="success"
                      show={this.state.confirmAlertFinishCampaign}
                      onConfirm={() => {
                        this.handleAlertFinishCampaign("defaultAlertFinishCampaign", false)
                        this.handleAlertFinishCampaign("confirmAlertFinishCampaign", false)
                      }}
                    >
                         <p>{this.state.alertFinishCampaign}</p>
                      <p className="sweet-alert-text">Finish Campaign is actived!</p>
                    </SweetAlert>

                    <SweetAlert error title="Cancelled"
                      confirmBtnBsStyle="success"
                      show={this.state.cancelAlertFinishCampaign}
                      onConfirm={() => {
                        this.handleAlertFinishCampaign("defaultAlertFinishCampaign", false)
                        this.handleAlertFinishCampaign("cancelAlertFinishCampaign", false)
                      }}
                    >
                      <p className="sweet-alert-text">
                        Finish Campaign is deactived :)
                      </p>
                    </SweetAlert>







                  </Col>

                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Info Back</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Backers
                    </div>
                    <div>{infoCampaign.backerCount}</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Goal
                    </div>
                    <div>{infoCampaign.goal}</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Current Ledge
                    </div>
                    <div className="text-truncate">
                      <span>{infoCampaign.currentLedged}</span>
                    </div>
                  </div>

                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Options
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.amountOptions}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Plan
                    </div>
                    <div className="text-truncate">

                      <span>{infoPlanCampaign.length}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Info Basic</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">

                    <div className="user-info-title font-weight-bold">
                      Location
                    </div>
                    <div>{infoCampaign.location}</div>
                  </div>

                  <div className="d-flex user-info">

                    <div className="user-info-title font-weight-bold">
                      Category
                    </div>
                    <div>{infoCampaign.category}</div>
                  </div>



                  <div className="d-flex user-info">

                    <div className="user-info-title font-weight-bold">
                      Website
                    </div>
                    <div>{infoCampaign.website}</div>
                  </div>
                  <div className="d-flex user-info">

                    <div className="user-info-title font-weight-bold">
                      Full Name
                    </div>
                    <div>{this.state.nameCreator}</div>
                  </div>
                  <div className="d-flex user-info">

                    <div className="user-info-title font-weight-bold">
                      Type
                    </div>
                    <div>{this.state.typeAccount}</div>
                  </div>



                </div>

              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader className="border-bottom pb-1 mx-2 px-0">
                <CardTitle>
                  <Lock size={18} />
                  <span className="align-middle ml-50">Plans Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <DataTable
                  data={infoPlanCampaign}
                  columns={columns}
                  noHeader
                  expandableRows
                  expandOnRowClicked
                  expandableRowsComponent={<ExpandableTable />}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default UserView
