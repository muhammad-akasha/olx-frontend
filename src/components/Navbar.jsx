"use client";

import Car from "../svg-components/Car";
import Floor from "../svg-components/Floor";
import Logo from "../svg-components/Logo";
import React, { useEffect, useState } from "react";
import LocationDropdown from "./LocationDropdown";
import SearchInp from "./SearchInp";
import { FaPlus } from "react-icons/fa";
import SellFrame from "./SellBtnFrame";
import LoginBtn from "./LoginBtn";
import { useNav } from "../Contexts/NavbarContext";
import AddNav from "./AddNav";
import SecondNav from "./SecondNav";
import Link from "next/link";
import { usePathname } from "next/navigation"; // New import
import axios from "axios";
import { useModal } from "../Contexts/AuthModalContext";
import { useAuthenticate } from "../Contexts/UserContext";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { CiMemoPad } from "react-icons/ci";

const Navbar = () => {
  const { setIsOpenModal } = useModal();
  const pathname = usePathname(); // Get the current path
  const noRouteNav = ["/addpost", "/addpost/createadd"]; // Define routes where navbar shouldn't show
  const { setHomeNav } = useNav() || {}; // Ensure context exists

  // Check if the current route is in noRouteNav
  const showNavbar = noRouteNav.includes(pathname);
  const { isLogin, setIsLogin } = useAuthenticate();
  const [loading, setLoading] = useState(true); // Loading state
  const [hide, show] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "https://parallel-anglerfish-akasha-6ad22695.koyeb.app/refreshtoken",
        {},
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    setLoading(true);
    axios
      .post(
        "https://parallel-anglerfish-akasha-6ad22695.koyeb.app/getuser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setIsLogin(res.data.user);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Access token is expired, refresh it
          console.log("Access token expired. Trying to refresh...");
          refreshToken();
        }
        console.log(err);
        setIsLogin("");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    refreshToken();
    if (showNavbar) {
      setHomeNav(false);
    } else {
      setHomeNav(true);
    }
    if (!isLogin) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [showNavbar]);

  const handleAddPost = () => {
    if (!isLogin) {
      setIsOpenModal(true);
    }
  };
  const logout = () => {
    axios
      .post(
        "https://parallel-anglerfish-akasha-6ad22695.koyeb.app/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setIsLogin("");
      })
      .catch((err) => console.log(err));
  };

  return !showNavbar ? (
    <>
      <header className="px-1 md:px-8 py-[14px] bg-white sticky top-0 z-20">
        <div className="flex gap-2 md:gap-4 lg:gap-10 items-center">
          <div>
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-custom-gradient p-2 rounded-full">
              <Car />
            </div>
            <h3 className="font-semibold cursor-pointer">Motors</h3>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-custom-gradient p-2 rounded-full">
              <Floor />
            </div>
            <h3 className="font-semibold cursor-pointer">Property</h3>
          </div>
        </div>
        <div className="mt-6 flex gap-4 items-center flex-wrap">
          <LocationDropdown />
          <div className="flex-1">
            <SearchInp />
          </div>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !isLogin ? (
            <LoginBtn />
          ) : (
            <div
              className="flex gap-1 items-center relative"
              onClick={() => show(!hide)}
            >
              <img
                className="rounded-full w-12 h-12"
                width={40}
                height={40}
                src={isLogin.profilePicture || "/iconProfilePicture.png"}
                alt="profilepicture"
              />
              <IoIosArrowDown
                className={`transform ${
                  hide && "rotate-180"
                } transition-all delay-75 `}
                fontSize={18}
              />
              {hide && (
                <div className="absolute top-10 bg-[#f9f9f9] shadow-lg w-[288px] right-0 h-22">
                  <div className="p-4">
                    <div className="flex gap-4 items-center">
                      <div>
                        <img
                          className="rounded-full w-14 h-14"
                          src={
                            isLogin.profilePicture || "/iconProfilePicture.png"
                          }
                          alt="profilepicture"
                        />
                      </div>
                      <div>
                        <h4>Hello,</h4>
                        <h2 className="font-semibold">{isLogin.fullName}</h2>
                      </div>
                    </div>
                    <Link href={"/editprofile"}>
                      <div className="border-2 border-black hover:border-4 h-[2.2rem] flex justify-center items-center mt-4 mb-2 rounded-md">
                        <button className="btn btn-ghost hover:outline-none hover:bg-transparent">
                          View and edit your profile
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t-2 border-[#ced6d7] p-4">
                    <Link href="/myads">
                      <h2 className="flex gap-2 cursor-pointer">
                        <CiMemoPad fontSize={22} />
                        MyAds
                      </h2>
                    </Link>

                    <h2
                      className="flex gap-2 cursor-pointer mt-2"
                      onClick={logout}
                    >
                      <CiLogout fontSize={22} />
                      Logout
                    </h2>
                  </div>
                </div>
              )}
            </div>
          )}
          <Link
            href={`${isLogin ? "/addpost" : "/"}`}
            className={!isLogin ? `cursor-not-allowed` : "cursor-pointer"}
            onClick={handleAddPost}
          >
            <div className="relative">
              <SellFrame />
              <h5 className="flex items-center gap-2 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <FaPlus /> Sell
              </h5>
            </div>
          </Link>
        </div>
      </header>
      <SecondNav />
    </>
  ) : (
    <AddNav />
  );
};

export default Navbar;
