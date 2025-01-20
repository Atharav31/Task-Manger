import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../Utility/ValidationPassword";
import { toast } from "react-toastify";
import { SignUpApi } from "../API/Users";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate password
    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.password) {
      toast.error(errors.password); // Replace with toast or other notification
      return;
    }
    try {
      const response = await SignUpApi(formData);
      console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/login");
      }
      if (response.status === 400) {
        toast.error(response.data.message);
      }
      if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <span onClick={togglePasswordVisibility} className="cursor-pointer">
            <span className="flex justify-start items-center space-x-2">
              {showPassword ? (
                <>
                  <FaEyeSlash />
                  <span>Hide Password</span>
                </>
              ) : (
                <>
                  <FaEye />
                  <span>Show Password</span>
                </>
              )}
            </span>
          </span>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
          <div className=" flex justify-center align-center">
            <label className="label">
              <Link
                to="/login"
                className=" link link-hover text-primary semibold"
              >
                Already have an account ? Login
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
