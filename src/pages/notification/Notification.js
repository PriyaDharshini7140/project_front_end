import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
function Notification() {
    const user = useSelector((state)=> state.user.users)
    console.log(user);
    return (
        <div style={{alignItems:"center",margin:"1rem"}} >
            {/* <Alert icon={false} >This is an error alert — check it out!</Alert><br/>
            <Alert icon={false} >This is an error alert — check it out!</Alert><br/>
            <Alert icon={false} >This is an error alert — check it out!</Alert><br/> */}
        </div>
    )
}

export default Notification
