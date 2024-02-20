import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getInstructors } from '../../actions/instructor';
import { sendEmail } from '../../actions/email';
import Swal from 'sweetalert2';
import { setAlert } from '../../actions/alert';
import emailjs from 'emailjs-com';
import './Home.css';

import { connect } from 'react-redux';

const EmailInstructor = ({
  getInstructors,
  sendEmail,
  instructor: { instructors, loading },
  auth: { admin, instructor },
}) => {
  useEffect(() => {
    getInstructors();
    console.log(admin);
    console.log(instructor);
    if (admin !== '') {
      setSendersEmail(admin.email);
      console.log('NIDULAAAAAAAAA');
    } else {
      setSendersEmail(instructor.email);
    }
  }, []);

  const [sendersEmail, setSendersEmail] = useState('');
  const [receiversEmail, setReceiversEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sentDate, setSentDate] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailInstructorform = useRef();

  const updateInstructor = () => {
    setSentDate('');
    const emailInstructorformValue = {
      sendersEmail,
      receiversEmail,
      subject,
      content,
      sentDate,
    };
    console.log(emailInstructorformValue);

    Swal.fire({
      title: 'Do you want to send email?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        sendEmail(emailInstructorformValue);
    console.log(emailInstructorform.current);
    emailjs
      .sendForm(
        'service_2yi5441',
        'template_q97f9n6',
        emailInstructorform.current,
        '3yiSsWex126MEwSd2'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
       
      
        Swal.fire(

          'Done!',
          'Your email has been sent.',
          'success'
        )
      }
    })

    
  };

  return (
    <div>
      <div className='create'>
        <h3>Send Instructor Email</h3>
        <br />
        <form ref={emailInstructorform} id='InstructorEmail'>
          <label>My Email Address</label>
          <input name='sendersEmail' readOnly value={sendersEmail}></input>
          <br />
          <label>Select To Instructor</label>
          <select
            name='receiversEmail'
            id='receiversEmail'
            style={{ width: '100%' }}
            onChange={(e) => setReceiversEmail(e.target.value)}
          >
            <option value=''></option>
            {instructors.map((instru) => (
              <option value={instru.email} key={instru.ID}>
                {instru.email}
              </option>
            ))}
          </select>
          <p>{errors.receiversEmail?.message}</p>
          <br />
          <label>Subject</label>
          <input
            name='subject'
            {...register('subject', { required: 'This is required' })}
            onChange={(e) => setSubject(e.target.value)}
          ></input>
          <p>{errors.subject?.message}</p>
          <br />
          <label>Content</label>
          <textarea
            name='content'
            {...register('content', { required: 'This is required' })}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <p>{errors.content?.message}</p>
          <br />
          <button type='submit' onClick={handleSubmit(updateInstructor)}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
  auth: state.auth,
  admin: state.admin,
  instructor: state.instructor,
});

export default connect(mapStateToProps, {
  setAlert,
  getInstructors,
  sendEmail,
})(EmailInstructor);
