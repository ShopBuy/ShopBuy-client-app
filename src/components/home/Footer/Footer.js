import React, {useState} from "react";
import {motion} from "framer-motion";
import {FaFacebookF, FaGithub, FaLinkedin, FaYoutube} from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import {RiFacebookBoxFill} from "react-icons/ri";
import {FaInstagram} from "react-icons/fa6";
import {IoLogoTiktok} from "react-icons/io5";

  function Footer() {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-5 gap-10 ">

        <div className="col-span-1 ">
          <FooterListTitle title="About ShopBuy"/>
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-2">
              <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
                Information
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
                Store Locator
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
                Career
              </li>
            </ul>

          </div>
        </div>


        <div>
          <FooterListTitle title="Help"/>
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              FAQ
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Return Policy
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Privacy Policy
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Accessibility
            </li>
          </ul>
        </div>

        <div>
          <FooterListTitle title="Account"/>
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Membership
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">

              Profile
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Addresses
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300">
              Payment Options
            </li>
          </ul>
        </div>

        <div>
          <FooterListTitle title="E-Newsletter."/>
          <div className="flex flex-col gap-2">
            <p className=" font-titleFont text-base text-lightText hover:text-red-500  cursor-pointer duration-300 ">
              Sign up and be the first-in-the know about new arrivals, promotions, in-store events and more.
            </p>
            {subscription ? (
              <motion.p
                initial={{x: 20, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubscription}
                  className="bg-gray-600 text-white w-[80%] h-8 hover:bg-black hover:text-red-500 duration-300 text-base tracking-wide"
                >
                  SUBSCRIBE NOW
                </button>
              </div>
            )}

          </div>
        </div>

        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="SHOPBUY Social Account"/>
          <ul className="flex items-center gap-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <li
                className="w-7 h-7 bg-gray-500 text-gray-100 hover:text-black cursor-pointer text-lg rounded-none flex justify-center items-center hover:bg-gray-200 duration-300">
                <FaFacebookF/>
              </li>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <li
                className="w-7 h-7 bg-gray-500 text-gray-100 hover:text-black cursor-pointer text-lg rounded-none flex justify-center items-center hover:bg-gray-200 duration-300">
                <FaInstagram/>
              </li>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
            >
              <li
                className="w-7 h-7 bg-gray-500 text-gray-100 hover:text-black cursor-pointer text-lg rounded-none flex justify-center items-center hover:bg-gray-200 duration-300 ">
                <FaYoutube/>
              </li>
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
            >
              <li
                className="w-7 h-7 bg-gray-500 text-gray-100 hover:text-black cursor-pointer text-lg rounded-none flex justify-center items-center hover:bg-gray-200 duration-300">
                <IoLogoTiktok />
              </li>
            </a>


          </ul>
        </div>

      </div>
    </div>
  );
};

export default Footer;
