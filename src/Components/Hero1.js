import React from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Hero1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Task Manager is a simple yet powerful tool to help you manage your
              tasks. With an easy-to-use interface, you can quickly add, edit
              and delete tasks. You can also filter tasks by status and search
              for specific tasks.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Login />
    </>
  );
};

export default Hero1;
