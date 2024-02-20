import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getallocatedmodule,getModuleByID } from '../../actions/modules_auth';
import AllocatedIModitem from './AllocatedIModitem';
import Spinner from '../layout/Spinner';
const initialState={
    modulname:'' }
    var name;
const ListAllocModule = ({
    getallocatedmodule,
    getModuleByID,
    timetable1: {timetables},
    module:{module,loading},
    auth: { admin },
  }) => {
    const {id}= useParams();
    
    useEffect(() => {
        if (!module) getModuleByID(id);
        if (!loading && module) {
     const data = {...initialState};
     data.modulname=module.moduleName
     name=data.modulname;
     getallocatedmodule(data.modulname);
        }
      
    }, [loading,getModuleByID,getallocatedmodule,module]);

    return   (
      <Fragment>
        <div>
        <h1 className='lead'>{name}</h1>
        
          { timetables.length > 0 ? (
        
            <AllocatedIModitem timetable1={timetables}/>
          ):(

            <p className='lead'>No Allocated Instructors Found</p>
          )}
          
        </div>
  
        <div>
          
        </div>
      </Fragment>
  
      
    );
  };
  
  ListAllocModule.propTypes = {
    getallocatedmodule: PropTypes.func.isRequired,
    timetable1: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getModuleByID:PropTypes.func.isRequired,
    module:PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    timetable1: state.timetable1,
    auth: state.auth,
    module:state.module
   
  });

  export default connect(mapStateToProps, {getallocatedmodule,getModuleByID})(ListAllocModule);