
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 // Class component
  // Its purpose is render a full and complete HTML table element
  
  export default class Table extends Component {
    render() {
      
        const {vehicleList} = this.props;
 
        return (
        <div>
          <table className='table table-striped'>
            <TableHeader />
            <TableBody vehicles = {vehicleList} />
          </table>
        </div>
      );
    }
  }

  // Function component (Tania), table header
  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>MSRP</th>
          <th>Availability</th>
        </tr>
      </thead>
    );
  }
  
  // Function component
  // Its purpose is to render the HTML table body element
  function TableBody(props) {
    
    // Using the array of person objects, create a new array of React elements
    let rows = props.vehicles.map((car, index) => {
      return (
        <TableRow car={car} key={index}/>
      );
    });
  
    return <tbody>{rows}</tbody>
  }

  // Function component
  // Its purpose is to render a single HTML table row
  function TableRow(props) {
  
    const p = props.car;
    const available = {color: 'green', fontSize:15};  
    const sold = {color: 'orange', fontSize:15};

    // Render the row
    return (
      <tr>
        <td>{p.make}</td>
        <td width = "5">{p.model}</td>
        <td>{p.year}</td>
        <td>{p.MSRP}</td>
        <td>
        {!p.purchase_date ?
        <><span className="glyphicon glyphicon-ok-sign" style={available}></span><p>Available</p></>  :
        <><span className="glyphicon glyphicon-asterisk" style={sold}></span><p>Purchased</p></> 
        }

        </td>
        <td>
          <Link className='btn btn-default' to={`/cars/getone/${p._id}`}>Details</Link>&nbsp;&nbsp;
          <Link className='btn btn-warning' to={`/cars/editexisting/${p._id}`}>Edit</Link>&nbsp;&nbsp;
          <Link className='btn btn-danger' to={`/cars/deleteitem/${p._id}`}>Delete</Link>
        </td>
      </tr>
    );
  }
