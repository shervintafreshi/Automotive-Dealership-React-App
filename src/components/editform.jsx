
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class EditForm extends Component {

  componentDidMount() {
    this.input.focus();
  }

  render() {
    // Form for editing a pre-existing Cars details

    return (
        <div className="form-horizontal">
        <p>Enter Information and click/tap the Save button</p>
        <hr />
        <div className="form-group">
          <label htmlFor="name" className='control-label col-md-2'>Owner Name: </label>
          <div className="col-md-6">
            <input name="name" className="form-control" ref={(i) => { this.input = i; }} onChange={this.props.onChangeMethod} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date" className='control-label col-md-2'>Purchase Date: </label>
          <div className="col-md-6">
            <input name="date" className="form-control" onChange={this.props.onChangeMethod} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date" className='control-label col-md-2'>Owner Email: </label>
          <div className="col-md-6">
            <input name="email" className="form-control" onChange={this.props.onChangeMethod} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date" className='control-label col-md-2'>Owner Address: </label>
          <div className="col-md-6">
            <input name="address" className="form-control" onChange={this.props.onChangeMethod} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date" className='control-label col-md-2'>Purchase Price: </label>
          <div className="col-md-6">
            <input name="price" className="form-control" onChange={this.props.onChangeMethod} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-offset-2 col-md-6">
            <button disabled={this.props.disabled} onClick={this.props.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
            <Link className='btn btn-default' to='/cars'>Cancel</Link>
          </div>
        </div>
      </div>

    );
  }

}

export default withRouter(EditForm);