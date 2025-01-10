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
        methods.setValue("subCategory", beforeEdit.subCategory);
        methods.setValue("name", beforeEdit.name);
        methods.setValue("showPhoneNumber", beforeEdit.showPhoneNumber);
        methods.setValue("images", beforeEdit.images);
      }
    }
  }, [methods, beforeEdit]);

  const onSubmit = async (data) => {
    const adData = new FormData();
    // Append the data to the FormData object
    adData.append("name", data.name);
    adData.append("adTitle", data.title);
    adData.append("description", data.description);
    adData.append("location", data.location);
    adData.append("brand", data.brand);
    adData.append("condition", data.condition);
    adData.append("phone", data.phone);
    adData.append("price", data.price);
    adData.append("category", categoryDetail.title);
    adData.append("subCategory", data.subCategory);
    adData.append("showPhoneNumber", data.showPhoneNumber);

    // If you have an array of files for images, append each file (and URLs separately)
    data.images.forEach((image) => {
      if (typeof image === "string") {
        // If the image is a URL (string), append it as a URL
        adData.append("oldUrl", image);
      } else if (image instanceof File) {
        // If the image is a file object, append it as a file
        adData.append("images", image);
      }
    });
    setSubmitting(true);
    try {
      const apiEndpoint = `${
        beforeEdit ? `editadd/${beforeEdit._id}` : "addolxad"
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
        myads.unshift(response.data.ad);
        setMyads([...myads]);
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
