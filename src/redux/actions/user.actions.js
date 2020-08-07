import { userConstants } from '../../constants';
import { userService } from '../../services';
import { alertActions } from './';
import { history  } from '../../history';
const axios = require('axios') ;
export const userActions = {
    login,
    logout,
    getAll,
    delete: _delete
};


const options = {
    headers: {
        'Content-Type': 'application/json',
    }
  };


 
 function login(userName, password) {
    
    return  dispatch => {
        
        dispatch(request({ userName }));
          axios.post('https://fptfunding.com/api/Auth/Login', JSON.stringify({userName, password}),options
        )
       .then( res => { 
            dispatch(success(res.data));
            console.log(res.data)
            dispatch(alertActions.success('Login Successfully'));
            localStorage.setItem('isAuth',res.data.securityToken);
            history.push('/dashboard');
            window.location.reload();
       
          
            
     })
       .catch(err=>{
           dispatch(failure(err));
           dispatch(alertActions.error(err.response.data));
       }  ) ;
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}



function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}