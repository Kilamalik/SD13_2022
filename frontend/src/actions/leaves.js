import axios from 'axios';
import { setAlert } from './alert';
import { GET_LEAVES, LEAVE_ERROR ,GET_LEAVE} from './types';
import Swal from 'sweetalert2';
export const requestLeave =(id,formData,navigate)=> async (dispatch)=>{

    try{

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      
          const res = await axios.post('/api/leaves', formData, config);
          
          dispatch(setAlert('Request Has been Sent', 'success'));
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The request has been saved',
             showConfirmButton: false,
           timer: 1500
           })
          navigate(`/ListLeave/${id}`);
          

    }catch(err){

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch((Swal.fire({
                icon: 'error',
                title:'Please Check Form ',
                text: `${error.msg}`}))))
        }

    }

};

// Get all Leaves
export const getLeaves = () => async dispatch => {
  try {
      const res = await axios.get('/api/leaves');
      dispatch({
        type: GET_LEAVES,
        payload: res.data
    });

      
  } catch (err) {
    dispatch({
      type: LEAVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  })
  }
};


//delete Leave
export const deleteLeave = (id,empNo) => async dispatch => {
  try {
      await axios.delete(`/api/leaves/${id}`);

      //dispatch(setAlert('Leave Removed', 'success'));
      const res=await axios.get(`/api/leave/${empNo}`);
      dispatch({
        type: GET_LEAVES,
        payload: res.data
    });  

   

  } catch (err) {
      dispatch({
          type: LEAVE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status } 
      });
  }
};

//get Leave by id
export const getLeave = id => async dispatch => {
  try {
      const res=await axios.get(`/api/leaves/${id}`);

      dispatch({
          type: GET_LEAVE,
          payload: res.data
      });  

  } catch (err) {
      dispatch({
          type: LEAVE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status } 
      });
  }
};

//get Leave by id
export const getLeavebyName = empno => async dispatch => {
    try {
        const res=await axios.get(`/api/leave/${empno}`);
  
        dispatch({
            type: GET_LEAVES,
            payload: res.data
        });  
  
    } catch (err) {
        dispatch({
            type: LEAVE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
  };
  



//update status
export const updatestatusByID = (ID,formData) => async dispatch => {
  try {
      

       await axios.post(`/api/leaves/${ID}`,{status:formData});
     
      const res = await axios.get('/api/leaves');
      
      dispatch({
          type: GET_LEAVES,
          payload: res.data
      }); 

  } catch (err) {
      const errors = err.response.data.errors;
      if(errors) {
        errors.forEach((error) => dispatch((Swal.fire({
            icon: 'error',
            title:'Please Check Form ',
            text: `${error.msg}`}))))
      }

     
  }
}; 