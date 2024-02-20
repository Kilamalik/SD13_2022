import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { loginAdmin } from '../../actions/auth';
import PropTypes from 'prop-types';

// import connect to connect this component to redux. Use when you want the component to call an action or get a state

const Login = ({ loginAdmin, isAuthenticated }) => {
  // formData is the object that holds our values and setFormData is the function to change the values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/adminDashboard' />;
  }

  return (
    <Fragment>
      <h1 style={{ marginTop: '30px' }} className='large'>
        Sign In as Admin
      </h1>
      {/* <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p> */}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, loginAdmin })(Login);
// connect takes in two parameters - first param as any state you want to map and second param is object with actions you want to use
