
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NewForm from './newform';

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    make: '',
    model: '',
    year: '',  
    VIN: '',
    MSRP: '',
    photo: '',
    color: '',
  };

  URL = `https://afternoon-harbor-96138.herokuapp.com/api/cars/`;
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {

    // Turn off default form handling
    //e.preventDefault();

    const newCar = {  'make' : this.state.make,
                      'model': this.state.model,
                      'year' : this.state.year,
                      'VIN'  : this.state.VIN,
                      'MSRP' : "$" + this.state.MSRP,
                      'photo': this.state.photo,
                      'color' : this.state.color,
                      'purchase_date': null,
                      'purchaser_name' : null,
                      'purchaser_email': null,
                      'purchaser_address' : null,
                      'price_paid' : null,
                    };

    fetch(this.URL, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(newCar)
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
        // "responseData" is an object
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/cars/getone/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Add vehicle';

    // Determine the button state

    const isDisabled = this.state.make.length === 0 || this.state.model.length === 0 
                       || this.state.year.length === 0 || this.state.VIN.length === 0
                       || this.state.MSRP.length === 0 || this.state.photo.length === 0
                       || this.state.color.length === 0;

    return (
      <NewForm disabled = {isDisabled} handleSubmit = {this.handleSubmit} onChangeMethod = {this.handleChange}/>
    );
  }
}

export default withRouter(AddNew);
