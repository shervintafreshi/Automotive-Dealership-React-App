
import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import GetAll from './components/getall';
import GetOne from './components/getone';
import AddNew from './components/addnew';
import EditExisting from './components/editexisting';
import DeleteItem from './components/deleteitem';
import './App.css';


 class App extends Component {

  render() {

  return (

    <div className="container">
    <Header/>
    <hr/>
    <Switch>

       <Route exact path = "/" component = {HomePage} />
       <Route exact path = "/cars" component = {GetAll} />
       <Route exact path = "/cars/addnew" component = {AddNew} />
       <Route exact path = "/cars/getone/:id" render={(props) => (<GetOne id={props.match.params.id} />)}  />
       <Route exact path = "/cars/editexisting/:id" render={(props) => (<EditExisting id={props.match.params.id} />)}  />
       <Route exact path = "/cars/deleteitem/:id" render={(props) => (<DeleteItem id={props.match.params.id} />)}  />
       <Route render = {() => (<NotFound />)} />
         
    </Switch>

    </div>
   );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {

  return (
    <div className="header">
      <div className="header" style = {{backgroundColor: 'lightGrey'}}>
        <h2 style = {{padding: 10}}>Assignment 1: React</h2>
        <p style = {{padding: 10}}>The purpose of this app is to display the usage of the React Framework</p>
      </div>
      <Navbar className="navbar navbar-default"/>
    </div>
  );
}

// Functional component for the navigation bar
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to='/' className='navbar-brand'>Home page</Link>
      </div>
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link to='/cars'>All Vehicles</Link>
          </li>
          <li>
            <Link to='/cars/addnew'>Add New Vehicle</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
}

function HomePage(){
  document.title = 'Home Page';
  return (  
    <div>
      <header>
      <p>Here is my Homepage: Shervin Tafreshipour - 155199169 </p>
      <p>Link to deployed web-api: <a href="https://afternoon-harbor-96138.herokuapp.com/api/">a1-web-api</a></p>
      <p>Link to deployed web-app: <a href="https://enigmatic-anchorage-50534.herokuapp.com/">a1-app</a></p>
      </header>
    </div>
   );
}
