import React from 'react'

import{Link,Route} from 'react-router-dom'; 
import Carousel from 'react-bootstrap/Carousel'
 import 'bootstrap/dist/css/bootstrap.min.css';
import './InitialPage.css'

function InitialPage() {
   
    return (
        <div>
        <div>
          <div class="content">
            <Carousel  pause='hover' >
<Carousel.Item interval={1000}>
  <a href="#idea" ><img
    className="d-block w-100"
    style={{height:'400px',opacity:0.5}}
    src={'assets/initialpageblack.jpg'}
    alt="First slide"
  /></a>
  <Carousel.Caption style={{color:'WHITE'}}>
          <h1>Idea Wrapper</h1>
          <p><h3>Explore and Post Idea's</h3></p>
        </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={1000}>
  <a href="#contact"><img
  style={{height:'400px',opacity:0.5}}
    className="d-block w-100"
    src={'assets/creativity.jpg'}
    alt="Second slide"
  /></a>

<Carousel.Caption style={{color:'black'}}>
          <h1>Idea Wrapper</h1>
          <p><h3>Explore and Post Idea's</h3></p>
        </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={1000}>
  <a href="#about"><img
  style={{height:'400px',opacity:0.5}}
    className="d-block w-100"
    src={'assets/laplap.jpg'}
    alt="Third slide"
  /></a>
<Carousel.Caption style={{color:'WHITE'}}>
          <h1>Idea Wrapper</h1>
          <p><h3>Explore and Post Idea's</h3></p>
        </Carousel.Caption>
  
</Carousel.Item>

</Carousel>
            
            
          </div>
          
         <div class='c-card-header'>
          <div class="c-con">
          <div class="c-card" id="idea">
            <div class="c-card-img">
              <img className="d-block" src={'assets/scrool3.jpg'} alt="React"></img>
             
              <p>React (also known as React.js or ReactJS) is an open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.</p>
            
            </div>
            
          </div>
         </div>
         <div class="c-con">
          <div class="c-card" id="contact">
            <div class="c-card-img">
              <img className="d-block" src={'assets/scrool3.jpg'} alt="React"></img>
             
              <p>React (also known as React.js or ReactJS) is an open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.</p>
            
            </div>
            
          </div>
         
         </div>
         <div class="c-con">
          <div class="c-card" id="about">
            <div class="c-card-img">
              <img className="d-block" src={'assets/scrool3.jpg'} alt="React"></img>
             
              <p>React (also known as React.js or ReactJS) is an open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.</p>
            
            </div>
            
          </div>
         </div>
         </div>
         </div>
        <footer class="c-footer">
          <div class="c-inner">
            Copyright IdeaWrapper. All rights reserved. For internal use only.
          </div>
        </footer>
          
      </div>
    )
}

export default InitialPage
