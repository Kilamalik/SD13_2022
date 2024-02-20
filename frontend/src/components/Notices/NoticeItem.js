import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteNotice } from '../../actions/notices';
import EmployeeItem from '../employee/EmployeeItem';
import axios from 'axios';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

const pdfGenerate = (e) => {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');

  autoTable(doc, {
    html: '#noticetable',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('       Notices List  ', data.settings.margin.right, 22);
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

  doc.save('Notices_List.pdf');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500,
  });
};

const NoticeItem = ({ notices, deleteNotice }) => {
  const sendReminder = (notice) => {
    Swal.fire({
      title: 'Do you want to send Reminders?',
      text: 'The Reminder will be sent to all instructors!',
      icon: 'infor',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remind!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('/api/notices/sendreminder', notice)
          .then((body) => console.log(body))
          .catch((err) => console.log(err));
        Swal.fire('Sent!', 'Reminder has been Sent.', 'success');
      }
    });
  };

  const [value, SetValue] = useState('');
  const [dataSource, SetdataSource] = useState(notices);
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
        var noticeid = id;
        deleteNotice(noticeid);
        Swal.fire('Deleted!', 'Notice has been deleted.', 'success');
      }
    });
  };

  const noticeMapped =
    value.length > 0
      ? tableFilter.map((notice, index) => (
          <tr key={notice._id}>
            <td>{index + 1}</td>
            <td>{notice.heading}</td>
            <td>{notice.content}</td>
            <td>{notice.author}</td>
            <td>{notice.start}</td>
            <td>{notice.end}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger'
                onClick={() => Delete(notice._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
          </tr>
        ))
      : notices.map((notice, index) => (
          <tr key={notice._id}>
            <td>{index + 1}</td>
            <td>{notice.heading}</td>
            <td>{notice.content}</td>
            <td>{notice.author}</td>
            <td>{notice.start}</td>
            <td>{notice.end}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger'
                onClick={() => Delete(notice._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
            <td>
              {' '}
              <button
                className='btn btn-success'
                onClick={() => sendReminder(notice)}
              >
                Reminder{' '}
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

      <Link to={`/AddNotice`}>
        <button className='btn btn-success'>+ Add New</button>
      </Link>
      <button className='btn btn-success' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i> PDF
      </button>

      <table className='table' id='noticetable'>
        <thead>
          <tr>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Notice Number
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Notice Heading
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Notice content
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Notice author
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Date
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              End Date
            </th>
          </tr>
        </thead>
        <tbody>{noticeMapped}</tbody>
      </table>
    </Fragment>
  );
};

NoticeItem.propTypes = {
  notices: PropTypes.array.isRequired,
  deleteNotice: PropTypes.func.isRequired,
};

export default connect(null, { deleteNotice })(NoticeItem);
