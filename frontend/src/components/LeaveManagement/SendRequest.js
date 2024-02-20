import React, { Fragment, useState, useRef,useEffect } from 'react';
import { connect } from 'react-redux';
import { requestLeave } from '../../actions/leaves';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {getInstructorByID} from '../../actions/instructor';
import emailjs from '@emailjs/browser';
import Spinner from '../layout/Spinner';
import Swal from 'sweetalert2';

const initialState={
  empNo:'' , 
  empName:'', 
  CordinatorEmail:'', 
  date:'', 
  starttimeoff:'',
  Endtimeoff:'',
  Message:'', 
  NumberofDays:'',
  status:''
};

const SendRequest =({requestLeave,getInstructorByID,instructor:{instructor,loading},})=>{

   
      const [formData, setFormData] = useState(initialState);
      const navigate = useNavigate();
      const [email, setEmail] = useState('')
      const form = useRef();
      const {id}= useParams();
      useEffect(() => {
        if (!instructor) getInstructorByID(id);
    
        if (!loading && instructor) {
          const data = { ...initialState };
          data.empNo = instructor.ID;
          data.empName = instructor.userName;
          setEmail (instructor.email);
    
          setFormData(data);
        }
      }, [loading, getInstructorByID, instructor]);


      const { empNo , empName, CordinatorEmail, date,starttimeoff,Endtimeoff,Message, NumberofDays,status } = formData;

      const onChange = (e) =>{
       
        
        const timeInput = document.getElementById('txtStartTime');
        const timeInput2 = document.getElementById('txtEndTime');

       
       
          var strStartTime = document.getElementById("txtStartTime").value;
          var strEndTime = document.getElementById("txtEndTime").value;
      
          var startTime = new Date().setHours(GetHours(strStartTime), GetMinutes(strStartTime), 0);
          var endTime = new Date(startTime)
          endTime = endTime.setHours(GetHours(strEndTime), GetMinutes(strEndTime), 0);
          if (startTime > endTime) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Start Time is greater than end time',
           
            })
            
              e.preventDefault();
          }
          else if (startTime == endTime) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Start Time equals end time',
           
            })
             
              e.preventDefault();
          }
          else if (endTime < startTime) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'End Time less than start time',
           
            })
            
            e.preventDefault();
        }
        else {
          
          setFormData({ ...formData, [e.target.name]: e.target.value });

          
        }
      };
      function GetHours(d) {
          var h = parseInt(d?.split(':')[0]);
          if (d.split(':')[1]?.split(' ')[1] == "PM") {
              h = h + 12;
          }
          return h;
      }
      function GetMinutes(d) {
          return parseInt(d?.split(':')[1]?.split(' ')[0]);
      }

      
    
      const onSubmit = async (e) => {
        e.preventDefault();
       
        requestLeave(id,formData,navigate);

        emailjs.sendForm('service_5hilmhs', 'template_a586mw5',form.current, 'mxh2UGjiVIpuyyKJP')
          .then((result) => {
                console.log(result.text);
          }, (error) => {
          console.log(error.text);
          });
      };

      return  loading ? (
        <Spinner />
      ) :(
        <Fragment>
          <section
            className='container container-margin-top-override'
            /* style={{ borderStyle: 'solid', borderColor: 'blue' }} */
          >
            {/* <h1 className='large text-primary'>Employee Management</h1> */}
            <p className='lead'>
              {/* <i className='fas fa-user'></i> */} Leave Management
            </p>
    
            
    
            <form ref={form} className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
                Number
             
                <input
                  type='text'
                  placeholder='Number'
                 
                  name='empNo'
                  readOnly={true}
                  value={empNo}
                  onChange={(e) => onChange(e)}
                  required
                  
                />
              </div>
              <div className='form-group'>
              Email
             
             <input
               type='text'
               placeholder='email'
              
               name='email'
               readOnly={true}
               value={email}
               onChange={(e) => onChange(e)}
               required
               hidden
             />

              </div>
    
              <div className='form-group'>
                Name
                <input
                  type='text'
                  placeholder='name'
                  readOnly={true}
                  name='empName'
                  value={empName}
                  onChange={(e) => onChange(e)}
                  
                />
              </div>
    
              <div className='form-group'>
                Lecturer incharge SLIIT email
                
                <input
                  type='text'
                  placeholder='Lecturer in charge SLIIT email'
                  name='CordinatorEmail'
                  value={CordinatorEmail}
                  onChange={(e) => onChange(e)}
                 
                />
              </div>
    
              <div className='form-group'>
                Date of leave
                
                <input
                  type='date'
                  placeholder='Date of leave'
                  min={new Date().toISOString()?.split('T')[0]}
                  name='date'
                  pattern="\d{4}-\d{2}-\d{2}"
                  value={date}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                From
                
                <input
                  type='time'
                  placeholder='Start time'
                  id='txtStartTime'
                  name='starttimeoff'
                  min="08:00" max="20:00"
                  
                  value={starttimeoff}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                To 
                
                <input
                  type='time'
                  placeholder='End time '
                  name='Endtimeoff'
                  id='txtEndTime'
                  
                  min="08:00" max="20:00"
                  value={Endtimeoff}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                Message 
                
                <textarea
                  
                  placeholder='Reason for leave'
                  name='Message'
                  value={Message}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className='form-group'>
                Number of days
                
                <input
                  type='number'
                  placeholder='Number of days'
                  min={1}
                  max={10}
                  name='NumberofDays'
                  value={NumberofDays}
                  onChange={(e) => onChange(e)}
                />
              </div>
            
          
          <div className='form-group'>
            <label
              hidden='hidden'
              name='status'
              value={status}
              onChange={(e) => onChange(e)}
            >
              pending{' '}
            </label>
          </div>
         
          <input type='submit' className='btn btn-success' value='Send' />
          <Link to={`/ListLeave/${id}`} >
          <input type='reset' className='btn btn-danger' value='Cancel' />
          </Link>
        </form>
      </section>
    </Fragment>
  );
};
SendRequest.propTypes = {
  requestLeave: PropTypes.func.isRequired,
  getInstructorByID:PropTypes.func.isRequired,
  instructor:PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  instructor: state.instructor,
});

export default connect(mapStateToProps, { getInstructorByID,requestLeave })(SendRequest);
      
