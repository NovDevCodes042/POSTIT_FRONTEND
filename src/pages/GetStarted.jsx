import React, { useState } from "react";
import "../../styles/Getstarted.css";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { instance } from "../Config/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Getstarted = () => {
  const [reg, setReg] = useState(false)
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must be at least 6 characters")
      .required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, // Requires lowercase, uppercase, digit, and special character
        "Password must contain at least one lowercase, one uppercase, one digit, and one special character"
      )
      .required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const redirect = useNavigate()

  const onSubmit = async (data) => {
    // Handle form submission
    // console.log(data);
    setReg(true);
    try {
      // const response = await instance.post('/register', data)
      const { data: res } = await instance.post('/register', data)
      // console.log(response);
      if (res.success) {
        //navigate to login using /login
        redirect('/login')
      // } else {
      //   //show error 
        console.log(res);
      }
    } catch (error) {
      // console.log(error);
      toast.error('Username or email is in use')
      setReg(false);
    }
  };

  const [show, setShow] = useState(false)
  const toggleShow = (e) => {
    // e.stopPropagation()
    e.preventDefault()
    setShow(!show)
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="getStarted">
        <div className="started">
          <div>
            <h1 className="join">
              Join Post<span className="span">it</span>.
            </h1>
            <p className="enter">
              Enter your email address to create an account on Postit.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputInfo">
                <label htmlFor="username">Username</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <input {...field} type="text" />}
                />
                <p className="text-danger">{errors.username?.message}</p>
              </div>
              <div className="inputInfo">
                <label htmlFor="email">Your Email Address</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <input {...field} type="email" />}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              <div className="inputInfo position-relative">
                <label htmlFor="password">Password</label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <input {...field} type={show ? "text" : "password"} />}
                  />
                  <button onClick={toggleShow} className="toggleBtn" > {show ? "Hide" : "show"} </button>
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <button className="btnContinue" type="submit">
                {/* Continue */}
                {reg ? "Registering..." : "Continue"}
              </button>
            </form>
            <Link to="/login" className="link1 text-decoration-none">
              <h6 className="alreadyStart">
                Already have an account? <span className="span">Sign In</span>
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
