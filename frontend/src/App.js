import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import InstructorLogin from './components/auth/InstructorLogin';
import EmployeeManagement from './components/employee/EmployeeManagement';
import Employees from './components/employee/Employees';
import UpdateEmployee from './components/employee/UpdateEmployee';
import TimetableManagement from './components/timetable/TimetableManagement';
import Alert from './components/layout/Alert';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AddModule from './components/Modules/AddModules';
import List from './components/Modules/Modules';
import EditModule from './components/Modules/EditModule';
import InitialConfig from './components/initialConfig/InitialConfig';
import AddVenue from './components/Venue/AddVenue';
import ListVenue from './components/Venue/Venue';
import SlotsConfirmationDialog from './components/dialogBox/SlotsConfirmationDialog';
import EditVenue from './components/Venue/EditVenue';
import AddNotice from './components/Notices/AddNotice';
import Notices from './components/Notices/Notices';
import ListAllocTime from './components/InstructorTimetable/instructorTimetable';
/* import { useNavigate } from 'react-router-dom'; */
import setAuthToken from './utils/setAuthToken';
import SendRequest from './components/LeaveManagement/SendRequest';
import { loadAdmin } from './actions/auth';
import ListLeave from './components/LeaveManagement/Leaves';
import ListLeaves from './components/LeaveManagement/LeavesAdmin';
import ListAllocModule  from './components/Modules/AllocatedModules'
//Redux
import { connect, Provider } from 'react-redux'; // the providers connects react and redux since they are not the same thing
import store from './store';
import InstructorDashboard from './components/dashboard/InstructorDashboard';
import Home from './components/instructorCreate/Home/Home';
import Profile from './components/profile/Profile';
import TimeTableAllocate from './components/timetable/TimeTableAllocate';
import AllocatedTime from './components/timetable/AllocatedTime ';
import EmailHome from './components/email/EmailHome';
const Contained = () => {
  return (
    <>
      {/* <section className='landing landing-modified'> */}
      <section
        className='container'
        /* style={{ borderStyle: 'solid', borderColor: 'red' }} */
      >
        <Alert />
        <Outlet />
      </section>
      {/* </section> */}
    </>
  );
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin()); // we have access to store and dispatch is a function of store
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            {/* Encompassing the routes inside a contained route to move the elements towards the centre of the page */}
            <Route element={<Contained />}>
              <Route path='/login' element={<Login />} />
              <Route path='/InstructorLogin' element={<InstructorLogin />} />
              <Route
                path='/employeeManagement'
                element={<EmployeeManagement />}
              />
              <Route
                path='/timetableManagement'
                element={<TimetableManagement />}
              />
              <Route path='/adminDashboard' element={<AdminDashboard />} />
              <Route path='/notices' element={<Notices />} />
              <Route
                path='/instructorDashboard'
                element={<InstructorDashboard />}
              />
              <Route path='/addModules' element={<AddModule />} />
              <Route path='/ListAlloc/:id' element={<ListAllocModule />} />
              <Route path='/ListModules' element={<List />} />
              <Route path='/EditModules' element={<EditModule />} />
              <Route path='/EditModules/:id' element={<EditModule />} />
              <Route path='/initialConfig' element={<InitialConfig />} />
              <Route path='/listEmployees' element={<Employees />} />
              <Route path='/updateEmployee/:id' element={<UpdateEmployee />} />
              <Route path='/AddVenues' element={<AddVenue />} />
              <Route path='/UserManagement' element={<Home />} />
              <Route path='/Profile/:id' element={<Profile />} />
              <Route path='/ListTime/:id' element={<ListAllocTime />} />
              <Route path='/EmailManagement' element={<EmailHome />} />

              <Route
                path='/slotsConfirmation'
                element={<SlotsConfirmationDialog />}
              />
              <Route path='/allocateSlot' element={<TimeTableAllocate />} />
              <Route path='/ListVenues' element={<ListVenue />} />
              <Route path='/EditVenues' element={<EditVenue />} />
              <Route path='/ListLeave/:id' element={<ListLeave />} />
              <Route path='/ListTime/:id' element={<ListAllocTime />} />
              <Route path='/ListLeaves' element={<ListLeaves />} />
              <Route path='/SendRequest/:id' element={<SendRequest />} />
              <Route path='/allocatedSlot' element={<AllocatedTime />} />
              <Route path='/ListVenues' element={<ListVenue />} />
              <Route path='/EditVenues' element={<EditVenue />} />
              <Route path='/Editvenues/:id' element={<EditVenue />} />
              <Route path='/AddNotice' element={<AddNotice />} />
            </Route>{' '}
            {/* Don't put routes outside this. Putting outside will override the container and display the elements under/above the navbar */}
          </Routes>
        </Fragment>
      </Router>
    </Provider> /* Everything is wrapped in a provider so that the components can access app level state */
  );
};

export default App;
