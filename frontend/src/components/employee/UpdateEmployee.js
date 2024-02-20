import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getEmployeeByID, updateEmployeeByID } from '../../actions/employee';
import Spinner from '../layout/Spinner';
import Swal from 'sweetalert2';

const initialState = {
  empNo: '',
  empName: '',
  sliitEmail: '',
  phone: '',
  department: '',
  vacancyStatus: '',
};

const UpdateEmployee = ({
  getEmployeeByID,
  updateEmployeeByID,
  employee: { employee, loading },
}) => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!employee) getEmployeeByID(id);

    if (!loading && employee) {
      const data = { ...initialState };
      data.empNo = employee.empNo;
      data.empName = employee.empName;
      data.sliitEmail = employee.sliitEmail;
      data.phone = employee.phone;
      data.department = employee.department;

      setFormData(data);
    }
  }, [loading, getEmployeeByID, employee]);

  const { empNo, empName, sliitEmail, phone, department } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (document.getElementsByName('department')[0].value === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Select A Department',
      });
    } else {
      updateEmployeeByID(employee._id, formData, navigate);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <h1 className='text-primary'>
        Updating {empNo}, {empName}'s details{' '}
      </h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          Employee's Name
          <input
            type='text'
            placeholder='Employee Name'
            name='empName'
            value={empName}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          Employee's SLIIT email
          <small className='form-text'>
            Will be rejected if employee email already exists
          </small>
          <input
            type='email'
            placeholder='Employee SLIIT email'
            name='sliitEmail'
            value={sliitEmail}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          Employee's Phone Number
          <small className='form-text'>
            Will be rejected if phone number is already used
          </small>
          <input
            type='text'
            placeholder='Phone number'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          Department
          <small className='form-text'>Departments in computing only</small>
          <select
            name='department'
            value={department}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select the department</option>
            <option value='SE'>SE</option>
            <option value='IT'>IT</option>
            <option value='CSNE'>CSNE</option>
            <option value='ISE'>ISE</option>
            <option value='CS'>CS</option>
            <option value='IM'>IM</option>
            <option value='DS'>DS</option>
          </select>
        </div>

        <input
          type='submit'
          className='btn btn-success'
          value='Update Employee'
        />

        <Link to={`/listEmployees`}>
          <button className='btn btn-danger'>Cancel</button>
        </Link>
      </form>
    </Fragment>
  );
};

UpdateEmployee.propTypes = {
  getEmployeeByID: PropTypes.func.isRequired,
  updateEmployeeByID: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default connect(mapStateToProps, {
  getEmployeeByID,
  updateEmployeeByID,
})(UpdateEmployee);
