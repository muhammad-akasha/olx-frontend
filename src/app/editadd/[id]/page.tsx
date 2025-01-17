"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostingAdd from "../../../components/PostingAdd";
import { categories } from "../../../categoriesarrays/categoriesArray";
import { useCategory } from "../../../Contexts/CategoryContext";

const EditAd = () => {
  const [beforeEdit, setBeforeEdit] = useState("");
  const { setCategoryDetail } = useCategory();
  const { id } = useParams();

  const getAdByID = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/getadbyid/?id=${id}`
      );
      const categoryMatch = categories.find(
        (item) => item.title === res.data.ad.category
      );

      if (categoryMatch) {
        setCategoryDetail({
          ...categoryMatch,
          id: id,
          category: res.data.ad.subCategory,
        });
      }
      setBeforeEdit(res.data.ad);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdByID();
  }, [id]);

  return (
    <div className="my-10">
      <PostingAdd beforeEdit={beforeEdit} />
    </div>
  );
};

export default EditAd;
