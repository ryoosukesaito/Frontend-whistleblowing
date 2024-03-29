import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/appAPI";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { error }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    //login Admin
    loginUser({ email, password }).then(({ data }) => {
      if (data) navigate("/api/user/reports");
      if (error) console.error(error.data.error);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="justify-center items-center bg-gray-scale-4 m-auto p-10 w-1/3 min-w-fit">
        <form onSubmit={handleLogin} id="login" className="">
          <div className="text-4xl flex justify-center items-center mb-24">
            <img
              src={`${process.env.PUBLIC_URL}/favicon.ico`}
              alt="Logo"
              className="h-10 w-10 mr-1.5"
            />
            <h1 className="">Whistleblowing</h1>
          </div>
          <h1 className=" text-main-color-1 text-3xl font-normal text-center mb-8">
            User
          </h1>
          <label htmlFor="email">
            Email
            <input
              className="border w-full py-3 px-3 mb-3"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="border w-full py-3 px-3 mb-5"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </label>

          <div className="mb-8 text-right underline underline-offset-auto">
            <button
              onClick={() => navigate("api/user/password/email")}
              className="underline hover:opacity-50"
            >
              Forgot password?
            </button>
          </div>
          {error && (
            <div className="text-center mb-5 text-red-600">
              {error.data.error}
            </div>
          )}
          <div className="text-center">
            <button
              className="rounded px-8 py-2 mb-12 cursor-pointer bg-main-color-1 hover:bg-gray-scale-3 text-white hover:text-main-color-1"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="text-main-color-1 text-center underline underline-offset-auto hover:opacity-50">
            <a href="api/user/register">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
