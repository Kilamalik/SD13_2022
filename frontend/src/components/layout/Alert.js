import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import connect to connect this component to redux. Use when you want the component to call an action or get a state

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// mapping redux state into a prop
// syntax -> <anyName>: state.<root reducer>

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
// connect takes in two parameters - first param as any state you want to map and second param is object with actions you want to use
