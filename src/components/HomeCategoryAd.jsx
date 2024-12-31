"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Link from "next/link";
import formatDateDifferenceWithNow from "./DateCompareFunc";

const HomeCategoryAd = () => {
  const [ads, setAds] = useState("");
  const getAdByCategory = async () => {
    try {
      const categoryArr = ["Mobiles", "Vehicles", "Bikes"];
      const responses = await Promise.all(
        categoryArr.map((category) => {
          return axios.post("http://localhost:5000/api/v1/getcategory", {
            category,
            limit: 4,
          });
        })
      );
      // Combine all ads into a single array
      const allAds = responses.flatMap((response) => response.data.data);
      console.log(allAds);
      const createdAt = allAds.map((item) => {
        return {
          ...item,
          diff: formatDateDifferenceWithNow(item.createdAt),
        };
      });

      console.log(createdAt);
      const categ = {};
      for (const category of createdAt) {
        if (!categ[category.category]) {
          categ[category.category] = [];
        }
        if (category.category) {
          categ[category.category].push(category);
        }
      }
      setAds(categ);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdByCategory();
  }, []);

  return (
    <div className="px-8 py-8">
      {Object.keys(ads).length > 0 &&
        Object.keys(ads).map((category) => (
          <div key={category}>
            <h2 className="font-semibold text-2xl mt-6 mb-3">{category}</h2>
            <div className="grid grid-cols-1 justify-center sm:justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ads[category].map((item) => (
                <div key={item._id}>
                  <Link href={`/item/${item._id}`}>
                    <Cards
                      image={item.images}
                      title={item.adTitle}
                      price={item.price}
                      location={item.location}
                      timeSincePosted={item.diff}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomeCategoryAd;
