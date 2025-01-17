"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchedCard from "./SearchedCard";
import Skeliton from "./Skeliton";
import { useAuthenticate } from "../Contexts/UserContext";
import Protect from "./Protect";
import { useUserAds } from "../Contexts/UserPublishedAdsContext";

const UserAd = () => {
  const { isLogin } = useAuthenticate();
  const { myads, setMyads } = useUserAds();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/getads",
        {},
        {
          withCredentials: true, // Make sure this is set
        }
      );
      setMyads(res.data.data);
    } catch (error) {
      setError("Failed to fetch advertisements. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((isLogin && !myads) || myads.length === 0) {
      setLoading(true);
      getMyAds();
    }
  }, []);

  if (!isLogin) {
    return <Protect />;
  }
  if (loading) {
    return (
      <div className="mt-5">
        <Skeliton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (myads.length === 0) {
    return (
      <div className="h-44 flex justify-center items-center">
        No advertisements found....
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      {myads.map((item, index) => (
        <div key={item._id}>
          <SearchedCard
            id={item._id}
            index={index}
            adTitle={item.adTitle}
            price={item.price}
            location={item.location}
            images={item.images}
            hide={false}
          />
        </div>
      ))}
    </div>
  );
};

export default UserAd;
