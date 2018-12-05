import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { browserHistory } from "react-router";
import Home from './components/Home'
import About from './components/About'
import Error from './components/Error'
import Create from './components/create'
import $ from 'jquery';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Slideshow from './components/Slider/Slideshow';
import Info from './components/Info';
import Footer from './components/Footer';
import SignInCreator from './components/SignInCreator';
import SimpleMap from './components/map';


class App extends Component {

  constructor() {
    super()
    this.state = {

      items: [],
      authorized: false

    }

  }

  componentDidMount() {
    $.ajax({
      url: '/create',
      type: "GET",
      success: (data) => {
       
        this.setState({
          items: data
        })
        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }



  render() {
    return (


      <BrowserRouter>  
      <div className="App">
     
    
      <div>
      
      <Info/>
      
      <Nav />
      
      <Switch>
  <Route path='/Home' render={()=>{
    return (<div>
      <Home items={this.state.items} />
      </div>
    )}}
  />
<Route path='/About' component={About} />
<Route path='/SignInCreator' component={SignInCreator} />
<Route path='/create' component={Create} />
<Route path='/signup' component={Signup} />
<Route path='/signin' component={Signin} />
</Switch>
</div>
<Footer/>
</div>
      </BrowserRouter>
    
     
    );
  }
}

export default App;