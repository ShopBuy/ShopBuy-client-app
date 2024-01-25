import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Image from "../../../designLayouts/Image";
import {logo} from "../../../assets/images";
import {motion} from "framer-motion";
import {BiUser} from "react-icons/bi";
import {BsCart3} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {toast} from "react-toastify";
import Search from "../../../pages/Shop/Search";
import axios from "axios";


function Header() {
    const navigate = useNavigate();

    const [showAccount, setShowAccount] = useState(false);
    const [email, setEmail] = useState("");

    const token = localStorage.getItem("token");


    const handleAccountMouseEnter = () => {
        setShowAccount(true);
    };

    const handleAccountMouseLeave = () => {
        setShowAccount(false);
    };


    // ====== LOGIN ======
    const handleLogout = async () => {
        localStorage.removeItem("email");
        setEmail(null);
        localStorage.removeItem("token");

        setShowAccount(false);
        toast.success("Log Out successful!");
        setTimeout(() => {
            toast.dismiss();
        }, 3000);

        setTimeout(() => {
            navigate("/login");
        }, 4000);

    };
    // ====== CATEGORY ======

    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        // Thực hiện fetch categories nếu categories chưa được lấy
        if (categories.length === 0) {
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/categories');
                    setCategories(response.data.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };
            fetchCategories();
        }
        // Chỉ extract genders khi categories đã được lấy
        if (categories.length > 0 && genders.length === 0) {
            const uniqueGenders = Array.from(new Set(categories.map((category) => category.gender)));
            setGenders(uniqueGenders);
        }
    }, [categories, genders]); // Duy trì danh sách categories và genders


    const [selectedGender, setSelectedGender] = useState(null);
    const [showCategories, setShowCategories] = useState(false);


    const filteredCategories = selectedGender
        ? categories.filter(category => category.gender === selectedGender)
        : categories;

    // ====== SUBCATEGORY ======

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
        setSelectedCategory(null);
        setShowCategories(!showCategories);
        setSubCategories([]);
    };


    const handleCategoryClick = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/subCategories/${categoryId}`);
            setSubCategories(response.data.data);
            setSelectedCategory(categoryId);
            setShowCategories(true);
        } catch (error) {
            console.error('Error fetching subCategories:', error);
        }
    };

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const handleSubCategoryClick = async (subCategoryId) => {
        try {
            // Gọi API để lấy danh sách sản phẩm dựa trên subCategoryId
            const response = await axios.get(`http://localhost:8080/api/products/subCategory/${subCategoryId}`);
            setProducts(response.data.data);
            setSelectedSubCategory(subCategoryId);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">

            <nav className="h-full px-4 max-w-container mx-auto relative flex items-center justify-between ">

                <div className="flex items-center">
                    <Link to="/">
                        <div className="flex items-center">
                            <Image className="w-10 object-cover" imgSrc={logo} alt="Logo"/>
                        </div>
                    </Link>
                </div>


                <div className="flex items-center ">

                    <div className="relative ml-4">
                        <ul style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: 0,
                            margin: 0,
                            listStyle: 'none'
                        }}>
                            {[...genders].map((gender, index) => (
                                <li key={gender}
                                    style={{marginRight: index < genders.length - 1 ? '25px' : 0}}
                                    className="transition-transform transform hover:scale-125 "
                                >
                            <span
                                className={`cursor-pointer font-bold text-black hover:text-red-500
                                ${gender === selectedGender ? 'text-black-500 hover:translate-x-5' : ''}`}
                                onClick={() => handleGenderClick(gender)}
                            >
                                {gender}
                            </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{marginRight: "15px"}}>
                        <Link to="/shopbuy" className="ml-4 text-black font-bold hover:text-red-500
                              block p-2 rounded-md transition-transform transform hover:scale-125 "
                        >  TẤT CẢ
                        </Link>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center"></div>

                <div className="flex items-center">
                    {/* Account on the right */}
                    <Search/>
                    <div
                        style={{marginRight: "15px"}}
                        className="relative ml-4"
                        onMouseEnter={handleAccountMouseEnter}
                        onMouseLeave={handleAccountMouseLeave}
                    >
                      <span className="cursor-pointer font-semibold text-gray-700 hover:text-red-500">
                        <Link to="/login">
                          {/*trang user*/}
                            <BiUser className="text-black hover:text-red-500"
                                    style={{fontSize: "25px", color: "black"}}></BiUser>
                        </Link>
                      </span>

                        {showAccount && (
                            <motion.ul
                                initial={{y: 30, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{duration: 0.5}}
                                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                            >
                                {token ? (
                                    <>
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
                                )}
                            </motion.ul>
                        )}
                    </div>

                    <div style={{marginRight: "15px"}}>
                        <Link to="#">
                            <AiOutlineHeart className="text-black hover:text-red-500"
                                            style={{fontSize: "25px", color: "black"}}/>
                        </Link>
                    </div>

                    <div style={{marginRight: "20px"}}>
                        <Link to="#">
                            <BsCart3 className="text-black hover:text-red-500"
                                     style={{fontSize: "25px", color: "black"}}/>
                        </Link>
                    </div>
                </div>
            </nav>


            {showCategories && (
                <div className="ml-15 max-w-container mx-auto relative flex shadow shadow-red-500 ">
                    {/* Category  */}
                    <div className="flex-1 bg-gray-100 pr-4 ">
                        <ul>
                            {filteredCategories.map(category => (
                                <li key={category.id} className="group">
                        <span
                            className={`block p-2 rounded-md transition-transform transform hover:text-red-500 hover:font-bold hover:scale-102 hover:translate-x-2
                                    ${category.id === selectedCategory ? 'text-red-500 font-bold' : ''}`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.name}
                        </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subcategory  */}
                    {selectedCategory && (
                        <div className="flex-1 bg-gray-100 pl-4 shadow shadow-red-500">
                            {/*<br/>*/}
                            {/*<p className="text-xl font-bold mb-2">{selectedCategory.name}</p>*/}
                            <ul>
                                {subCategories.map(subcategory => (
                                    <li key={subcategory.id} className="group">
                            <span
                                className="block p-2 rounded-md transition-transform transform hover:text-red-500 hover:font-bold hover:scale-105 hover:translate-x-5"
                                onClick={() => {
                                    handleSubCategoryClick(subcategory.id);
                                }}
                            >
                                {subcategory.name}
                            </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default Header
