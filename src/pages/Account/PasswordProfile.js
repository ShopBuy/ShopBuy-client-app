import React from 'react'
import {Link} from "react-router-dom";

function ProfilePassword() {


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
            <Link to="#">
              <p> Edit profile </p>
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
            <Link to="#">
              <p className="text-red-500" > Change my password </p>
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
            <h1 className="text-2xl font-semibold mb-4">CHANGE MY PASSWORD</h1> <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                CURRENT PASSWORD<span className="text-red-500">*</span>
              </p>

              <input
                // onChange={handlePassword}
                // value={password}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal  outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type={showPassword ? 'text' : 'password'}
                placeholder="Demo123*"
              />
            </div>
            <p className="text-gray-600 text-xs  mb-2">
              Password must be at least 8 characters: uppercase, lowercase, number, special character.
            </p>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                NEW PASSWORD<span className="text-red-500">*</span>
              </p>

              <input
                // onChange={handlePassword}
                // value={password}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal  outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type={showPassword ? 'text' : 'password'}
                placeholder="New password"
              />

            </div>
            <p className="text-gray-600 text-xs  mb-2">
              Password must be at least 8 characters: uppercase, lowercase, number, special character.
            </p>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                CONFIRMATION PASSWORD <span className="text-red-500">*</span>
              </p>

              <input
                // onChange={handlePassword}
                // value={password}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal  outline-none bg-gray-100 p-2 border-b border-blue-500 "
                // type={showPassword ? 'text' : 'password'}
                placeholder="New password"
              />

            </div>
            <p className="text-gray-600 text-xs  mb-2">
              The confirmation password must be the same as the new password.
            </p>
            <br/>

            <button
              className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
            > CHANGE PASSWORD
            </button>

          </div>
        </div>


      </div>
    </div>
  );
}

export default ProfilePassword

