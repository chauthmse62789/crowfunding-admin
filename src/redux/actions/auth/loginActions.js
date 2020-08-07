import { history } from "../../../history"
import axios from "axios"
import CallAPI from './../../../services/CallAPI';
export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}




export const loginWithJWT = user => {
  return dispatch => {
    axios
      .post("https://fptfunding.com/api/Auth/Login", {
        userName: user.userName,
        password: user.password
      })
      .then(response => {
        var loggedInUser
        if (response.data) {
          if(response.data.role==='Admin'){
            loggedInUser = response.data.user
            localStorage.setItem('Token',response.data.securityToken)
            sessionStorage.setItem('UserName', response.data.userName);
           
            CallAPI('/api/User/UserProfile', 'GET', null, localStorage.getItem('Token')).then(res => {
              sessionStorage.setItem('Avatar', res.data.avatar);
              
      
      
            });

            
            dispatch({
              type: "LOGIN_WITH_JWT",
              payload: { loggedInUser, loggedInWith: "jwt" }
            })
  
            history.push("/")


          }
          
        }
      })
      .catch(err => console.log(err))
  }
}

export const logoutWithJWT = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    history.push("/pages/login")
  }
}