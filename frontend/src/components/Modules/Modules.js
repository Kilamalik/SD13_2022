import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getModules } from '../../actions/modules_auth';
import ModuleItem from './ModuleItem';





const List = ({
  getModules,
  module: { modules, loading },
  auth: { admin },
}) => {
  useEffect(() => {
    getModules();
  }, []);

  return (
    <Fragment>
      <div>
        {modules.length > 0 ? (
          <ModuleItem module={modules} />
        ) : (
          <h4>No modules found</h4>
        )}
       
      </div>

      <div>
        
      </div>
    </Fragment>

    
  );
};

List.propTypes = {
  getModules: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
  auth: state.auth,
});

export default connect(mapStateToProps, { getModules })(List);
