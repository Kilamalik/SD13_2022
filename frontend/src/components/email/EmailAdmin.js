import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAdmins } from '../../actions/instructor';
import { sendEmail } from '../../actions/email';
import Swal from 'sweetalert2';
import { setAlert } from '../../actions/alert';
import emailjs from 'emailjs-com';
import { connect } from 'react-redux';
import './Home.css';

const EmailAdmin = ({
  getAdmins,
  sendEmail,
  admin: { admins },
  auth: { admin, instructor },
}) => {
  useEffect(() => {
    getAdmins();
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

  const emailAdminform = useRef();

  const sendAdminEmail = () => {
    
    setSentDate('null');
    const emailInstructorformValue = {
      sendersEmail,
      receiversEmail,
      subject,
      content,
      sentDate,
    };

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
        emailjs
          .sendForm(
            'service_2yi5441',
            'template_q97f9n6',
            emailAdminform.current,
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
        <h3>Send Admin Email</h3>
        <br />
        <form ref={emailAdminform} id='emailAdmins'>
          <label>My Email Address</label>
          <input name='sendersEmail' value={sendersEmail} readOnly></input>
          <br />
          <label>Send To Admin</label>
          <select
            name='receiversEmail'
            id='receiversEmail'
            style={{ width: '100%' }}
            onChange={(e) => setReceiversEmail(e.target.value)}
          >
            <option value=''></option>
            {admins.map((admin) => (
              <option value={admin.email} key={admin.ID}>
                {admin.email}
              </option>
            ))}
          </select>
          <p>{errors.receiversEmail?.message}</p>
          <br />
          <label>Subject</label>
          <input
            name='subject'
            type='subject'
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
          <button type='submit' onClick={handleSubmit(sendAdminEmail)}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  instructor: state.instructor,
});

export default connect(mapStateToProps, {
  getAdmins,
  setAlert,
  sendEmail,
})(EmailAdmin);
