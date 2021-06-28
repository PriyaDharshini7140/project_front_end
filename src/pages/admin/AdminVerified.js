import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { useSelector} from 'react-redux';
// import { Button } from '@material-ui/core';
// import { Deleteverification, Verification } from '../../redux/verficationAction';
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

export default function Alerts() {
  const classes = useStyles();
  // const dispatch = useDispatch()
    // const user = useSelector((state)=> state.user.users)
  
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
            <StyledTableCell align="center">Status</StyledTableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
        {request.map(e=> e.status === "Verified"? 
          
            <StyledTableRow key={e._id}>
              <StyledTableCell component="th" scope="row">
                {e.user_id.email_id}
              </StyledTableCell>
              
              <StyledTableCell align="center">{e.user_id.user_name}</StyledTableCell>
              <StyledTableCell align="center">{e.status}</StyledTableCell>
              
              
            </StyledTableRow>:<></>
          )}
        </TableBody>
      </Table>
      </center>
    </TableContainer>
  );
}
