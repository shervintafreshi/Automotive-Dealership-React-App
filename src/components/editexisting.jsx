
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import EditForm from './editform';

class EditExisting extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties 

  state = { vehicle: {},
            date: '',
            name: '',
            email: '',
            address: '',
            price: '',
            httpStatusCode: 0, 
            httpStatusOk: false };

  URL = `https://afternoon-harbor-96138.herokuapp.com/api/cars/${this.props.id}`;
  
  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });

  }

  componentDidMount() {

    // Get one
    fetch(this.URL)
      .then(response => {
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
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
        this.setState({ vehicle: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }
  
  handleSubmit() {

    // For coding convenience
    const car = { 
      '_id': this.state.vehicle._id,
      'make': this.state.vehicle.make,
      'model': this.state.vehicle.model,
      'year': this.state.vehicle.year,
      'VIN':  this.state.vehicle.VIN,
      'MSRP': this.state.vehicle.MSRP,
      'photo': this.state.vehicle.photo,
      'color': this.state.vehicle.color,
      'purchase_date': this.state.date,
      'purchaser_name': this.state.name,
      'purchaser_email': this.state.email,
      'purchaser_address': this.state.address,
      'price_paid' :'$' + this.state.price,
     };

    // Edit existing
    fetch(this.URL, {
      method: 'PUT',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(car)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
 
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/cars/getone/${this.state.vehicle._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = `Vehicle ${this.state.vehicle.make} ${this.state.vehicle.model}`;

    // Determine the button state
    const isDisabled = this.state.name.length === 0 || this.state.date.length === 0
                       || this.state.email.length === 0 || this.state.address.length === 0
                       || this.state.price.length === 0;
    
    // For coding convenience, create a shortcut object
    const u = this.state.vehicle;
    
    return (
      <div>
        <h3>Purchase Vehicle {u.make} {u.model}:</h3>

          
        {this.state.httpStatusOk ? (
        <EditForm disabled = {isDisabled} onChangeMethod = {this.handleChange} handleSubmit = {this.handleSubmit}/> 
        ) : (
            <div>
              <p>Requested vehicle with identifier {this.state.vehicle.make} {this.state.vehicle.model} was not found</p>
              <hr />
              <p><Link className='btn btn-default' to='/cars'>Show list of vehicles</Link></p>
            </div>
          )}

      </div>
    );
  }

}

export default withRouter(EditExisting);
