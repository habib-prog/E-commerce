import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useLazyGetCurrentUserQuery,
  useLoginUserMutation,
} from "../API/apiSlice";
import { setCredentials } from "../Store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const [formData, setFormData] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const loginResponse = await loginUser({
        username: formData.username,
        password: formData.password,
        expiresInMins: 30,
      }).unwrap();

      const currentUser = await getCurrentUser(loginResponse.accessToken).unwrap();

      dispatch(
        setCredentials({
          user: currentUser,
          accessToken: loginResponse.accessToken,
        }),
      );

      navigate("/");
    } catch (error) {
      setErrorMessage(error?.data?.message ?? "Login failed. Try again.");
    }
  };

  return (
    <div className="sm:py-4 px-4 py-18">
      <div
        style={{ animation: "slideInFromLeft 1s ease-out" }}
        className="max-w-md mx-auto  w-full bg-brand rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
      >
        <h2
          style={{ animation: "appear 2s ease-out" }}
          className="text-center text-4xl font-extrabold text-white"
        >
          Welcome
        </h2>
        <p
          style={{ animation: "appear 3s ease-out" }}
          className="text-center text-white"
        >
          Sign in to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              placeholder="Username"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              required
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
              htmlFor="username"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              required
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                type="checkbox"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a className="text-sm text-white hover:underline" href="#">
              Forgot your password?
            </a>
          </div>
          {errorMessage ? (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
              {errorMessage}
            </p>
          ) : null}
          <button
            className="w-full py-2 px-4 bg-brand hover:bg-blue-600 rounded-md shadow-lg text-white border-white border cursor-pointer font-semibold transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="text-center  text-gray-300">
          Don't have an account?
          <a className="text-white ml-2 hover:underline" href="#">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
