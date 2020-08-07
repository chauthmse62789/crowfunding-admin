import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  ChevronDown,
  RotateCw,
  X
} from "react-feather"
import classnames from "classnames"
import { history } from "../../../../history"
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../../assets/scss/pages/users.scss"
class UsersList extends React.Component {
  state = {
    defaultAlert: false,
    confirmAlert: false,
    cancelAlert: false,
    rowData: [],
    rowDataDetail: null,
    tempData: [],
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [

      {
        headerName: "Name",
        field: "name",
        filter: true,
        width: 250,
        cellRendererFramework: params => {

          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => history.push("/app/campaign/view/"+params.data.id)}
            >
              <span>{params.data.name}</span>
            </div>
          )
        }
      },
      {
        headerName: "Category",
        field: "category",
        filter: true,
        width: 250
      },
      
      {
        headerName: "Status Campaign",
        field: "status",
        filter: true,
        width: 250
      },

      {
        headerName: "Status Working",
        field: "isBlocked",
        filter: true,
        width: 250,
        cellRendererFramework: params => {

          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => history.push("/app/campaign/view/"+params.data.id)}
            >
              <span>{params.data.isBlocked===0?<span className='badge badge-primary'>Working</span>:<span className='badge badge-danger'>BLocked</span>}</span>
            </div>
          )
        }
      },
      {
        headerName: "Current",
        field: "currentLedged",
        filter: true,
        width: 200
      },
      {
        headerName: "Goal",
        field: "goal",
        filter: true,
        width: 200
      },
      {
        headerName: "Backers",
        field: "backerCount",
        filter: true,
        width: 150
      }, {
        headerName: "Creator",
        field: "creator.userName",
        filter: true,
        width: 150
      }
      
    ]
  }

  handleAlert = (state, value) => {
    this.setState({ [state]: value })
  }

  async loadAllCampaign() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      }
    }
    await axios.get("https://fptfunding.com/api/Campaign/AllCampaignId", config).then(response => {
      this.setState({ tempData: response.data })
      this.state.tempData.map(async item =>
        await axios.get("https://fptfunding.com/api/Campaign/Detail?campaignId=" + item).then(response2 => {


          this.setState({ rowData: [...this.state.rowData, response2.data] })
        }))


    })






  }







  async componentDidMount() {
    this.loadAllCampaign()










  }



//   calDaysLeft(createdDate,fundingDeadline){
//     var dateCreated = new Date(createdDate).getTime();
//     var dateDeadline = new Date(fundingDeadline).getTime();
//     var diff = dateDeadline-dateCreated
//     return diff = Math.floor(diff / 1000 % 60);
// }

// changeDateAndTime(day){
//   var dayWantChange = new Date(day);
 
//   return dayWantChange.toUTCString()
// }

  

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }



  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state

    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card
            className={classnames("card-action card-reload", {
              "d-none": this.state.isVisible === false,
              "card-collapsed": this.state.status === "Closed",
              closing: this.state.status === "Closing...",
              opening: this.state.status === "Opening...",
              refreshing: this.state.reload
            })}
          >
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <div className="actions">
                <ChevronDown
                  className="collapse-icon mr-50"
                  size={15}
                  onClick={this.toggleCollapse}
                />
                <RotateCw
                  className="mr-50"
                  size={15}
                  onClick={() => {
                    this.refreshCard()
                    this.gridApi.setFilterModel(null)
                  }}
                />
                <X size={15} onClick={this.removeCard} />
              </div>
            </CardHeader>
            <Collapse
              isOpen={this.state.collapse}
              onExited={this.onExited}
              onEntered={this.onEntered}
              onExiting={this.onExiting}
              onEntering={this.onEntering}
            >
              <CardBody>
                {this.state.reload ? (
                  <Spinner color="primary" className="reload-spinner" />
                ) : (
                    ""
                  )}
                <Row>
                  <Col lg="4" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="role">Category</Label>
                      <Input
                        type="select"
                        name="category"
                        id="category"
                        value={this.state.role}
                        onChange={e => {
                          this.setState(
                            {
                              role: e.target.value
                            },
                            () =>
                              this.filterData(
                                "category",
                                this.state.role.toLowerCase()
                              )
                          )
                        }}
                      >
                        <option value="All">All</option>
                        <option value="DesignAndArt">Design - Art</option>
                        <option value="Comics">Comics</option>
                        <option value="Crafts">Crafts</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Film">Film</option>
                        <option value="Photography">Photography</option>
                        <option value="Food">Food</option>
                        <option value="Music">Music</option>
                        <option value="Games">Games</option>
                        <option value="Technology">Technology</option>
                        <option value="Publishing">Publishing</option>
                       
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="verified">Status Campaign</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        value={this.state.phoneVerified}
                        onChange={e => {
                          this.setState(
                            {
                              phoneVerified: e.target.value
                            },
                            () =>
                              this.filterData(
                                "status",
                                this.state.phoneVerified.toLowerCase()
                              )
                          )
                        }}
                      >
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Campaign Finished">Campaign Finished</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="status">Status Working</Label>
                      <Input
                        type="select"
                        name="isBlocked"
                        id="isBlocked"
                        value={this.state.selectStatus}
                        onChange={e => {
                          this.setState(
                            {
                              selectStatus: e.target.value
                            },
                            () =>
                              this.filterData(
                                "isBlocked",
                                this.state.selectStatus.toLowerCase()
                              )
                          )
                        }}
                      >
                        <option value="All">All</option>
                        <option value="1">Blocked</option>
                        
                        <option value="0">Working</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  
             



                 
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="filter-actions d-flex">
                    <Input
                      className="w-50 mr-0 mb-0 mb-sm-0"
                      type="text"
                      placeholder="search..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.searchVal}
                      size='50'
                    />

                    

                  </div>
                </div>
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {context => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UsersList
