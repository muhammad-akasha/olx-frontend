"use client";
import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import Cards from "./Cards";
import { usePathname } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import { useUserAds } from "../Contexts/UserPublishedAdsContext";
import axios from "axios";

const SearchedCard = (item) => {
  const { myads, setMyads } = useUserAds();
  const pathname = usePathname();

  const deleteAd = async () => {
    const index = item.index;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://olx-nu-gilt.vercel.app/api/v1/deleteAd/${item.id}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            myads.splice(index, 1);
            setMyads([...myads]);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Ad has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <>
      {item.hide ? (
        <Cards
          image={item.images}
          title={item.adTitle}
          price={item.price}
          location={item.location}
          timeSincePosted={item.diff}
        />
      ) : (
        <div className="border-[0.1rem] border-solid border-[rgba(0,47,52,0.2)] rounded-[0.4rem] cursor-pointer overflow-hidden relative select-none gap-2 bg-white">
          <Link href={`item/${item.id}`}>
            <div className="w-full h-52 flex">
              <div className="w-fit md:w-[30%]">
                <img
                  className="w-full h-full object-cover"
                  src={item.images[0]}
                  alt={item.adTitle}
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-2xl">Rs {item.price}</h3>
                <p className="mt-2 text-lg">{item.adTitle}</p>
                <p className="mt-6">
                  {item.location} . {item.diff}
                </p>
                <div className="mt-2">
                  {!pathname.includes("/myads") && (
                    <>
                      <button className="btn w-30 text-[17px]">
                        <MdOutlinePhone fontSize={22} /> Call
                      </button>
                      <button className="btn btn-neutral ml-5 text-[17px]">
                        <FaRocketchat fontSize={22} /> chat
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
          {/* Edit button, only visible on /myads page */}

          {pathname.includes("/myads") && (
            <>
              <Link href={`/editadd/${item.id}`}>
                <button className="btn w-30 m-3 text-[17px]">
                  <FaRegEdit fontSize={22} /> Edit Ad
                </button>
              </Link>
              <button onClick={deleteAd} className="btn  w-30 m-3 text-[17px]">
                <FaRegEdit fontSize={22} /> Delete Ad
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchedCard;
