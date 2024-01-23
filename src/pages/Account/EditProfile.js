import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {SHOPBUY_API} from "../../constants/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {storage} from "../../config/firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

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
            toast.success(response.data.message || "Cập nhật thông tin tài khoản thành công.");

            setTimeout(() => {
                toast.dismiss();
            }, 2000);


        } catch (error) {
            toast.error(error.response.data.message || "Cập nhật thông tin tài khoản không hợp lệ.");
            console.error('LỖI CẬP NHẬT TAI KHOẢN:', error);
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
        if (!isValidatePhoneNumber) {
            toast.error("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số hợp lệ.");
            return;
        }
        if (!isValidateFullName) {
            toast.error("Tên đầy đủ không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        if (!isValidateDateOfBirth) {
            toast.error("Ngày sinh không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }

        updateUserProfile();
    };

    const getProfile = () => {
        navigate("/profile");
    };

    // ===== UPDATE AVATA PROFILE  =====

    const [image, setImage] = useState(null);
    const [imageDefault, setImageDefault] = useState(null);
    useEffect(() => {
        if (user !== null) {
            setImageDefault(user.profileImageUrl);
        }
        console.log("a", imageDefault)
        if (image !== null) {
            setImageDefault(image);
            setUser((prevUser) => ({...prevUser, profileImageUrl: image}));
            setImage(null);
        }

    });
    const handleImageChange = (e) => {

        console.log("a", imageDefault)

        const imageRef = ref(storage, `image_${uuidv4()}`);
        uploadBytes(imageRef, e.target.files[0]).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setImage(url)
                console.log("a", imageDefault)
            }).catch(error => {
                console.log(error.message, "Error getting the image url")
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    // ===== VALIDATE PROFILE =====

    const [isValidatePhoneNumber, setIsValidatePhoneNumber] = useState(true);
    useEffect(() => {
        const phoneNumberRegex = /^\d{10}$/;

        setIsValidatePhoneNumber(phoneNumberRegex.test(user.phoneNumber));
    }, [user.phoneNumber]);


    const [isValidateFullName, setIsValidateFullName] = useState(true);
    useEffect(() => {
        const fullNameRegex = /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{5,}$/u;

        setIsValidateFullName(fullNameRegex.test(user.fullName));
    }, [user.fullName]);


    const [isValidateDateOfBirth, setIsValidateDateOfBirth] = useState(true);
    useEffect(() => {
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        const isValidFormat = dateFormat.test(user.dateOfBirth);
        const isPastDate = new Date(user.dateOfBirth) < new Date();

        setIsValidateDateOfBirth(isValidFormat && isPastDate);
    }, [user.dateOfBirth]);

    return (

        <div className="container mx-auto py-8 w-1/2">
            <h1 className="text-3xl font-semibold mb-4">PROFILE SETTINGS</h1>

            <div className="flex">
                <div className="w-1/4 pr-4 lg:pr-0">
                    <p className="text-base font-semibold mb-2">Membership</p>
                    <p className="hover:text-red-500 text-base   mb-2">
                        <Link to="/profile">
                            <p> Profile </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="#">
                            <p> Coupons </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="#">
                            <p> Purchase history </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="#">
                            <p> Order history </p>
                        </Link>
                    </p>


                    <h6 className="text-base font-semibold mb-2">Profile settings</h6>
                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="/edit-profile">
                            <p className="text-red-500"> Edit profile </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="#">
                            <p> Address book </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="#">
                            <p> Privacy settings </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
                        <Link to="/password-profile">
                            <p> Change password </p>
                        </Link>
                    </p>

                    <p className="hover:text-red-500 text-base  mb-2">
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

                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                FULL NAME <span className="text-red-500">*</span>
                            </p>
                            <input
                                name="fullName"
                                value={user?.fullName}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="fullName"
                            />
                            {!isValidateFullName && (
                                <p className=" text-red-600">Vui lòng nhập trên 4 ký tự, không chứa ký tự đặc biệt,
                                    số.</p>
                            )}
                            {isValidateFullName && <p className="text-green-600">Tên đầy đủ hợp lệ !</p>}
                        </div>
                        <br/>

                        <div className="flex flex-col">
                            <p className="font-titleFont text-base font-semibold">
                                BIRTHDAY <span className="text-red-500">*</span>
                            </p>
                            <input

                                name="dateOfBirth"
                                value={user?.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="date"
                            />
                            {!isValidateDateOfBirth && (
                                <p className=" text-red-600">Vui lòng nhập đúng ngày, tháng, năm trong quá khứ</p>
                            )}
                            {isValidateDateOfBirth && <p className="text-green-600">Ngày sinh hợp lệ !</p>}

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
                                MOBILE PHONE <span className="text-red-500">*</span>
                            </p>
                            <input

                                name="phoneNumber"
                                value={user?.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal outline-none bg-gray-100 p-2 border-b border-blue-500 "
                                type="text"
                            />

                            {!isValidatePhoneNumber && (
                                <p className=" text-red-600">Vui lòng nhập đúng định dạng 10 số.</p>
                            )}
                            {isValidatePhoneNumber && <p className="text-green-600">Số điện thoại hợp lệ !</p>}

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
