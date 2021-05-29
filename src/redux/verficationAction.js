import axios from 'axios'
import {
  STATUS
} from './Types'



export const reqVerification = () => {
    return (dispatch) => {
      const Token = () => localStorage.getItem("user");
       return axios.post('http://localhost:4000/verification/getReq/',{},{
           headers:{authorization:`Bearer ${Token()}`}
        })
       .then(
           (res)=> {
              console.log(res.data)
              dispatch(StatusSuccess(res.data))
           })
  .catch((e)=>console.log(e))
      
      }
    }

    export const Verification = (id,user_id,admin_id,status) => {
        console.log(id,user_id,admin_id,status);
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
           return axios.post('http://localhost:4000/verification/adminVerification/',{
            _id:id,
            user_id:user_id,
            admin_id:admin_id,
            status:status
           },{
               headers:{authorization:`Bearer ${Token()}`}
            })
           .then(
               (res)=> {
                 alert(res.data.status)
                  console.log(res.data)
                  dispatch(reqVerification())
               })
      .catch((e)=>console.log(e))
          
          }
        }

       

    export const StatusSuccess = status => {

      return {
        type: STATUS,
        payload: status
      }
    }