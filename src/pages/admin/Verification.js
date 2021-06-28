
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { useSelector,useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Deleteverification, Verification } from '../../redux/verficationAction';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#303F9F",
    color:"white",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    maxWidth:"900px",
    // width:"900px",
    marginTop:"1rem"
    
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const dispatch = useDispatch()
    const user = useSelector((state)=> state.user.users)
  
    // console.log(user);
  
    const request = useSelector((state)=>state.verification.status)
    // console.log(request);
  return (
    <TableContainer>
      <center>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>EmailID</StyledTableCell>
            <StyledTableCell align="center">UserName</StyledTableCell>
            <StyledTableCell align="center">Accept</StyledTableCell>
            <StyledTableCell align="center">Reject</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {request.map(e=> e.status === "notVerified" ?
          
            <StyledTableRow key={e._id}>
              <StyledTableCell component="th" scope="row">
                {e.user_id.email_id}
              </StyledTableCell>
              <StyledTableCell align="center">{e.user_id.user_name}</StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="primary" style={{borderRadius:"40px"}}  onClick={() => 
          {console.log("click")
          
            dispatch(Verification(e._id,e.user_id._id,user._id,"Verified"))
            toast.success("Verified",{
              position: "top-center",
              autoClose: 2000,
              
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
             
              })
            
          }
          }>Accept</Button> <ToastContainer position="top-center"
          autoClose={2000}
          hideProgressBar
          
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/></StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>{
        
        dispatch(Deleteverification(e.user_id._id))
        toast.error("Rejected",{
          position: "top-center",
          autoClose: 2000,
          
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         
          })
      }}>Reject</Button> <ToastContainer position="top-center"
      autoClose={2000}
      hideProgressBar
      
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/></StyledTableCell>
              
            </StyledTableRow>:<></>
          )}
        </TableBody>
      </Table>
      </center>
    </TableContainer>
  );
}
