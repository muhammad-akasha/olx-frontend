"use client";
import Loading from "../../../components/Loading";
import PostingAdd from "../../../components/PostingAdd";
import { useCategory } from "../../../Contexts/CategoryContext";
import { useRouter } from "next/navigation"; // Correct import for navigation
import React, { useEffect, useState } from "react";
import { useAuthenticate } from "../../../Contexts/UserContext";
import Protect from "../../../components/Protect";

const CreateAdd = () => {
  const { isLogin } = useAuthenticate();
  const { categoryDetail } = useCategory();
  const router = useRouter(); // Use Next.js router for navigation
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!categoryDetail) {
      setIsLoading(true); // Show the loading spinner
      router.replace("/addpost"); // Redirect to a different page
    }
  }, [categoryDetail, router]);

  if (!isLogin) {
    return <Protect />;
  }

  // Show the loader and prevent rendering when redirecting
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="text-center m-3 text-lg font-semibold">POST YOUR AD</h2>
      <PostingAdd />
    </>
  );
};

export default CreateAdd;
