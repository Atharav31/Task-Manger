import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateProfileApi } from "../API/Users";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.userProfile) || {};
  const [formData, setFormData] = useState({
    email: user?.email,
    username: user?.username,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfileApi(formData);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
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
              disabled
              type="email"
              name="email"
              value={formData.email}
              //   onChange={handleChange}
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

          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
