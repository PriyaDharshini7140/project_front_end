import { Avatar, Card, IconButton } from '@material-ui/core'
import React from 'react'
import NavbarHome from '../../components/navbar/NavbarHome'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import './Home.css'
function Home() {
    return (
        <>
        <NavbarHome/>
        <div className='homepage'>
           <Card className='homepage__card'>
           <div className="homepage__card__header">
                <Avatar className="homepage__card__header__avatar"/>
                <div className="homepage__card__body">
                UserNAme
                </div>
                
                <div className="homepage__card__headerRight">
                <IconButton>
                <PersonAddOutlinedIcon/>
                </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
           </Card>
           <Card className='homepage__card'>
           <div className="homepage__card__header">
                <Avatar className="homepage__card__header__avatar"/>
                <div className="homepage__card__body">
                UserNAme
                </div>
                
                <div className="homepage__card__headerRight">
                <IconButton>
                <PersonAddOutlinedIcon/>
                </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
           </Card>
           <Card className='homepage__card'>
           <div className="homepage__card__header">
                <Avatar className="homepage__card__header__avatar"/>
                <div className="homepage__card__body">
                UserNAme
                </div>
                
                <div className="homepage__card__headerRight">
                <IconButton>
                <PersonAddOutlinedIcon/>
                </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
           </Card>
        </div>
        </> 
    )
}

export default Home
