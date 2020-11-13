

import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class NewForm extends Component {

    componentDidMount() {
        this.input.focus();
      }

  render() {
    // Form for adding new Car to database

    return (
        <div>
        <h4>Add vehicle to database</h4>
        <div className="form-horizontal">
          <p>Enter new vehicle data, and click/tap the Add vehicle button</p>
          <hr />
          <div className="form-group">
            <label htmlFor="make" className='control-label col-md-2'>make</label>
            <div className="col-md-6">
              <input name="make" className="form-control" ref={(i) => { this.input = i; }} onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="model" className='control-label col-md-2'>model</label>
            <div className="col-md-6">
              <input name="model" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="year" className='control-label col-md-2'>year</label>
            <div className="col-md-6">
              <input name="year" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="VIN" className='control-label col-md-2'>VIN</label>
            <div className="col-md-6">
              <input name="VIN" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="MSRP" className='control-label col-md-2'>MSRP</label>
            <div className="col-md-6">
              <input name="MSRP" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="photo" className='control-label col-md-2'>Photo</label>
            <div className="col-md-6">
              <input name="photo" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Color" className='control-label col-md-2'>Color</label>
            <div className="col-md-6">
              <input name="color" className="form-control" onChange={this.props.onChangeMethod} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-6">
              <button disabled={this.props.disabled} onClick={this.props.handleSubmit} className="btn btn-primary">Add Vehicle</button>&nbsp;&nbsp;
              <Link className='btn btn-default' to='/cars'>Cancel</Link>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default withRouter(NewForm);