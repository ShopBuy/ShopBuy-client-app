import React, {useState} from "react";
import {Link} from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(inputPassword)) {
      setErrPassword("Password is not in correct format !");
    } else {
      setErrPassword("");
    }
  };
  const handleLogin = (e) => {
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

  const showPasswordText = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {successMsg ? (
        <div
          className="w-full lgl:w-[500px] h-full flex flex-col justify-center border border-gray-200 rounded-md shadow-md p-6">
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
        <form className="w-full lgl:w-[1200px]  flex items-center justify-center">

          <div
            className="grid grid-cols-2 gap-8 w-full h-[100%] p-4 border border-red-500 shadow-md overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <div className="col-span-1 relative">
              <h1
                className="font-titleFont underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4 ">
                LOGIN
              </h1>
              <p className="text-gray-600">Log in with your email address and password.</p>
              <br/>
              <div className="flex flex-col gap-3">

                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    EMAIL ADDRESS <span className="text-red-500">*</span>
                  </p>

                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
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
                    PASSWORD <span className="text-red-500">*</span>
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal  outline-none bg-gray-100 p-2 border-b border-blue-500 "
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Demo123*"
                  />
                  <p className="text-gray-600 text-xs  mb-2">
                    Password must be at least 8 characters: uppercase, lowercase, number, special character.
                  </p>
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errPassword}
                    </p>
                  )}
                </div>


                <div>
                  <input type="checkbox"
                         checked={showPassword}
                         onChange={showPasswordText}/>
                  <label htmlFor="checkbox"> Show my password</label>
                </div>

                <p className="text-sm  font-titleFont font-medium">
                  <Link to="/#">
                <span className="hover:text-red-500 duration-300">
                 TERMS OF USE
                </span>
                  </Link>
                </p>

                <p className="text-sm  font-titleFont font-medium">
                  <Link to="/#">
                <span className="hover:text-red-500 duration-300">
                 PRIVACY POLICY
                </span>
                  </Link>
                </p>

                <button
                  onClick={handleLogin}
                  className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
                > LOG IN
                </button>

                <p className="text-sm  font-titleFont font-medium">
                  <Link to="/#">
                <span className="hover:text-red-500 duration-300">
                 FORGOT YOUR PASSWORD?
                </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-span-1 relative">
              <div className="border-r border-gray-400 h-full absolute left-0 top-0"></div>
              <h1
                className="font-titleFont underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4 ml-4 ">
                CREATE AN ACCOUNT
              </h1>
              <p className="text-gray-600 ml-4 ">
                If you create an account, you can get personalized services like checking purchase history and getting
                discount coupons with your membership. Register today for free!
              </p><br/>

              <Link to="/signup">
                <button
                  className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300 ml-4"
                > CREATE ACCOUNT
                </button>
              </Link>
            </div>

          </div>
        </form>


      )}
    </div>


  );
};


export default Login;
