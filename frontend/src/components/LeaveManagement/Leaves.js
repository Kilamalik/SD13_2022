import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {getInstructorByID} from '../../actions/instructor';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeavebyName } from '../../actions/leaves';
import LeaveItem from './LeaveItem';
import Spinner from '../layout/Spinner';
const initialState={
  empNo:'' }
const ListLeave = ({
    getLeavebyName,
    getInstructorByID,
    leave: { leaves},
    instructor: {instructor,loading },
  }) => {
    const {id}= useParams();
    useEffect(() => {
     if (!instructor) getInstructorByID(id);
     if (!loading && instructor) {
      const data = {...initialState};
  
      data.empNo = instructor.ID;
      
      getLeavebyName(data.empNo);
     }

      
    }, [loading,getInstructorByID,getLeavebyName,instructor]);

    return  loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <div>
          { leaves.length > 0 ? (
            <LeaveItem leave={leaves}/>
          ):(
            <p className='lead'>No Leaves Found</p>
          )}
          <Link to={`/SendRequest/${id}`}>
            <button className='btn btn-success'>+ Apply</button>
          </Link>
        </div>
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  ListLeave.propTypes = {
    getLeavebyName: PropTypes.func.isRequired,
    leave: PropTypes.object.isRequired,

    getInstructorByID:PropTypes.func.isRequired,
   instructor:PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    leave: state.leave,
    
    instructor: state.instructor,
  });

  export default connect(mapStateToProps, { getInstructorByID,getLeavebyName })(ListLeave);