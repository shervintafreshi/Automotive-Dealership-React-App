import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class DeleteItem extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  URL = `https://afternoon-harbor-96138.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {

    // Get the requested object
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
        this.setState({ vehicle: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  handleSubmit() {

    // Delete
    fetch(this.URL, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // Redirect
        this.props.history.push('/cars');
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Delete Vehicle`;

    // For coding convenience, create a shortcut object
    const u = this.state.vehicle;

    return (
      <div>
        <h4>Delete {u.make} {u.model} from Vehicle inventory:</h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Make:</dt><dd>{u.make}</dd>
                <dt>Model:</dt><dd>{u.model}</dd>
                <dt>Year:</dt><dd>{u.year}</dd>
                <dt>VIN:</dt><dd>{u.VIN}</dd>
              </dl>
            </div>
            <div className="col-md-2">
              <img src={u.photo} alt="" className="img-responsive" />
            </div>
          </div>

        ) : (
            <p>Requested vehicle was not found</p>
          )}

        <hr />
        <p>Confirm that this vehicle should be deleted, or cancel to return to the list of vehicles</p>
        <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm delete</button>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Cancel</Link></p>
      </div>
    );
  }
}

export default withRouter(DeleteItem);