import React, {useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {logoLight} from "../../assets/images";
import authApi from "../../api/authApi/exportAuthApi";

const Register = () => {
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setgender] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [checked, setChecked] = useState(false);
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errgender, setErrgender] = useState("");
    const [errdateOfBirth, setErrdateOfBirth] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const handleName = (e) => {
        setClientName(e.target.value);
        setErrClientName("");
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
        setErrPhone("");
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    };
    const handlegender = (e) => {
        setgender(e.target.value);
        setErrgender("");
    };
    const handledateOfBirth = (e) => {
        setdateOfBirth(e.target.value);
        setErrdateOfBirth("");
    };
    const EmailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        if (checked) {
            if (!clientName) {
                setErrClientName("Enter your name");
            }
            if (!email) {
                setErrEmail("Enter your email");
            } else {
                if (!EmailValidation(email)) {
                    setErrEmail("Enter a Valid email");
                }
            }
            if (!phone) {
                setErrPhone("Enter your phone number");
            }
            if (!password) {
                setErrPassword("Create a password");
            } else {
                if (password.length < 6) {
                    setErrPassword("Passwords must be at least 6 characters");
                }
            }
            if (!gender) {
                setErrgender("Enter your gender");
            }
            if (!phone) {
                setErrPhone("Enter your city name");
            }
            if (!dateOfBirth) {
                setErrdateOfBirth("Enter the dateOfBirth you are residing");
            }
            fetchRegister();
            // ============== Getting the value ==============
            // if (clientName && email && EmailValidation(email) && password && password.length >= 6 && gender && phone && dateOfBirth) {
            //     fetchRegister();
            // }
        }
    };
    const fetchRegister = async () => {

        const userData = {
            fullName: clientName,
            email: email,
            password: password,
            gender: gender,
            phoneNumber: phone,
            dateOfBirth: dateOfBirth,
        };
        try {
            const response = await authApi.register(userData);
            if (response.data != null) {
                console.log("Registration successful:", response.data);
                setSuccessMsg(`Hello dear ${clientName}, 
          Welcome you to OREBI Admin panel. We received your Sign up request. 
          We are processing to validate your access. 
          Till then stay connected and additional assistance will be sent to you by your mail at ${email}`);
                setTimeout(() => {
                    navigate("/login");
                }, 3000)
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    return (
        <div className="w-full h-screen flex items-center justify-start">
            <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
                <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
                    <Link to="/">
                        <img src={logoLight} alt="logoImg" className="w-28"/>
                    </Link>
                    <div className="flex flex-col gap-1 -mt-1">
                        <h1 className="font-titleFont text-xl font-medium">
                            Get started for free
                        </h1>
                        <p className="text-base">Create your account to access more</p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
                        <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
                            <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            © OREBI
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Terms
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Privacy
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Security
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
                {successMsg ? (<div className="w-[500px]">
                    <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                        {successMsg}
                    </p>
                    <Link to="/login">
                        <button
                            className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold
            tracking-wide hover:bg-black hover:text-white duration-300"
                        >
                            Sign in
                        </button>
                    </Link>
                </div>) : (<form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
                    <div
                        className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                        <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                            Create your account
                        </h1>
                        <div className="flex flex-col gap-3">
                            {/* client name */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    Full Name
                                </p>
                                <input
                                    onChange={handleName}
                                    value={clientName}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="text"
                                    placeholder="eg. John Doe"
                                />
                                {errClientName && (
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <span className="font-bold italic mr-1">!</span>
                                        {errClientName}
                                    </p>)}
                            </div>
                            {/* Email */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    Work Email
                                </p>
                                <input
                                    onChange={handleEmail}
                                    value={email}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="email"
                                    placeholder="john@workemail.com"
                                />
                                {errEmail && (<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {errEmail}
                                </p>)}
                            </div>
                            {/* Password */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    Password
                                </p>
                                <input
                                    onChange={handlePassword}
                                    value={password}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="password"
                                    placeholder="Create password"
                                />
                                {errPassword && (
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <span className="font-bold italic mr-1">!</span>
                                        {errPassword}
                                    </p>)}
                            </div>
                            {/* gender */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    GENDER
                                </p>
                                <input
                                    onChange={handlegender}
                                    value={gender}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="text"
                                    placeholder="Male and Female"
                                />
                                {errgender && (
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <span className="font-bold italic mr-1">!</span>
                                        {errgender}
                                    </p>)}
                            </div>
                            {/* City */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    PHONE NUMBER
                                </p>
                                <input
                                    onChange={handlePhone}
                                    value={phone}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="number"
                                    placeholder="Phone Number"
                                />
                                {errPhone && (<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                    <span className="font-bold italic mr-1">!</span>
                                    {errPhone}
                                </p>)}
                            </div>
                            {/* dateOfBirth
                 */}
                            <div className="flex flex-col gap-.5">
                                <p className="font-titleFont text-base font-semibold text-gray-600">
                                    DATE BIRTH
                                </p>
                                <input
                                    onChange={handledateOfBirth}
                                    value={dateOfBirth}
                                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                    type="date"
                                    placeholder="Your Birth"
                                />
                                {errdateOfBirth && (
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <span className="font-bold italic mr-1">!</span>
                                        {errdateOfBirth}
                                    </p>)}
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-start mdl:items-center gap-2">
                                <input
                                    onChange={() => setChecked(!checked)}
                                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                                    type="checkbox"
                                />
                                <p className="text-sm text-primeColor">
                                    I agree to the SHOPBUY{" "}
                                    <span className="text-blue-500">Terms of Service </span>and{" "}
                                    <span className="text-blue-500">Privacy Policy</span>.
                                </p>
                            </div>
                            <button
                                onClick={handleSignUp}
                                className={`${checked ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer" : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                                type="button"
                            >
                                Create Account
                            </button>
                            <p className="text-sm text-center font-titleFont font-medium">
                                Don't have an Account?{" "}
                                <Link to="/login">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>)}
            </div>
        </div>);
};

export default Register;
