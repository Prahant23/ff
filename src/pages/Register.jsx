import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };

  return (
    <div
      className="container-fluid bg-light"
      style={{ maxHeight: "100vh", maxWidth: "100%" }}
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div
            className="card p-4"
            style={{ borderRadius: "15px", maxWidth: "100%" }}
          >
            <h1 className="mb-4 text-center text-danger">Create an Account</h1>
            <form>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  onChange={handleFirstName}
                  type="text"
                  className="form-control"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  onChange={handleLastName}
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  onChange={handleEmail}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  onChange={handlePassword}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <button
                onClick={handleSubmit}
                className=" mt-3 btn btn-danger btn-block"
              >
                Register
              </button>
              <p className="mt-3 text-center">
                Already have an account? <a href="login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
