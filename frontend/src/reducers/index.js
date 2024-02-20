import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

import module from './module';
import employee from './employee';
import timetable from './timetable';
import venue from './venue';
import admin from './admin';
import instructor from './instructor';
import profile from './profile';
import notice from './notice';
import leave from './leave';
import email from './email';
import timetable1 from './allocation';
export default combineReducers({
  alert,
  email,
  auth,
  module,
  employee,
  instructor,
  profile,
  admin,
  timetable,
  venue,
  notice,
  leave,
  timetable1
});

// this gets imported in the store.js file
