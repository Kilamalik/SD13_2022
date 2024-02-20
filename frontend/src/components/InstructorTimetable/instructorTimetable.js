import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getallocatedTimetable,getInstructorByID } from '../../actions/instructor';
import InstructorItem from './insTimetableItem';
import Spinner from '../layout/Spinner';

const initialState={
    empno:'' }
    var empno;
const ListAllocTime = ({
    getallocatedTimetable,
    getInstructorByID,
    timetable1: {timetables},
    instructor: {instructor,loading },
    auth: { admin },
  }) => {
   
    const {id}= useParams();
    useEffect(() => {
        if (!instructor) getInstructorByID(id);
        if (!loading && instructor) {
          const data = {...initialState};
            data.empno=instructor.ID
            empno=data.empno;
            console.log(empno);
            getallocatedTimetable(data.empno);
        }
      
    }, [loading,getInstructorByID,getallocatedTimetable,instructor]);
    return  loading ? (
      <Spinner />
    ) : (
    
      <Fragment>
        <div>
        
         <p className='lead'>My Personal Time Table</p>
          { timetables.length > 0 ? (
        
            <InstructorItem timetable1={timetables}/>
          ):(

            <p className='lead'>No Allocated Module Found</p>
          )}
       
        </div>
  
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  ListAllocTime.propTypes = {
    getallocatedTimetable: PropTypes.func.isRequired,
    timetable1: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getInstructorByID:PropTypes.func.isRequired,
    instructor:PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    timetable1: state.timetable1,
    auth: state.auth,
    instructor:state.instructor
   
  });

  export default connect(mapStateToProps, {getallocatedTimetable,getInstructorByID})(ListAllocTime);