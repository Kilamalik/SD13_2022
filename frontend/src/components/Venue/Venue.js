import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVenues } from '../../actions/venues';
import VenueItem from './VenueItem';

const ListVenue = ({
  getVenues,
  venue: { venues, loading },
  auth: { admin },
}) => {
  useEffect(() => {
    getVenues();
  }, []);
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>
          {/* <i className='fas fa-user'></i> */} Venue Management
        </p>
        {venues.length > 0 ? (
          <VenueItem venue={venues} />
        ) : (
          <h4>No Venues found</h4>
        )}
       
      </section>
    </Fragment>
  );
};
ListVenue.propTypes = {
  getVenues: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.venue,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVenues })(ListVenue);
