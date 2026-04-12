import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useCategory } from "../Contexts/CategoryContext";
import Category from "./Category";
import UploadImages from "./UploadImagesForAd";
import BrandCondition from "./BrandConditionInp";
import TitleDescription from "./TitleDescriptionInp";
import Price from "./PriceInputForAd";
import AdHolderDetails from "./AdHolderDetails";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useUserAds } from "../Contexts/UserPublishedAdsContext";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

const PostingAdd = ({ beforeEdit }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { categoryDetail } = useCategory();
  const [submitting, setSubmitting] = useState(false);
  const { myads, setMyads } = useUserAds();

  // Initialize React Hook Form
  const methods = useForm();
  useEffect(() => {
    if (beforeEdit) {
      // Check if methods is fully initialized
      if (methods.setValue) {
        methods.setValue("title", beforeEdit.adTitle);
        methods.setValue("description", beforeEdit.description);
        methods.setValue("location", beforeEdit.location);
        methods.setValue("brand", beforeEdit.brand);
        methods.setValue("condition", beforeEdit.condition);
        methods.setValue("phone", beforeEdit.phone);
        methods.setValue("category", beforeEdit.category);
        methods.setValue("price", beforeEdit.price);
        methods.setValue("name", beforeEdit.name);
        methods.setValue("showPhoneNumber", beforeEdit.showPhoneNumber);
        methods.setValue("images", beforeEdit.images);
      }
    }
  }, [methods, beforeEdit]);

  const onSubmit = async (data) => {
    const adData = {};
    adData.oldUrl = [];
    adData.images = []; // Initialize images as an empty array
    // Append the data to the FormData object
    adData.name = data.name;
    adData.adTitle = data.title;
    adData.description = data.description;
    adData.location = data.location;
    adData.brand = data.brand;
    adData.condition = data.condition;
    adData.phone = data.phone;
    adData.price = data.price;
    adData.category = categoryDetail.title;
    adData.subCategory = categoryDetail.category;
    adData.showPhoneNumber = data.showPhoneNumber;
    console.log(data);

    setSubmitting(true);
    try {
      for (const image of data.images) {
        if (typeof image === "string") {
          adData.oldUrl.push(image); // If it's already a URL, push it to oldUrl
        } else if (image instanceof File) {
          // If it's a File, upload it to Cloudinary and get the URL
          const url = await uploadImageToCloudinary(image);
          adData.images.push(url); // Push the URL to the images array
        }
      }
      const apiEndpoint = `${beforeEdit ? `editadd/${beforeEdit._id}` : "addolxad"
        }`;
      const reqMethod = beforeEdit ? "put" : "post";
      const response = await axios[reqMethod](
        `https://olx-backend-deploy.vercel.app/api/v1/${apiEndpoint}`,
        adData,
        { withCredentials: true }
      );
      if (beforeEdit) {
        // Update the existing ad in the state (if editing)
        setMyads((prev) =>
          prev.map((ad) =>
            ad._id === response.data.ad._id ? response.data.ad : ad
          )
        );
      } else {
        // Add the new ad to the state (if creating)
        setMyads((prev) => [response.data.ad, ...prev]); // Create a new array with the new ad at the beginning
      }

      router.push("/myads"); // Redirect after successful submission
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {categoryDetail && (
        <div className="w-full md:w-[70%] my-5 md:m-5">
          {/* Provide form context to child components */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="border-[1px] border-solid border-[#002F345C] rounded-md">
                <Category />
                <UploadImages oldImages={beforeEdit?.images} />
                <BrandCondition />
                <TitleDescription />
              </div>
              <div className="mt-5 rounded-md">
                <Price />
              </div>
              <div className="border-2 border-solid border-[#002F345C] mt-5 rounded-md">
                <AdHolderDetails />
                <div className="flex justify-end py-5 px-7 border-t-2 border-[#002F345C]">
                  <button
                    disabled={submitting}
                    type="submit"
                    className="btn btn-neutral"
                  >
                    {submitting
                      ? pathname.includes("/editadd")
                        ? "Editing..."
                        : "Posting..."
                      : pathname.includes("/editadd")
                        ? "Edit Now"
                        : "Post Now"}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default PostingAdd;
