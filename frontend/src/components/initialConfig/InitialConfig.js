import React, { Fragment, useState } from 'react';
import * as XLSX from 'xlsx';
import { addEmployees } from '../../actions/employee';
import { addTimetableSheet } from '../../actions/timetable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const InitialConfig = ({ addEmployees, addTimetableSheet }) => {
  const [instructorFormData, setInstructorFormData] = useState([]);
  const [timetableFormData, setTimetableFormData] = useState([]);

  /* to calculate hours
  const calculate = (startTime, endTime) => {
    var splitStart = startTime.split(':');
    var splitEnd = endTime.split(':');
    var start = new Date(0, 0, 0, splitStart[0], splitStart[1]);
    var end = new Date(0, 0, 0, splitEnd[0], splitEnd[1]);
    var elapsed = end - start;
    var hours = new Date(0, 0, 0, 0, 0, 0, elapsed);
    var hoursCalculated = hours.getHours();
    console.log(hoursCalculated);
    return hoursCalculated;
  }; */

  // Sam Lama's code - https://github.com/Rinlama/ReactTools/blob/readexcel/src/App.js
  // YouTube - https://www.youtube.com/watch?v=h33eakwu7oo
  const readInstructorExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((instructors) => {
      setInstructorFormData(instructors);
      addEmployees(instructors);
    });
  };

  const readTimetableExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((timetable) => {
      setTimetableFormData(timetable);
      addTimetableSheet(timetable);
    });
  };

  return (
    <Fragment>
      <p className='lead'>Initial Configuration</p>
      <h1>Upload Instructor File </h1>
      <br></br>
      <input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          readInstructorExcel(file);
        }}
      />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col' style={{ textAlign: 'left' }}>
              Employee No.
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Employee Name
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Employee Email
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Phone
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Specialization
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Vacancy Status
            </th>
          </tr>
        </thead>
        <tbody>
          {instructorFormData.map((row) => (
            <tr key={row.empNo}>
              <td>{row.empNo}</td>
              <td>{row.empName}</td>
              <td>{row.sliitEmail}</td>
              <td>{row.phone}</td>
              <td>{row.department}</td>
              <td>{row.vacancyStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <h1>Upload Timetable File</h1> <br></br>
      <input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          readTimetableExcel(file);
        }}
      />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col' style={{ textAlign: 'left' }}>
              Time Slot
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Day
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Module
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Venue
            </th>
            <th scope='col' style={{ textAlign: 'left' }}>
              Group
            </th>
          </tr>
        </thead>
        <tbody>
          {timetableFormData.map((row) => (
            <tr key={row.startTime + row.dayOfTheWeek + row.group}>
              <td>
                {/* {row.startTime[0] + row.startTime[1]}:
                {row.startTime[2] + row.startTime[3]} -{' '}
                {row.endTime[0] + row.endTime[1]}:
                {row.endTime[2] + row.endTime[3]} */}
                {row.startTime} - {row.endTime}
              </td>
              <td>{row.dayOfTheWeek}</td>
              <td>{row.module}</td>
              <td>{row.venue}</td>
              <td>{row.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

InitialConfig.propTypes = {
  addEmployees: PropTypes.func.isRequired,
  addTimetableSheet: PropTypes.func.isRequired,
};

export default connect(null, { addEmployees, addTimetableSheet })(
  InitialConfig
);
