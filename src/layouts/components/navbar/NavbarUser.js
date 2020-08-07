import React from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import axios from "axios"
import * as Icon from "react-feather"
import { history } from "../../../history"


const UserDropdown = props => {
  return (
    <DropdownMenu right>
   <DropdownItem
   tag="a"
   href="#"
   onClick={e => history.push("/pages/account-settings")}
   >
        <Icon.Settings size={14} className="mr-50" />
        <span className="align-middle">Account Settings</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => {history.push("/pages/login")
      
            localStorage.removeItem('Token');
      }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}
class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: []
  }

  componentDidMount() {

    
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }


   
  

 

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">

         <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          
          </UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
