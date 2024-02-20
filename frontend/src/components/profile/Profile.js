import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../actions/profile";
import { useParams } from "react-router-dom";
import "../profile/Profile.css";
import profile from "../../../src/img/profile.jpg";
import { Link } from "react-router-dom";

import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const Profile = ({
  auth: { isAuthenticated, isAdmin, isInstructor },
  updateProfile,
}) => {
  const { id } = useParams();

  const [ID, setUserID] = useState("");
  const [email, setemail] = useState("");
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const initialLogin = false;
  let userType;

  useEffect(() => {
    setUserID(id);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const profileForm = useRef();

  const updateUserProfile = () => {
    console.log(id);
    const updatedProfileformValue = {
      ID,
      email,
      userName,
      password,
      initialLogin,
    };
    console.log(updatedProfileformValue);

    if (isAdmin) {
      userType = "Admin";
    } else if (isInstructor) {
      userType = "Instructor";
    }
    updateProfile(
      updatedProfileformValue.ID,
      updatedProfileformValue,
      userType
    );
  };

  return (
    <div>
      <div className="create">
        <img src={profile} alt="Avatar" className="avatar" />
        <h3>Update Profile</h3>
        <form ref={profileForm}>
          <label>UserID</label>
          <input name="ID" readOnly value={ID}></input>
          <br />
          <label>Email</label>
          <input
            name="email"
            type="email"
            {...register("email", { required: "This is required" })}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <p>{errors.email?.message}</p>
          <br />
          <label>Username</label>
          <input
            name="userName"
            {...register("userName", { required: "This is required" })}
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <p>{errors.userName?.message}</p>
          <br />
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Need atleast 8 characters" },
              maxLength: { value: 20, message: "Max characters are 20" },
            })}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <p>{errors.password?.message}</p>
          <br />
          <button
            style={{ width: "50%", backgroundColor: "green" }}
            type="submit"
            onClick={handleSubmit(updateUserProfile)}
          >
            <strong> Update Profile </strong>
          </button>
          <br />
          <br />
          {isAuthenticated && isAdmin ? (
            <div>
              <button style={{ width: "50%" }}>
                <Link to="/adminDashboard" style={{ paddingLeft: "10px" }}>
                  <strong style={{ color: "white" }}>Cancel</strong>
                </Link>
              </button>
            </div>
          ) : (
            <div>
              <button style={{ width: "50%" }}>
                <Link to="/instructorDashboard" style={{ paddingLeft: "10px" }}>
                  <strong style={{ color: "white" }}>Cancel</strong>
                </Link>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, updateProfile })(Profile);
