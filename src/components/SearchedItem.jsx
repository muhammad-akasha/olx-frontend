"use client";
import React, { useEffect, useState } from "react";
import { useSearched } from "../Contexts/SearchItemContext";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import SearchedCard from "../components/SearchedCard";
import Link from "next/link";
import { IoReorderThreeOutline } from "react-icons/io5";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import formatDateDifferenceWithNow from "./DateCompareFunc";
import NotFound from "./NotFound";

// Ensure that this component is only rendered client-side
const SearchedItems = () => {
  const params = useSearchParams();
  const { data, setData } = useSearched();
  const [hide, show] = useState(false);

  const search = async () => {
    const inputSearch = params.get("q");
    console.log(inputSearch);
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/getbysearch`, {
        inputSearch,
      });
      if (res.data.response.length > 0) {
        const createdAt = res.data.response.map((item) => {
          return {
            ...item,
            diff: formatDateDifferenceWithNow(item.createdAt),
          };
        });
        setData(createdAt);
      } else {
        setData("");
        console.log("hello");
      }
    } catch (error) {
      console.log("hello");
      console.log(error);
      setData("");
    }
  };

  useEffect(() => {
    search();
  }, [params.get("q")]);

  return (
    <div className="px-8 my-10">
      <div className="flex justify-end gap-2 items-center my-4">
        <h5 className="font-semibold">VIEW</h5>
        <div
          className={`w-10 h-10 flex justify-center items-center ${
            !hide && "bg-[#c8f8f6]"
          }`}
          onClick={() => show(false)}
        >
          <IoReorderThreeOutline fontSize={30} />
        </div>
        <div
          className={`w-10 h-10 flex justify-center items-center ${
            hide && "bg-[#c8f8f6]"
          }`}
          onClick={() => show(true)}
        >
          <HiOutlineViewGridAdd fontSize={26} />
        </div>
      </div>
      <div
        className={`flex ${
          !hide ? "flex-col" : "flex-row justify-center flex-wrap gap-4"
        } gap-2`}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <Link key={item._id} href={`/item/${item._id}`}>
              <SearchedCard
                adTitle={item.adTitle}
                images={item.images}
                price={item.price}
                location={item.location}
                hide={hide}
                diff={item.diff}
              />
            </Link>
          ))
        ) : (
          <div>
            <NotFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedItems;
