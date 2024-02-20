import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner'
import { getNotices } from '../../actions/notices';
import NoticeItem from './NoticeItem';



const Notices = ({getNotices , notice :{notices, loading}}) => {
  useEffect(() => {
    getNotices();
  }, []);
  return loading ? (
    <Spinner/> ) :(
      <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Notice Management
        </p>
        {/* <Link to={`/AddNotice`}>
          <button className='btn btn-primary'>AddNotice Notices</button>
        </Link>
        <Link to={`/notices`}>
          <button className='btn btn-primary'>List Notices</button>
        </Link> */}


        

        {notices.length > 0 ? (
          <NoticeItem notices={notices} />
        ) : (
          <h4>No notices found</h4>
        )}
          
      </section>
    </Fragment>
  );
}
Notices.propTypes = {
  getNotices: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  notice: state.notice,
  auth: state.auth,
});

export default connect(mapStateToProps, { getNotices })(Notices);