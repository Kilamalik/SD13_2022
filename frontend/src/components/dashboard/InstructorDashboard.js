import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const InstructorDashboard = ({ auth: { instructor } }) => {
  return (
    <Fragment>
      <h1 style={{ marginTop: '30px' }} className='large  center-text'>
        Hello {instructor && instructor.userName}
      </h1>
      <p className='lead center-text'>
        <i className='fas fa-user'></i> Let's get started
      </p>
      <p className='lead'>
        <i className='fas fa-user'></i> Managements
      </p>

      <Link
        className='btn leaveManagement '
        to={`/ListLeave/${instructor._id}`}
      ></Link>
      <Link
        className='btn personalTimetable '
        to={`/ListTime/${instructor._id}`}
      ></Link>
      <Link className='btn EmailManagement' to='/EmailManagement'></Link>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(InstructorDashboard);
