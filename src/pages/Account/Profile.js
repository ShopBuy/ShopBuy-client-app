import React from 'react'
import {Link} from "react-router-dom";

function Profile() {

  return (

    <div className="container mx-auto py-8 w-1/2">
      <h1 className="text-3xl font-semibold mb-4">PROFILE SETTINGS</h1>

      <div className="flex">
        <div className="w-1/4 pr-4 lg:pr-0">
          <h6 className="text-xs font-semibold mb-2">Membership</h6>
          <p className="hover:text-red-500 text-xs  mb-2">
            <Link to="/profile">
              <p className="text-red-500"> Profile </p>
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
            <h1 className="text-2xl font-semibold mb-4">PROFILE</h1>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                EMAIL ADDRESS
              </p>
              <p className="bg-gray-100 p-2 border-b border-blue-500">nguyentien606868@gmail.com</p>
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                FULL NAME
              </p>
              <p className="bg-gray-100 p-2 border-b border-blue-500">Nguyễn Tiến</p>
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                BIRTHDAY
              </p>
              <p className="bg-gray-100 p-2 border-b border-blue-500">01/01/1999</p>
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                GENDER
              </p>
              <p className="bg-gray-100 p-2 border-b border-blue-500">Male</p>
            </div>
            <br/>

            <div className="flex flex-col">
              <p className="font-titleFont text-base font-semibold">
                MOBILE PHONE
              </p>
              <p className="bg-gray-100 p-2 border-b border-blue-500">0123456789</p>
            </div>
            <br/>
            <div>
            <Link to="/edit-profile">
            <button
              className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
            > EDIT PROFILE
            </button>
            </Link>
            </div>

          </div>
        </div>


      </div>
    </div>
);
}
export default Profile
