import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSlots } from '../../actions/timetable';

const SlotsConfirmationDialog = ({ status, setStatus, deleteSlots }) => {
  return (
    <Fragment>
      <p className='lead'>ARE YOU SURE YOU WANT TO DELETE ALL SLOTS?</p>
      <div className='dialogContentAlignment2'>
        <button
          className='btn btn-danger'
          onClick={() => {
            setStatus({ delete: !status.delete });
            deleteSlots();
          }}
        >
         <i className='fas fa-trash'></i>{''}  Delete
        </button>
        <button
          className='btn btn-success'
          onClick={() => setStatus({ delete: !status.delete })}
        >
         <i class='fas fa-window-close'></i>{''} Cancel{' '}
        </button>
      </div>
    </Fragment>
  );
};

SlotsConfirmationDialog.propTypes = {
  status: PropTypes.any,
  setStatus: PropTypes.func,
  deleteSlots: PropTypes.func.isRequired,
};

export default connect(null, { deleteSlots })(SlotsConfirmationDialog);
