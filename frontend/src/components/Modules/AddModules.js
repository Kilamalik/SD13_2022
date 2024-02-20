import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { Modules } from '../../actions/modules_auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddModule = ({ Modules }) => {
  const [formData, setFormData] = useState({
    moduleName: '',
    ModuleID: '',
    specialization: '',
    year: '',
    semester: '',
  });
  const navigate = useNavigate();
  const { moduleName, ModuleID, specialization, year, semester } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    Modules(formData, navigate);
  };
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        {/* <h1 className='large text-primary'>Module Management</h1> */}
        <p className='lead'>Add Modules</p>
        <form className='form' onSubmit={(e) => onsubmit(e)}>
          <div className='form-group'>
            Module Name
            <small className='form-text'>
              Will be rejected if module already exists
            </small>
            <input
              type='text'
              placeholder='Name'
              name='moduleName'
              value={moduleName}
              onChange={(e) => onchange(e)}
              
            />
          </div>
          {/* <div className='form-group'>
            Module Code
            <small className='form-text'>
              Will be rejected if module already exists
            </small>
            <input
              type='text'
              placeholder='Module Code'
              name='ModuleID'
              value={ModuleID}
              onChange={(e) => onchange(e)}
            /> */}
          
          <div className='form-group'>
            Specialization
          
            <select
              name='specialization'
              value={specialization}
              onChange={(e) => onchange(e)}
            >
              <option value='0'>* Select the Specialization</option>
              <option value='SE'>SE</option>
              <option value='IT'>IT</option>
              <option value='CSNE'>CSNE</option>
              <option value='ISE'>ISE</option>
              <option value='CS'>CS</option>
              <option value='IM'>IM</option>
              <option value='DS'>DS</option>
            </select>
          </div>
          <div className='form-group'>
            Year
            
            <select
              name='year'
              value={year}
              onChange={(e) => onchange(e)}
            >
              <option value='0'>* Select the Year of Study</option>
              <option value='Year 1'>1</option>
              <option value='Year 2'>2</option>
              <option value='Year 3'>3</option>
              <option value='Year 4'>4</option>
              
            </select>
          </div>
          
          <div className='form-group'>
            Semester
            
            <select
              name='semester'
              value={semester}
              onChange={(e) => onchange(e)}
            >
              <option value='0'>* Select the Semester</option>
              <option value='1'>Semester 1</option>
              <option value='2'>Semester 2</option>
              
            </select>
          </div>
          <input type='submit' className='btn btn-primary' value='Confirm' />
          <Link to='/ListModules'>
            <input type='reset' className='btn btn-primary' value='Cancel' />
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddModule.propTypes = {
  Modules: PropTypes.func.isRequired,
};

export default connect(null, { Modules })(AddModule);
