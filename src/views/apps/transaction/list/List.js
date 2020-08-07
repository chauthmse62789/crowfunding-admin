import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Spinner
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  ChevronDown
} from "react-feather"
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../../assets/scss/pages/users.scss"
class UsersList extends React.Component {
  state = {
    loadingPage:true,
    rowData: null,
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
        headerName: "TXHash",
        field: "transactionHash",
        width: 250,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true
      },
      {
        headerName: "From",
        field: "from",
        filter: true,
        width: 250
      },
      {
        headerName: "To",
        field: "to",
        filter: true,
        width: 250
      },
      {
        headerName: "Value",
        field: "value",
        filter: true,
        width: 150
      },
      {
        headerName: "Fee",
        field: "transactionFee",
        filter: true,
        width: 150
      },
      {
        headerName: "Type",
        field: "type",
        filter: true,
        width: 150
      },
      
      {
        headerName: "Time Stamp",
        field: "timeStamp",
        filter: true,
        width: 150
      },
      
      
      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 150
      },
      // {
      //   headerName: "Status",
      //   field: "status",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: params => {
      //     return params.value === "active" ? (
      //       <div className="badge badge-pill badge-light-success">
      //         {params.value}
      //       </div>
      //     ) : params.value === "blocked" ? (
      //       <div className="badge badge-pill badge-light-danger">
      //         {params.value}
      //       </div>
      //     ) : params.value === "deactivated" ? (
      //       <div className="badge badge-pill badge-light-warning">
      //         {params.value}
      //       </div>
      //     ) : null
      //   }
      // },
      // {
      //   headerName: "Verified",
      //   field: "is_verified",
      //   filter: true,
      //   width: 125,
      //   cellRendererFramework: params => {
      //     return params.value === true ? (
      //       <div className="bullet bullet-sm bullet-primary"></div>
      //     ) : params.value === false ? (
      //       <div className="bullet bullet-sm bullet-secondary"></div>
      //     ) : null
      //   }
      // },
      // {
      //   headerName: "Department",
      //   field: "department",
      //   filter: true,
      //   width: 160
      // },
    ]
  }

  async loadAllTranscation(){
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      }
    }
    await axios.get("https://fptfunding.com/api/Transaction/TransactionHistory", config).then(response => {


      let rowData = response.data
      this.setState({ rowData })

      this.setState({loadingPage:false})

    })

  }

  async componentDidMount() {
    this.loadAllTranscation()
  }





 

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
      this.state.loadingPage ?<div className='text-center'><Spinner size="lg" color="primary" /></div>:
      <Row className="app-user-list">
        
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
