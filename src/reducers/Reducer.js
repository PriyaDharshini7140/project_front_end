const initialState ={
    user:[]
}
console.log(initialState);
const reducer=(state=initialState,action)=>{
    if(action.type === 'USER_LOGIN'){
        return{...state,
          list:[...state.list,action.payload],
      }
  }
  else if(action.type === 'PROFILE'){
        return{...state,
            list:[...state.list,action.payload],
  }
}
return state;
};
export default reducer;