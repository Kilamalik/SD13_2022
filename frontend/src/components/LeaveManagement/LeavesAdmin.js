import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeaves } from '../../actions/leaves';
import LeaveItemAdmin from './LeaveItemAdmin';

const ListLeaves = ({getLeaves,
    leave: { leaves, loading },
    auth: { admin },
  }) => {
    useEffect(() => {
      getLeaves();
    }, []);
  
    return (
      <Fragment>
        <div>
          { leaves.length > 0 ? (
            <LeaveItemAdmin leave={leaves}/>
          ):(
            <h4>No Leaves Found</h4>
          )}
          
        </div>
  
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  ListLeaves.propTypes = {
    getLeaves: PropTypes.func.isRequired,
    leave: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    leave: state.leave,
    auth: state.auth,
  });

  export default connect(mapStateToProps, { getLeaves })(ListLeaves);