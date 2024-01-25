import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {paginationItems} from "../../constants";
import {findProductsByName} from "../../api/productApi/ProductApi";
import spfOne from "../../assets/images/products/specialOffer/spfOne.webp"

const Search = () => {
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const fetchSearch = async () => {
        const items = await findProductsByName(searchQuery.toLowerCase());
        if(items?.data != null){
            setFilteredProducts(items?.data);
            return;
        }
        setFilteredProducts([])
    }
    useEffect(() => {
        // const filtered = paginationItems.filter((item) =>
        //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        fetchSearch();
    }, [searchQuery]);
    console.log(filteredProducts);
    return (

        <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
                <div
                    className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                >
                    {searchQuery &&
                        filteredProducts.map((item) => (
                            <div
                                onClick={() =>
                                    navigate(
                                        `/product/${item?.id}`,
                                        {
                                            state: {
                                                item: item,
                                            },
                                        }
                                    ) &
                                    setShowSearchBar(true) &
                                    setSearchQuery("")
                                }
                                key={item?.id}
                                className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                            >
                                {/*<img className="w-24" src={spfOne} alt="productImg" />*/}
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-lg">
                                        {item?.name}
                                    </p>
                                    <p className="text-xs">{item?.description}</p>
                                    <p className="text-sm">
                                        Price:{" "}
                                        <span className="text-primeColor font-semibold">
                            ${item?.price}
                          </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Search;
