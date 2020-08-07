import * as types from './../constants/ActionType'
var initialState = [
    {
        show:1
    }

];
var myReducer = (state=initialState,action)=>{
   switch(action.type){
        case types.HIDDEN_SHOW:
            return state=!state;
        default: return state;

   }
    

};
export default myReducer;