import React, { useEffect } from "react";
import { getAdmins, deleteAdmin } from "../../../actions/instructor";
import Swal from 'sweetalert2';
import { setAlert } from "../../../actions/alert";
import { connect } from "react-redux";
import "../Home/Home.css";

const AdminView = ({ deleteAdmin, getAdmins, admin: { admins } }) => {
  useEffect(() => {
    getAdmins();
  }, []);

  const deleteFromAdmin = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdmin(id);
        Swal.fire(

          'Deleted!',
          'Admin has been deleted.',
          'success'
        )
      }
    })
    
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Department</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.ID}>
              <td>{admin.ID}</td>
              <td>{admin.department}</td>
              <td>{admin.userName}</td>
              <td>{admin.email}</td>
              <td>
                <div style={{ paddingTop: "10px" }}></div>
                <div style={{ paddingTop: "10px" }}>
                  <button
                    className="btn btn-danger"
                    
                    type="submit"
                    onClick={() => deleteFromAdmin(admin.ID)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps, { setAlert, getAdmins, deleteAdmin })(
  AdminView
);
