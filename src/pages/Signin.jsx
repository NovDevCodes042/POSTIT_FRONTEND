import React, { useState } from "react";
import "../../styles/Signin.css";
import "../../styles/Getstarted.css";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../Config/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [log, setLog] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLog(true);
    try {
      const { data } = await instance.post('/login', {
        email,
        password,
      });
      if (data.success) {
        //store token in localstorage
        localStorage.setItem('token', data.token)
        //navigate to welcome page
        redirect('/Welcome')
      }
    } catch (error) {
      toast.error('Email or password is incorrect')
      setLog(false);
    }
  }

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
            <h1 className="join2">Welcome Back</h1>

            <form onSubmit={handleLogin}>
              <div className="inputInfo ">
                <label htmlFor="username">Your Email Address</label>
                <input type="email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                <small style={{ backgroundColor: "red" }}> </small>
              </div>
              <div className="inputInfo position-relative">
                <label htmlFor="password">Password</label>
                <input type={show ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={toggleShow} className="toggleBtn" > {show ? "Hide" : "show"} </button>
                <small style={{ backgroundColor: "red" }}></small>
              </div>
              <button className="btnContinue2" type="submit">
                {/* Continue */}
                {log ? "Logging in..." : "Continue"}
              </button>
            </form>
            <Link to="/signup" className="link1">
              <h6 className="alreadyStart2">
                No account? <span className="span">Sign Up</span>
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
