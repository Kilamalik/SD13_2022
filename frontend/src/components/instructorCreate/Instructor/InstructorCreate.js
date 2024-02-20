import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { addInstructor } from "../../../actions/instructor";

import { setAlert } from "../../../actions/alert";
import emailjs from "emailjs-com";
import { connect } from "react-redux";
import "../Home/Home.css";

const InstructorCreate = ({ addInstructor, instructor: { instructors } }) => {
  const [ID, setUserID] = useState("");
  const [email, setemail] = useState("");
  const [department, setDepartment] = useState("");
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const initialLogin = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const instructorform = useRef();

  const createInstructor = () => {
    const formValue = {
      ID,
      email,
      userName,
      department,
      password,
      initialLogin,
    };
    console.log(formValue);
    addInstructor(formValue);
    emailjs
      .sendForm(
        "service_2yi5441",
        "template_3uq9jb9",
        instructorform.current,
        "3yiSsWex126MEwSd2"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const onsubmitInstructor = () => {
    createInstructor();
  };

  return (
    <div>
      <div className="create">
        <form ref={instructorform}>
          <label>UserID</label>
          <input
            name="ID"
            {...register("ID", { required: "This is required" })}
            onChange={(e) => setUserID(e.target.value)}
          ></input>
          <p>{errors.ID?.message}</p>
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
          <label>Department</label>
          <select
            name="department"
            id="department"
            style={{ width: "100%" }}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value=""></option>
            <option value='C'>Computer Science & Software Engineering (CSSE)</option>
            <option value='IT'>Information Technology (IT)</option>
            <option value='CSNE'>
              Computer Systems Engineering (CSE)
            </option>
          </select>
          <p>{errors.department?.message}</p>
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
          <button type="submit" onClick={handleSubmit(onsubmitInstructor)}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
  auth: state.auth,
});

export default connect(mapStateToProps, { addInstructor, setAlert })(
  InstructorCreate
);
