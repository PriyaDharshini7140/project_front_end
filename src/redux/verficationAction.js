import axios from 'axios'
import {
  REPORT,
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
              dispatch(reqReports())
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
        export const reports = (user_id,Post_id,report) => {
          
          return (dispatch) => {
            const Token = () => localStorage.getItem("user");
             return axios.post('http://localhost:4000/reports/reported/',{
              
              user_id:user_id,
              post_id:Post_id,
              report_reason:report
             },{
                 headers:{authorization:`Bearer ${Token()}`}
              })
             .then(
                 (res)=> {
                  //  alert(res.data.status)
                    console.log(res.data)
                    
                 })
        .catch((e)=>console.log(e))
            
            }
          }
        export const reqReports = () => {
          return (dispatch) => {
            const Token = () => localStorage.getItem("user");
             return axios.post('http://localhost:4000/reports/reports/',{},{
                 headers:{authorization:`Bearer ${Token()}`}
              })
             .then(
                 (res)=> {
                    console.log(res.data)
                    dispatch(ReportSuccess(res.data))
                 })
        .catch((e)=>console.log(e))
            
            }
          } 
          export const Deletereports = (id) => {
          
            return (dispatch) => {
              const Token = () => localStorage.getItem("user");
               return axios.delete(`http://localhost:4000/reports/deleteReport/${id}`,{
                   headers:{authorization:`Bearer ${Token()}`}
                })
               .then(
                   (res)=> {
                    //  alert(res.data.status)
                      console.log(res.data)
                      dispatch(reqReports())
                   })
          .catch((e)=>console.log(e))
              
              }
            }

            export const DeletereportsPost = (id,post_id) => {
          
              return (dispatch) => {
                const Token = () => localStorage.getItem("user");
                 return axios.delete(`http://localhost:4000/reports/deleteReportedPost/${id}/${post_id}`,{
                     headers:{authorization:`Bearer ${Token()}`}
                  })
                 .then(
                     (res)=> {
                      //  alert(res.data.status)
                        console.log(res.data)
                        dispatch(reqReports())
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
    export const ReportSuccess = Report => {

      return {
        type: REPORT,
        payload: Report
      }
    }