import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {SHOPBUY_API} from "../../constants/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {storage} from "../../config/firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {Avatar} from "antd";
import { v4 as uuidv4 } from 'uuid';

function EditProfile() {
    const [user, setUser] = useState(
        {
            fullName: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            profileImageUrl: "",
        }
    );
    const navigate = useNavigate();

    const fetchUserDetail = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${SHOPBUY_API}/users/profile`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const updateUserProfile = async () => {
        const token = localStorage.getItem("token");
        try {

            const response = await axios.put(
                `${SHOPBUY_API}/users/update-profile`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTimeout(() => {
                navigate('/profile');
            }, 2000);

            // setEditMode(false);
            toast.success(response.data.message || "Update profile successfully !");

            setTimeout(() => {
                toast.dismiss();
            }, 2000);


        } catch (error) {
            toast.error(error.response.data.message || "Failed to update profile.");
            console.error('Error updating user profile:', error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        updateUserProfile();
    };

    const getProfile = () => {
        navigate("/profile");
    };


    const [image, setImage] = useState(null);
    const [imageDefault,setImageDefault] = useState(null);
    useEffect(() => {
        if(user !== null){
            setImageDefault(user.profileImageUrl);
        }
        console.log("a",imageDefault)
        if(image !== null){
            setImageDefault(image);
           setUser((prevUser) => ({ ...prevUser, profileImageUrl: image }));
           setImage(null);
        }

    });
    const handleImageChange = (e) => {

        console.log("a",imageDefault)

        const imageRef = ref(storage, `image_${uuidv4()}`);
        uploadBytes(imageRef, e.target.files[0]).then(() => {
            getDownloadURL(imageRef).then((url) => {
                 setImage(url)
                console.log("a",imageDefault)
            }).catch(error => {
                console.log(error.message, " error getting the image url")
            });
            // setImage(null);
        }).catch(error => {
            console.log(error.message);
        });
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

                        <div className="flex flex-col items-center ">
                            <img
                                src={imageDefault}
                                alt="Profile Image"
                                className="w-[250px] h-[250px] object-cover rounded-full mb-2"
                            />

                            <input
                                type={"file"}
                                onChange={handleImageChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal   p-2   "
                            />

                        </div>
                        <br/>

                        {/*<div className="flex flex-col  ">*/}
                        {/*    <p className="font-titleFont text-base font-semibold">*/}
                        {/*        LINK URL DATABASE*/}
                        {/*    </p>*/}
                        {/*    <input                         */}
                        {/*    value={user?.profileImageUrl}*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*    className="w-full h-10 px-4 text-base font-medium outline-none bg-gray-100 p-2 border-b border-blue-500"*/}
                        {/*    type="profileImageUrl"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<br/>*/}


                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                FULL NAME
                            </p>
                            <input
                                name="fullName"
                                value={user?.fullName}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="fullName"
                            />
                        </div>
                        <br/>

                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                BIRTHDAY
                            </p>
                            <input
                                name="dateOfBirth"
                                value={user?.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="date"
                            />
                        </div>
                        <br/>

                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                GENDER
                            </p>
                            <select
                                name="gender"
                                onChange={handleInputChange}
                                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            >
                                <option value="" disabled>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <br/>

                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                MOBILE PHONE
                            </p>
                            <input
                                name="phoneNumber"
                                value={user?.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="text"
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
                                type="button"
                                onClick={handleSaveChanges}
                                className="bg-black hover:bg-red-600 text-white hover:text-white cursor-pointer w-1/2 text-base font-medium h-10 duration-300"
                            > SAVE
                            </button>
                        </div>

                    </div>
                    <ToastContainer/>
                </div>


            </div>
        </div>
    );
}

export default EditProfile
