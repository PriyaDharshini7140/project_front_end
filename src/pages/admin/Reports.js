
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
import { Deletereports, DeletereportsPost} from '../../redux/verficationAction';
import { Button } from '@material-ui/core';
// import { ToastContainer, toast } from 'material-react-toastify';
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
    maxWidth:"1000px",
    // width:"900px",
    marginTop:"1rem"
    
  },
});

export default function Alerts() {
  const classes = useStyles();
  const dispatch = useDispatch()
  // const user = useSelector((state)=> state.user.users)

    // console.log(user);
  const report = useSelector((state)=>state.verification.reports)
    // const request = useSelector((state)=>state.verification.status)
    // console.log(request);
    // console.log(report)
  return (
    <TableContainer>
      <center>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Reported By</StyledTableCell>
            <StyledTableCell align="center">Reported Post</StyledTableCell>
            <StyledTableCell align="center">Reason</StyledTableCell>
            <StyledTableCell align="center">Delete Report Request</StyledTableCell>
            <StyledTableCell align="center">Delete Reported Post</StyledTableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
        {report ? 
          report.map(e=>
          
            <StyledTableRow key={e._id}>
              <StyledTableCell component="th" scope="row">
                {e.user_id.user_name}
              </StyledTableCell>
              <StyledTableCell align="center">{e.post_id._id}</StyledTableCell>
              <StyledTableCell align="center">{e.report_reason}</StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>dispatch(Deletereports(e._id))}>Delete Request</Button></StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>dispatch(DeletereportsPost(e._id,e.post_id._id))}>Delete Post</Button></StyledTableCell>
              
            </StyledTableRow>
          ):<></>}
        </TableBody>
      </Table>
      </center>
    </TableContainer>
  );
}
