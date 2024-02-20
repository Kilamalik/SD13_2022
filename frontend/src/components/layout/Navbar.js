import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from './logosliit.png';
const Navbar = ({
  auth: { isAuthenticated, loading, admin, instructor, isInstructor, isAdmin },
  logout,
}) => {
  const processLink = (
    <ul>
      <li>
        <div>
          {isAuthenticated && isAdmin ? (
            <Link to={`Profile/${admin.ID}`} style={{ background: '#CC9423' ,borderRadius:'10px'  }}>
              {' '}
              <i className='fas fa-user'></i>{' '}
              <span className='hide-sm' >Profile</span>
            </Link>
          ) : (
            <Link
              to={`Profile/${instructor.ID}`}
              style={{ background: '#CC9423' ,borderRadius:'10px' }}
            >
              {' '}
              <i className='fas fa-user'></i>{' '}
              <span className='hide-sm'>Profile</span>
            </Link>
          )}
        </div>
      </li>
      <li>
        <div>
          {isAuthenticated && isAdmin ? (
            <Link to='/adminDashboard' style={{background: '#CC9423' ,borderRadius:'10px'  }}>
              <i className='fa fa-home'></i>{' '}
              <span className='hide-sm'>Dashboard</span>
            </Link>
          ) : (
            <Link to='/instructorDashboard' style={{ background: '#CC9423' ,borderRadius:'10px' }}>
              <i className='fa fa-home'></i>{' '}
              <span className='hide-sm'>Dashboard</span>
            </Link>
          )}
        </div>
      </li>
      <li>
        {isAuthenticated && isAdmin ? (
          <a
            onClick={logout}
            href='/'
            style={{ /* color: '#fff',  */ background: '#F74940' ,borderRadius:'10px'}}
          >
            <i className='fa fa-sign-out'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        ) : (
          <a
            onClick={logout}
            href='/'
            style={{ /* color: '#fff',  */ background: '#F74940' ,borderRadius:'10px'}}
          >
            <i className='fa fa-sign-out'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        )}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login' style={{ color: '#fff', background: '#0B8390' , borderRadius:'8PX'}}>
          Admin Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-light'>
      <h1>
        <Link to='/'>
          <h1 style={{ float: 'left', color: '#1E2022' }}>
            {/* <i className='fas fa-file'></i> SLIIT IAS */}
           <img src={logo}
           style={{ height:'62px', margin: 'auto', display: 'block' }}></img>
           
          </h1>
        </Link>
      </h1>
      <div>
        {isAuthenticated ? (
          <Fragment>{/* user ? authLinks : */ processLink}</Fragment>
        ) : (
          <Fragment>{/* user ? authLinks : */ guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
