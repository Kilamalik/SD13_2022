import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';
import SlotsConfirmationDialog from '../dialogBox/SlotsConfirmationDialog';

const TimetableManagement = ({ getSlots, timetable: { slots } }) => {
  const [buttonStatus, setButtonStatus] = useState({
    delete: false,
  });

  useEffect(() => {
    getSlots();
    buttonStatus.delete = false;
  }, []);

  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>Timetable Management</p>

        {buttonStatus.delete ? (
          <Fragment>
            <SlotsConfirmationDialog
              status={buttonStatus}
              setStatus={setButtonStatus}
              deleteP={buttonStatus.delete}
            />
          </Fragment>
        ) : (
          <Fragment>
            <button
              className='btn btn-danger'
              style={{ float: 'right' }}
              onClick={() => setButtonStatus({ delete: !buttonStatus.delete })}
            >
              <i className='fas fa-trash'></i>
              {''} Delete All Slots{' '}
            </button>
            {slots.length > 0 ? <TimetableItem slots={slots} /> : <Spinner />}
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

TimetableManagement.propTypes = {
  getSlots: PropTypes.func.isRequired,
  timetable: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  timetable: state.timetable,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSlots })(TimetableManagement);
