import React, {useState} from "react";
import {Link} from "react-router-dom";

  function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputEmail)) {
    setErrEmail("Email is not in correct format !");
    } else {
      setErrEmail(" ");
    }
  };
  const handlePassword = (e) => {
    const inputPassword =  e.target.value;
    setPassword(inputPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(inputPassword)) {
      setErrPassword("Password must be at least 8 characters: uppercase, lowercase, number, special character.");
    } else {
      setErrPassword("");
    }
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {
      setSuccessMsg(
        `Hello dear ${email}`
      );
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {successMsg ? (
        <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
          <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
            {successMsg}
          </p>
          <Link to="/signup">
            <button
              className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold
            tracking-wide hover:bg-black hover:text-white duration-300"
            > Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div
            className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1
              className="font-titleFont  underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4 text-red-500">
              LOGIN
            </h1>
            <p className="text-gray-600">Log in with your email address and password.
            </p>
            <br/>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email<span className="text-red-500">*</span>
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="demo@gmail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password<span className="text-red-500">*</span>
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Demo123*"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    {errPassword} !
                  </p>
                )}

              </div>
              <br/>

              <button
                onClick={handleSignUp}
                className="bg-black hover:bg-red-600 text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              > Login
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
