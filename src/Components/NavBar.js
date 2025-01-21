import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.userProfile) || {};
  useEffect(() => {
    console.log(token);
    if (token) {
      setLogin(true);
    } else {
      navigate("/login");
    }
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");

    setLogin(false);
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="flex-1">
        {login ? (
          user?.username && (
            <Link to="/task" className="btn btn-ghost text-xl">
              {user?.username}
            </Link>
          )
        ) : (
          <Link to="/" className="btn btn-ghost text-xl">
            Task Manager
          </Link>
        )}
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {login && (
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
            )}

            <li>
              {login ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
