
import React, { Component } from 'react';
import Table  from './table';

export default class GetAll extends Component {

   // class properties 
   
   state = { cars: [] };

   URL = "https://afternoon-harbor-96138.herokuapp.com/api/cars/";

   componentDidMount() {

     // Get all
     fetch(this.URL)
       .then(response => {
         // Optional...
         //this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
         if (response.ok) {
           // Parse the response body as JSON
           return response.json();
         } else if (response.status === 404) {
           // Not found 
           throw Error('HTTP 404, Not found');
         } else {
           // Some other situation
           throw Error(`HTTP ${response.status}, ${response.statusText}`);
         }
       })
       .then(responseData => {
         // "responseData" is an object; here, we're interested in its "data" property
         // Study the shape of the data in the reqres.in service
         this.setState({ cars: responseData });
       })
       .catch(error => {
         // Handles an error thrown above, as well as network general errors
         console.log(error)
     });
 
  }

  render() {

     document.title = 'Vehicle list';
 
     return (
       <div>
         <h4>List of cars from the web-service</h4>
         <Table vehicleList = {this.state.cars}/> 
       </div>
     );

  }
 
 }