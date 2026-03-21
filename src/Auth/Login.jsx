import React from "react";

const Login = () => {
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
        <form method="POST" action="#" className="space-y-6">
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              required
              id="email"
              name="email"
              type="email"
            />
            <label
              className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
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
          <button
            className="w-full py-2 px-4 bg-brand hover:bg-blue-600 rounded-md shadow-lg text-white border-white border cursor-pointer font-semibold transition duration-200"
            type="submit"
          >
            Log In
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
