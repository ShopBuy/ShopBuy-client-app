import React from 'react'
import {Link, useNavigate} from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const getProfile = () => {
    navigate("/profile");
  };

  return (

    <div className="container mx-auto py-8 w-1/2">
      <h1 className="text-3xl font-semibold mb-4">PROFILE SETTINGS</h1>

      <div className="flex">
        <div className="w-1/4 pr-4 lg:pr-0">
          <h6 className="text-xs font-semibold mb-2">Membership</h6>
          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="/profile">
              <p> Profile </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> Coupons </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> Purchase history </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> Order history </p>
            </Link>
          </p>


          <h6 className="text-xs font-semibold mb-2">Profile settings</h6>
          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="/edit-profile">
              <p className="text-red-500"> Edit profile </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> Address book </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> Push notifications and privacy settings </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="/password-profile">
              <p> Change password </p>
            </Link>
          </p>

          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="#">
              <p> My cards </p>
            </Link>
          </p>

        </div>

        <div className="w-3/4 pl-4 border-red-500 lg:pl-0 lg:max-w-2xl ">
          <div className="bg-white shadow shadow-red-500 p-6 mb-4 ">
            <h1 className="text-2xl font-semibold mb-4">EDIT PROFILE</h1>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                EMAIL ADDRESS
              </p>
              <input
                // onChange={handleEmail}
                // value={email}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                type="email"
                placeholder="nguyentien606868@gmail.com"
              />

            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                FULL NAME <span className="text-red-500"> *</span>
              </p>
              <input
                // onChange={handleEmail}
                // value={email}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type="email"
                placeholder="Nguyễn Tiến"
              />
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                BIRTHDAY <span className="text-red-500"> *</span>
              </p>
              <input
                // onChange={handleEmail}
                // value={email}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type="email"
                placeholder="01/01/1999"
              />
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                GENDER
              </p>
              <input
                // onChange={handleEmail}
                // value={email}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type="email"
                placeholder="Male or Female"
              />
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                MOBILE PHONE<span className="text-red-500"> *</span>
              </p>
              <input
                // onChange={handleEmail}
                // value={email}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type="email"
                placeholder="0123456789"
              />
            </div>
            <br/>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={getProfile}
                className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
              > CANCEL
              </button>
              &nbsp;
              <button
                className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
              > UPDATE PROFILE
              </button>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
}

export default Profile
