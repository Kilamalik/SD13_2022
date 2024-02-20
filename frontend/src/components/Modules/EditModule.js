import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateModuleByID, getModuleByID } from '../../actions/modules_auth';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialState = {
  moduleName: '',
  ModuleID: '',
  specialization: '',
  year: '',
  semester: '',
};
const EditModule = ({
  module: { module, loading },
  updateModuleByID,
  getModuleByID,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const updateModule = useMatch('/updateModuleByID');
  useEffect(() => {
    if (!module) getModuleByID(id);
    if (!loading && module) {
      const moduleData = { ...initialState };
      for (const key in module) {
        if (key in moduleData) moduleData[key] = module[key];
      }
      setFormData(moduleData);
    }
  }, [loading, getModuleByID, module]);
  const { moduleName, ModuleID, specialization, year, semester } = formData;
  const navigate = useNavigate();
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    if (document.getElementsByName('specialization')[0].value === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Select a specialization',
      });
    } else if (document.getElementsByName('year')[0].value === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Select a year',
      });
    } else if (document.getElementsByName('semester')[0].value === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Please Check Form ',
        text: 'Select a semester',
      });
    } else {
      updateModuleByID(id, formData, navigate);
    }
  };
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        {/* <h1 className='large text-primary'>Module Management</h1> */}
        <p className='lead'>Edit Module</p>
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
              disabled
            />
          </div>
          <div className='form-group'>
            Specialization
            <small className='form-text'>
              Specialization in computing only
            </small>
            <select
              name='specialization'
              value={specialization}
              onChange={(e) => onchange(e)}
              required
            >
              <option value='0'>Select the Specialization</option>
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
              required
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
              required
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
EditModule.propTypes = {
  updateModuleByID: PropTypes.func.isRequired,
  getModuleByID: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, { updateModuleByID, getModuleByID })(
  EditModule
);
