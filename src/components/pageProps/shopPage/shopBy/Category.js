import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      title: "ÁO-NỮ",
      icons: true,
    },
    {
      _id: 991,
      title: "QUẦN-NỮ",
    },
    {
      _id: 992,
      title: "ĐẦM & VÁY-NỮ",
      icons: true,
    },
    {
      _id: 993,
      title: "MẶC NHÀ-NỮ",
    },
    {
      _id: 994,
      title: "MẶC NGOÀI-NỮ",
    },
    {
      _id: 995,
      title: "ÁO-NAM",
    },
    {
      _id: 996,
      title: "QUẦN-NAM",
    },
    {
      _id: 997,
      title: "MẶC NHÀ-NAM",
    },
    {
      _id: 998,
      title: "MẶC NGOÀI-NAM",
    },
    {
      _id: 999,
      title: "ÁO-TRẺ",
    },
    {
      _id: 100,
      title: "QUẦN-TRẺ",
    },
    {
      _id: 101,
      title: "MẶC NHÀ-TRẺ",
    },
    {
      _id: 102,
      title: "MẶC NGOÀI-TRẺ",
    },
  ];
  return (
    <div className="w-full ">
      <NavTitle title="Tìm Danh mục" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {title}
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  {/*<ImPlus />*/}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
