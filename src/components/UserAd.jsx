"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchedCard from "./SearchedCard";
import Link from "next/link";
import Skeliton from "./Skeliton";
import { useAuthenticate } from "../Contexts/UserContext";
import Protect from "./Protect";
import api from "../axios-api-intersectors/api";

const UserAd = () => {
  const { isLogin } = useAuthenticate();
  const [myads, setMyads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMyAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(`getads`, {});
      setMyads(res.data.data);
    } catch (error) {
      setError("Failed to fetch advertisements. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
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
    return <div>No advertisements found.</div>;
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      {myads.map((item, index) => (
        <div key={item._id}>
          <SearchedCard
            index={index}
            id={item._id}
            adTitle={item.adTitle}
            price={item.price}
            location={item.location}
            images={item.images}
            hide={false}
            myads={myads}
            setMyads={setMyads}
          />
        </div>
      ))}
    </div>
  );
};

export default UserAd;
