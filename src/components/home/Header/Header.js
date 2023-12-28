import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Image from "../../../designLayouts/Image";
import {logo} from "../../../assets/images";
import {motion} from "framer-motion";
import {BiUser} from "react-icons/bi";
import {BsCart3} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {IoSearchOutline} from "react-icons/io5";
import {toast} from "react-toastify";

function Header() {
  const navigate = useNavigate();

  const [showWomen, setShowWomen] = useState(false);
  const [showMen, setShowMen] = useState(false);
  const [showKids, setShowKids] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  const handleWomenMouseEnter = () => {
    setShowWomen(true);
  };

  const handleWomenMouseLeave = () => {
    setShowWomen(false);
  };

  const handleMenMouseEnter = () => {
    setShowMen(true);
  };

  const handleMenMouseLeave = () => {
    setShowMen(false);
  };

  const handleKidsMouseEnter = () => {
    setShowKids(true);
  };

  const handleKidsMouseLeave = () => {
    setShowKids(false);
  };

  const handlePagesMouseEnter = () => {
    setShowPages(true);
  };

  const handlePagesMouseLeave = () => {
    setShowPages(false);
  };


  const handleAccountMouseEnter = () => {
    setShowAccount(true);
  };

  const handleAccountMouseLeave = () => {
    setShowAccount(false);
  };



  const handleLogout = async () => {
    localStorage.removeItem("email");
    setEmail(null);
    localStorage.removeItem("token");
    // localStorage.removeItem("role");
    // localStorage.removeItem("id");

    setShowAccount(false);
    toast.success( "Log Out successful!" );
    setTimeout(() => {
      toast.dismiss();
    }, 3000);

    setTimeout(() => {
      navigate("/login");
    }, 4000);

  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative flex items-center justify-between">

        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <Image className="w-10 object-cover" imgSrc={logo} alt="Logo"/>
            </div>
          </Link>
        </div>


        <div className="flex items-center">
          <div
            className="relative ml-4"
            onMouseEnter={handleWomenMouseEnter}
            onMouseLeave={handleWomenMouseLeave}
          >
            <span className="cursor-pointer font-bold text-black hover:text-red-500">
              WOMEN
            </span>

            {showWomen && (
              <motion.ul
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Women1
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Women2
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Women3
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Women4
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>


          <div
            className="relative ml-4"
            onMouseEnter={handleMenMouseEnter}
            onMouseLeave={handleMenMouseLeave}
          >
            <span className="cursor-pointer font-bold text-black hover:text-red-500">
              MEN
            </span>

            {showMen && (
              <motion.ul
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Men1
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Men2
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Men3
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Men4
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>

          <div
            className="relative ml-4"
            onMouseEnter={handleKidsMouseEnter}
            onMouseLeave={handleKidsMouseLeave}
          >
            <span className="cursor-pointer font-bold text-black hover:text-red-500">
              KIDS
            </span>

            {showKids && (
              <motion.ul
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Kids1
                  </li>
                </Link>

                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Kids2
                  </li>
                </Link>
                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Kids3
                  </li>
                </Link>
                <Link to="#">
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Kids4
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
          <div style={{ marginRight: "15px" }}>
            <Link to="/shop" className="ml-4 text-black font-bold hover:text-red-500">
              SHOP
            </Link>
          </div>


        </div>

        <div className="flex-grow flex items-center justify-center"> </div>

        <div className="flex items-center">
          {/* Account on the right */}
          <div style={{ marginRight: "10px" }}>
            <Link to="#">
              <IoSearchOutline className="text-black hover:text-red-500" style={{ fontSize: "25px", color: "black" }} />
            </Link>
          </div>
          <div
            style={{ marginRight: "15px" }}
            className="relative ml-4"
            onMouseEnter={handleAccountMouseEnter}
            onMouseLeave={handleAccountMouseLeave}
          >
      <span className="cursor-pointer font-semibold text-gray-700 hover:text-red-500">
        <Link to="/login">
          {/*trang user*/}
          <BiUser className="text-black hover:text-red-500" style={{ fontSize: "25px", color: "black" }}></BiUser>
        </Link>
      </span>

            {showAccount && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {token ? (
                  <>
                    {/* Hiển thị các liên kết khi có token */}
                    <Link to="/profile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>

                    <Link to="/password-profile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Password
                      </li>
                    </Link>

                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      <Link to="/login" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Hiển thị các liên kết khi không có token */}
                    <Link to="/login">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>

                    <Link to="/signup">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Signup
                      </li>
                    </Link>
                  </>
                )
                }
              </motion.ul>
            )}
          </div>


          <div style={{ marginRight: "15px" }}>
            <Link to="#">
              <AiOutlineHeart className="text-black hover:text-red-500" style={{ fontSize: "25px", color: "black" }} />
            </Link>
          </div>

          <div style={{ marginRight: "20px" }}>
            <Link to="#">
              <BsCart3 className="text-black hover:text-red-500" style={{ fontSize: "25px", color: "black" }} />
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
}


export default Header
