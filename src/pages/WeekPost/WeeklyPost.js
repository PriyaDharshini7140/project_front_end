import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import CardCom from '../../components/card/CardCom'

function WeeklyPost() {
    const Data = useSelector((state)=> state.post.LikeSortedPosts)
    return (
        <div className="wrapper">
           {Data.map((e)=> <>
         {moment(e.createdAt).week() === moment().week() ? 
         <CardCom  a={e}/>:<></>
         }
           </>)}
        </div>
    )
}

export default WeeklyPost

