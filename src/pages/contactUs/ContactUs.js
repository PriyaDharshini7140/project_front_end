import { Card } from '@material-ui/core'
import React from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
function ContactUs(props) {
    return (
        <div>
            <Card>
           contact us
            </Card>
           <ArrowBackRoundedIcon onClick={()=>{props.history.goBack()}} style={{ fontSize: 80 }}></ArrowBackRoundedIcon>
        </div>
    )
}

export default ContactUs
