import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../actions/venues';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

const pdfGenerate = (e) => {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');

  autoTable(doc, {
    html: '#venuetable',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('       Venue List  ', data.settings.margin.right, 22);
      doc.addImage(logo, 'PNG', data.settings.margin.right, 8, 20, 20);

      // Footer
      var str = 'Page ' + doc.internal.getNumberOfPages();

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
  });

  doc.save('Venue_List.pdf');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500,
  });
};
const VenueItem = ({ venue, deleteVenue }) => {
  const [value, SetValue] = useState('');
  const [dataSource, SetdataSource] = useState(venue);
  const [tableFilter, SetTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != '') {
      SetValue(e.target.value);
      const filter = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      SetTableFilter([...filter]);
    } else {
      SetValue(e.target.value);
      SetdataSource([...dataSource]);
    }
  };
  const Delete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var venid = id;
        deleteVenue(venid);
        Swal.fire('Deleted!', 'Venue has been deleted.', 'success');
      }
    });
  };

  const venues =
    value.length > 0
      ? tableFilter.map((ven) => (
          <tr key={ven._id}>
            <td>{ven.vName}</td>
            <td>{ven.vID}</td>
            <td>{ven.type}</td>
            <td>{ven.size}</td>
            <td>{ven.floor}</td>
            <td>{ven.faculty}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger'
                onClick={() => Delete(ven._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
            <td>
              <Link to={`/EditVenues/${ven._id}`}>
                <button className='btn btn-success'>
                  <i className='fas fa-edit'></i>
                </button>
              </Link>
            </td>
          </tr>
        ))
      : venue.map((ven) => (
          <tr key={ven._id}>
            <td>{ven.vName}</td>
            <td>{ven.vID}</td>
            <td>{ven.type}</td>
            <td>{ven.size}</td>
            <td>{ven.floor}</td>
            <td>{ven.faculty}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger'
                onClick={() => Delete(ven._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
            <td>
              <Link to={`/EditVenues/${ven._id}`}>
                <button className='btn btn-success'>
                  <i className='fas fa-edit'></i>
                </button>
              </Link>
            </td>
          </tr>
        ));
  return (
    <Fragment>
      <div className='search'>
        <input
          type='text'
          placeholder='Search'
          value={value}
          onChange={filterData}
        />
      </div>
      <Link to={`/addVenues`}>
        <button className='btn btn-success'>+ Add New</button>
      </Link>
      <button className='btn btn-success' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i> PDF
      </button>

      <table className='table' id='venuetable'>
        <thead>
          <tr>
            <th>Venue Name</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue ID
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Type
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Size
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Floor
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Faculty
            </th>
          </tr>
        </thead>
        <tbody>{venues}</tbody>
      </table>
    </Fragment>
  );
};

VenueItem.propTypes = {
  Venue: PropTypes.array.isRequired,
  deleteVenue: PropTypes.func.isRequired,
};

export default connect(null, { deleteVenue })(VenueItem);
