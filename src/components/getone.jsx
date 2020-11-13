
import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class GetOne extends Component {

  // Class properties 

  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  URL = `https://afternoon-harbor-96138.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {

    // Get one
    fetch(this.URL)
      .then(response => {
    
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
        this.setState({ vehicle: responseData });
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Vehicle ${this.state.vehicle.make} ${this.state.vehicle.model} details`;

    const u = this.state.vehicle;

    return (
      <div>
        <h3>Details about Vehicle Specifications:</h3>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Make: </dt><dd>{u.make}</dd>
                <dt>Model:</dt><dd>{u.model}</dd>
                <dt>Year: </dt><dd>{u.year}</dd>
                <dt>Color:</dt><dd>{u.color}</dd>
                <dt>MSRP: </dt><dd>{u.MSRP}</dd>
                <dt>VIN:  </dt><dd>{u.VIN}</dd>
              </dl>
              { u.purchase_date && 
                <dl className="dl-horizontal">
                <h3>Ownership and Purchase Information:</h3>
                <dt>Purchase Date:</dt><dd>{u.purchase_date}</dd>
                <dt>Owner Name:   </dt><dd>{u.purchaser_name}</dd>
                <dt>Owner Email:  </dt><dd>{u.purchaser_email}</dd>
                <dt>Owner Address:</dt><dd>{u.purchaser_address}</dd>
                <dt>Price Paid:   </dt><dd>{u.price_paid}</dd>
              </dl>
              }
            </div>
            <div className="col-md-2">
              <img src={u.photo} alt="" className="img-responsive" />
            </div>
          </div>

        ) : (
          <p>Requested vehicle was not found</p>
          )}

        <hr />
        <p><Link className='btn btn-warning' to={`/cars/editexisting/${u._id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Show list of vehicles</Link></p>
      </div>
    );
  }
}
