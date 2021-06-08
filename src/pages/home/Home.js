
import React from 'react'

import'../../components/card/PostCard.css'

import CardCom from '../../components/card/CardCom';

import { useSelector} from 'react-redux';

import './Home.css'
import moment from 'moment';

function Home() {
const Data = useSelector((state)=> state.post.posts)

const data = useSelector((state)=> state.post.LikeSortedPosts)
    return (
      <>
       <div class="wrapper-class">
         <div className="homepage">
   
    <div className="col-5">
     {Data.map((e)=> <>
         
          <CardCom  a={e}/>
        
            </>)}
            </div>
          
           <div className="col-4">
    
           {data.map((e)=> <>
         {moment(e.createdAt).week() === moment().week() ? 
         <CardCom  a={e}/>:<></>
         }
           </>)}
     
           </div>
           </div>
           </div>
           <footer class="c-footer">
          <div class="c-inner">
            Copyright IdeaWrapper. All rights reserved. For internal use only.
          </div>
        </footer>
       </>
    )
}

export default Home
