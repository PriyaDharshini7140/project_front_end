import React from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Card } from '@material-ui/core';
function AboutUs(props) {
    return (
        <div>
               <Card>
           about us
            </Card>
           <ArrowBackRoundedIcon onClick={()=>{props.history.goBack()}} style={{ fontSize: 80 }}></ArrowBackRoundedIcon>
        </div>
    )
}

export default AboutUs
