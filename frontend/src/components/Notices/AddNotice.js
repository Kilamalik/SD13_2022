import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Notices } from '../../actions/notices';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const AddNotice = ({ Notices }) => {
  const [formData, setFormData] = useState({
    noticeNo: '',
    heading: '',
    content: '',
    author: '',
    start: '',
    end: '',
  });
  //   const navigate = useNavigate();
  const { noticeNo, heading, content, author, start, end } = formData;
  const onchange = (e) =>{
    
    
      setFormData({ ...formData, [e.target.name]: e.target.value });
    

   
  }
  const onsubmit = async (e) => {
    e.preventDefault();
    var startDate = document.getElementById("startD").value;
    var EndDate = document.getElementById("endD").value;
    if (EndDate < startDate){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Start date is greater than end date',
     
      })
    }
    else{
      Notices(formData);
    }
  };
  return (
    <Fragment>
      <section className='container container-margin-top-override'>
        <p className='lead'>Add Notices</p>
        {/* <Link to={`/AddNotice`}>
          <button className='btn btn-primary'>AddNotice Notices</button>
        </Link>
        <Link to={`/notices`}>
          <button className='btn btn-primary'>List Notices</button>
        </Link> */}

        <form className='form' onSubmit={(e) => onsubmit(e)}>
          <div className='form-group'>
            Notice Number
            <small className='form-text'>
              Will be rejected if not a number
            </small>
            <input
              type='number'
              placeholder='Notice Number'
              name='noticeNo'
              min={1}
              value={noticeNo}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            Heading
            <input
              type='text'
              placeholder='Heading'
              name='heading'
              value={heading}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            Content
            <textarea
              name='content'
              rows='2'
              cols='5'
              placeholder='Enter Notice Content'
              value={content}
              onChange={(e) => onchange(e)}
            ></textarea>
          </div>
          <div className='form-group'>
            Author
            <input
              type='text'
              placeholder='Author'
              name='author'
              value={author}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            start Date
            <input
              type='date'
              placeholder='Start Date'
              min={new Date().toISOString()?.split('T')[0]}
              name='start'
              id='startD'
              value={start}
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className='form-group'>
            Expiry Date
            <input
              type='date'
              placeholder='Expiry Date'
              min={new Date().toISOString()?.split('T')[0]}
              name='end'
              id='endD'
              value={end}
              onChange={(e) => onchange(e)}
            />
          </div>

          <input type='submit' className='btn btn-primary' value='Confirm' />
          <Link to={`/notices`}>
            <input type='reset' className='btn btn-primary' value='Cancel' />
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddNotice.propTypes = {
  Notices: PropTypes.func.isRequired,
};
export default connect(null, { Notices })(AddNotice);
