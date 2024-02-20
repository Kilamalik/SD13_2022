import React, { useEffect, useState } from 'react';
import { getEmailByEmail, clearEmails } from '../../actions/email';

import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import './Home.css';

//Their is issuess with this minor bugs need to fix

const EmailHistory = ({
  getEmailByEmail,
  clearEmails,
  email: { emails },
  auth: { admin, instructor },
}) => {
  useEffect(() => {
    console.log(admin);
    console.log(instructor);
    if (admin !== '') {
      console.log('NIDULAAAAAAAAA');
      getEmailByEmail(admin.email);
    } else {
      getEmailByEmail(instructor.email);
    }

    console.log(emails);
    if (emails.length !== 0) {
      setShowEmails(true);
    } else {
      setShowEmails(false);
    }
  }, []);

  const [showEmails, setShowEmails] = useState(false);

  const clearEmail = () => {
    if (instructor === undefined && admin !== undefined) {
      clearEmails(instructor.email);
      setShowEmails(false);
    } else {
      clearEmails(admin.email);
      setShowEmails(false);
    }
  };

  return (
    <div>
      <div>
        <button className='clearButton' onClick={clearEmail}>
          Clear History
        </button>
      </div>
      {showEmails ? (
        <div style={{ paddingTop: '30px' }}>
          {emails.map((mail) => {
            return (
              <div className='cards' key={mail._id}>
                <h3 style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <strong>Sent To: </strong>
                  {mail.receiversEmail}
                </h3>
                <h4 style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <strong>Subject:</strong> {mail.subject}
                </h4>
                <p style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <strong>Sent Date:</strong> {mail.sentDate}
                </p>
                <p style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <strong>Sent Message:</strong> {mail.content}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p style={{ paddingTop: '20px' }}>
            <strong>No E-Mails Found</strong>
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  instructor: state.instructor,
  email: state.email,
});

export default connect(mapStateToProps, {
  setAlert,
  getEmailByEmail,
  clearEmails,
})(EmailHistory);
