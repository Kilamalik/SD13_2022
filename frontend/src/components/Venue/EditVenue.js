import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVenueByID, getVenueID } from '../../actions/venues';
import { useParams } from 'react-router-dom';
const initialState = {
  vName: '',
  vID: '',
  type: '',
  size: '',
  floor: '',
  faculty: '',
};
const EditVenue = ({
  venue: { venue, loading },
  updateVenueByID,
  getVenueID,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const updateVenue = useMatch('/updateVenueByID');
  useEffect(() => {
    if (!venue) getVenueID(id);
    if (!loading && venue) {
      const venueData = { ...initialState };
      for (const key in venue) {
        if (key in venueData) venueData[key] = venue[key];
      }
      setFormData(venueData);
    }
  }, [loading, getVenueID, venue]);
  const { vName, vID, type, size, floor, faculty } = formData;
  const navigate = useNavigate();
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    updateVenueByID(id, formData, navigate);
  };
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        {/* <h1 className='large text-primary'>Module Management</h1> */}
        <p className='lead'>Edit Venue</p>
        <form className='form' onSubmit={(e) => onsubmit(e)}>
          <div className='form-group'>
            Venue Name
            <small className='form-text'>
              Will be rejected if venue already exists
            </small>
            <input
              type='text'
              placeholder='Name'
              name='vName'
              value={vName}
              onChange={(e) => onchange(e)}
              disabled
            />
          </div>
          <div className='form-group'>
            Venue ID
            <small className='form-text'>
              Will be rejected if venue already exists
            </small>
            <input
              type='text'
              placeholder='venue ID'
              name='vID'
              value={vID}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            type
            <select name='type' value={type} onChange={(e) => onchange(e)}>
              <option value='0'>* Select the type</option>
              <option value='Lecture Hall'>Lecture Hall</option>
              <option value='Auditorium'>Auditorium</option>
              <option value='Lab'>Lab</option>
            </select>
          </div>
          <div className='form-group'>
            size
            <input
              type='text'
              placeholder='Size'
              name='size'
              value={size}
              onChange={(e) => onchange(e)}
            />
          </div>

          <div className='form-group'>
            Floor
            <input
              type='text'
              placeholder='floor'
              name='floor'
              value={floor}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            Faculty
            <select
              name='faculty'
              value={faculty}
              onChange={(e) => onchange(e)}
            >
              <option value='0'>* Select the Faculty</option>
              <option value='Faculty Of Computing'>Faculty Of Computing</option>
              <option value='Faculty of Engineering'>
                Faculty of Engineering
              </option>
              <option value='Faculty of Business'>Faculty of Business</option>
              <option value='Faculty of Humanities and Sciences'>
                Faculty of Humanities and Sciences
              </option>
            </select>
          </div>
          <input type='submit' className='btn btn-primary' value='Confirm' />

          <input type='reset' className='btn btn-primary' value='Cancel' />
        </form>
      </section>
    </Fragment>
  );
};
EditVenue.propTypes = {
  updateVenueByID: PropTypes.func.isRequired,
  getVenueID: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.venue,
});

export default connect(mapStateToProps, { updateVenueByID, getVenueID })(
  EditVenue
);
