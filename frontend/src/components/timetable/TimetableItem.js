import React, { Fragment, useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { connect, shallowEqual } from 'react-redux';
import { deleteSlot, getSlots } from '../../actions/timetable';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const pdfGenerate = (e) => {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');

  autoTable(doc, {
    html: '#timelist',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('       Timetable List  ', data.settings.margin.right, 22);
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

  doc.save('Timetable_List.pdf');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500,
  });
};
const TimetableItem = ({ slots, deleteSlot, getSlots }) => {
  const [value, SetValue] = useState('');
  const [dataSource, SetdataSource] = useState(slots);
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
        var slotid = id;
        deleteSlot(slotid);
        Swal.fire('Deleted!', 'Timetable slot has been deleted.', 'success');
      }
    });
  };

  const selectStaffRequirement = async (slot, e) => {
    try {
      /* console.log(e.target.value);
      console.log(slot); */
      await axios.post('/api/timetable/slot', {
        slotID: slot,
        staffRequirement: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const slotsMapped =
    value.length > 0
      ? tableFilter.map((slot, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {slot.startTime} - {slot.endTime}
            </td>
            <td>{slot.dayOfTheWeek}</td>
            <td>{slot.module}</td>
            <td>{slot.venue}</td>
            <td>{slot.group}</td>
            <td>{slot.staffRequirement}</td>
            <td>
              <div className='custom-select-1' style={{ width: '200px' }}>
                <select
                  onChange={(e) => {
                    selectStaffRequirement(slot._id, e);
                    window.location.reload();
                    //getSlots();
                  }}
                >
                  <option value='0' style={{ display: 'none' }}>
                    {slot.staffRequirement}
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </td>
            <td>
              <button
                className='btn btn-danger btn-mini'
                onClick={() => Delete(slot._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
          </tr>
        ))
      : slots.map((slot, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {slot.startTime} - {slot.endTime}
            </td>
            <td>{slot.dayOfTheWeek}</td>
            <td>{slot.module}</td>
            <td>{slot.venue}</td>
            <td>{slot.group}</td>
            <td>{slot.staffRequirement}</td>
            <td>
              <div className='custom-select-1' style={{ width: '200px' }}>
                <select
                  onChange={(e) => {
                    selectStaffRequirement(slot._id, e);
                    //window.location.reload();
                    getSlots();
                  }}
                >
                  <option value='0' style={{ display: 'none' }}>
                    {slot.staffRequirement}
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </td>
            <td>
              <button
                className='btn btn-danger btn-mini'
                onClick={() => Delete(slot._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
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
      <Link to={`/allocateSlot`}>
        <button className='btn btn-primary'>
          {' '}
          <i className='fa-solid fa-list-check'></i>Allocate Slots
        </button>
      </Link>
      <button className='btn btn-success' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i> PDF
      </button>
      <table className='table' id='timelist'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              No.
            </th>
            <th
              className='hide-sm'
              style={{ textAlign: 'left', paddingRight: '90px' }}
            >
              Time Slot
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Day
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Module
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Group
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Staff Requirement
            </th>
          </tr>
        </thead>
        <tbody>{slotsMapped}</tbody>
      </table>
    </Fragment>
  );
};

TimetableItem.propTypes = {
  getSlots: PropTypes.func.isRequired,
  slots: PropTypes.array.isRequired,
  deleteSlot: PropTypes.func.isRequired,
};

export default connect(null, { deleteSlot, getSlots })(TimetableItem);
