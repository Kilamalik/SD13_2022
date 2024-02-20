import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteModule } from '../../actions/modules_auth';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

const pdfGenerate = (e) => {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');

  autoTable(doc, {
    html: '#module-table',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('       Module List  ', data.settings.margin.right, 22);
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

  doc.save('Module_List.pdf');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500,
  });
};
const ModuleItem = ({ module, deleteModule }) => {
  const [value, SetValue] = useState('');
  const [dataSource, SetdataSource] = useState(module);
  const [tableFilter, SetTableFilter] = useState([]);
  //const [sortvalue,SetsortValue]=useState('');

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
        var moduleid = id;
        deleteModule(moduleid);
        Swal.fire('Deleted!', 'Module has been deleted.', 'success');
      }
    });
  };

  const handleFilter = (value) => {
    SetValue(value);
    const filterData = dataSource.filter(
      (module) => module.specialization === value
    );
    SetTableFilter([...filterData]);
  };

  const modules =
    value.length > 0
      ? tableFilter.map((mod) => (
          <tr key={mod._id}>
            <td>{mod.moduleName}</td>
            {/* <td>{mod.ModuleID}</td> */}
            <td>{mod.specialization}</td>
            <td>{mod.year}</td>
            <td>{mod.semester}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger'
                onClick={() => Delete(mod._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>

            <td>
              <Link to={`/EditModules/${mod._id}`}>
                <button className='btn btn-success'>
                  <i className='fas fa-edit'></i>
                </button>
              </Link>
            </td>
            <td>
              <Link to={`/ListAlloc/${mod._id}`}>
                <button className='btn btn-success'>
                  <i className='fas fa-calendar'></i>
                </button>
              </Link>
            </td>
          </tr>
        ))
      : module.map((mod) => (
          <tr key={mod._id}>
            <td>{mod.moduleName}</td>
            {/* <td>{mod.ModuleID}</td> */}
            <td>{mod.specialization}</td>
            <td>{mod.year}</td>
            <td>{mod.semester}</td>
            <td>
              {' '}
              <button
                className='btn btn-danger btn-mini'
                onClick={() => Delete(mod._id)}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
            <td>
              <Link to={`/EditModules/${mod._id}`}>
                <button className='btn btn-success btn-mini'>
                  <i className='fas fa-edit'></i>
                </button>
              </Link>
            </td>
            <td>
              <Link to={`/ListAlloc/${mod._id}`}>
                <button className='btn btn-success'>
                  <i className='fas fa-calendar'></i>
                </button>
              </Link>
            </td>
          </tr>
        ));

  return (
    <Fragment>
      <p className='lead'> Module Management</p>

      <div className='search'>
        <input
          type='text'
          placeholder='Search'
          value={value}
          onChange={filterData}
        />
      </div>
      <div>
        <button className=' btn btn-success' onClick={() => handleFilter('SE')}>
          SE
        </button>
        <button className=' btn btn-success' onClick={() => handleFilter('IT')}>
          IT
        </button>
        <button
          className=' btn btn-success'
          onClick={() => handleFilter('CSNE')}
        >
          CSNE
        </button>
        <button
          className='  btn btn-success'
          onClick={() => handleFilter('ISE')}
        >
          ISE
        </button>
        <button className=' btn btn-success' onClick={() => handleFilter('CS')}>
          CS
        </button>
        <button
          className='  btn btn-success'
          onClick={() => handleFilter('IM')}
        >
          IM
        </button>
        <button
          className='  btn btn-success'
          onClick={() => handleFilter('DM')}
        >
          DM
        </button>
        <br />
      </div>

      <Link to={`/addModules`}>
        <button className='btn btn-success'>+ Add New</button>
      </Link>
      <button className='btn btn-success' onClick={pdfGenerate}>
        <i className='fas fa-file-download'></i> PDF
      </button>

      <table className='table' id='module-table'>
        <thead>
          <tr>
            {/* <th>Module Name</th> */}
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Module Name
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Specialization
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Year
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Semester
            </th>
          </tr>
        </thead>
        <tbody>{modules}</tbody>
      </table>
    </Fragment>
  );
};

ModuleItem.propTypes = {
  module: PropTypes.array.isRequired,
  deleteModule: PropTypes.func.isRequired,
};

export default connect(null, { deleteModule })(ModuleItem);
