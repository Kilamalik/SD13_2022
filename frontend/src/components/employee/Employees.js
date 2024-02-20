import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employee';
import EmployeeItem from './EmployeeItem';
import Spinner from '../layout/Spinner';

const Employees = ({ getEmployees, employee: { employees, loading } }) => {
  useEffect(() => {
    getEmployees();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Employee Management
        </p>

        {/* <Link to={`/employeeManagement`}>
          <button className="btn btn-success" style={{ marginBottom: "5px" }}>
            + Add New
          </button>
        </Link> */}
        {employees.length > 0 ? (
          <EmployeeItem employees={employees} />
        ) : (
          <h4>No employees found</h4>
        )}
      </section>
    </Fragment>
  );
};

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
  auth: state.auth,
});

export default connect(mapStateToProps, { getEmployees })(Employees);
