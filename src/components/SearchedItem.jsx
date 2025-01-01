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
import Loading from "./Loading";

// Ensure that this component is only rendered client-side
const SearchedItems = () => {
  const params = useSearchParams();
  const { data, setData } = useSearched();
  const [hide, show] = useState(false);
  const [loading, setLoading] = useState(true);

  const search = async () => {
    setLoading(true);
    const inputSearch = params.get("q");
    console.log(inputSearch);
    try {
      const res = await axios.post(
        `https://parallel-anglerfish-akasha-6ad22695.koyeb.app/getbysearch`,
        {
          inputSearch,
        }
      );
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
      }
    } catch (error) {
      console.log(error);
      setData("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [params.get("q")]);

  if (loading) {
    return <Loading />;
  }

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
        className={`flex flex-col ${
          hide && "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
          <h2 className="text-center h-[100px]">NO AD FOUND!</h2>
        )}
      </div>
    </div>
  );
};

export default SearchedItems;
