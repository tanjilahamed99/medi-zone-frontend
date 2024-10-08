"use client";

import Image from "next/image";
import logo from "../../../public/images/navbar/web-logo.png";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import AuthModal from "./AuthModal";
import MyCartModal from "./MyCartModal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: user } = useSession();
  const path = usePathname();

  const handleClick = () => {
    window.location.href = "mailto:tanjil.ahamed0199@gmail.com";
  };

  return (
    <div className="">
      {/* navbar row 1 */}
      <div className="navbar">
        {/* row - 1 */}
        <div className="navbar-start gap-2 items-center lg:w-1/3">
          <Image src={logo} alt="logo" className=" h-10 w-10 lg:h-16 lg:w-16" />
          <div className="">
            <Link
              href={"/"}
              className="lg:text-2xl md:leading-3 font-semibold text-primary-text"
            >
              MEDIZONE
            </Link>
            <h4 className="md:font-medium text-primary-text text-sm md:text-base">
              SAFE LIFE
            </h4>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex lg:w-1/3">
          <label className="input input-bordered flex items-center gap-2 rounded-full">
            <input type="text" className="grow " placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="navbar-end lg:w-1/3 flex items-center xl:justify-between">
          <h2
            onClick={handleClick}
            className="cursor-pointer text-primary-text hidden xl:inline"
          >
            tanjil.ahamed0199@gmail.com
          </h2>
          <div className="flex items-center gap-4 lg:gap-5">
            <AuthModal />
            <MyCartModal />

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="">
                <FaBars className="lg:hidden text-xl" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-32 p-4 shadow flex flex-col gap-2"
              >
                <Link className="hover:underline" href={"/"}>
                  <li>Home</li>
                </Link>
                <Link className="hover:underline" href={"/shop"}>
                  {" "}
                  <li>SHOP</li>
                </Link>
                <Link className="hover:underline" href={"/"}>
                  <li>BLOG</li>
                </Link>
                {user?.user?.role === "admin" ||
                user?.user?.role === "superAdmin" ? (
                  <Link className="hover:underline" href={"/dashboard"}>
                    <li>Dashboard</li>
                  </Link>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="border my-4 hidden lg:block w-full" />

      {/* navbar row 2 */}
      {path !== "/dashboard" && (
        <div className="hidden lg:flex justify-between items-center lg:px-2 xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-primary-text text-lg">
              Categories
            </h2>
            <FaBars className="cursor-pointer" />
          </div>
          {/* nav links */}
          <div>
            <ul className="flex items-center gap-5 text-primary-text font-semibold">
              <Link className="hover:underline" href={"/"}>
                <li>Home</li>
              </Link>
              <Link className="hover:underline" href={"/shop"}>
                {" "}
                <li>SHOP</li>
              </Link>
              <Link className="hover:underline" href={"/"}>
                {" "}
                <li>BLOG</li>
              </Link>
              {user?.user?.role === "admin" ||
              user?.user?.role === "superAdmin" ? (
                <Link className="hover:underline" href={"/dashboard"}>
                  <li>Dashboard</li>
                </Link>
              ) : (
                ""
              )}
            </ul>
          </div>
          <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg">
            Contact US
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
