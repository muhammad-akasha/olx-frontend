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
import { useRouter } from "next/navigation";

const PostingAdd = () => {
  const router = useRouter();
  const { categoryDetail } = useCategory();
  const [submitting, setSubmitting] = useState(false);

  // Initialize React Hook Form
  const methods = useForm();

  const onSubmit = (data) => {
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
    adData.append("subCategory", categoryDetail.category);
    adData.append("showPhoneNumber", data.showPhoneNumber);

    // If you have an array of files for images, you can append each file like this:
    data.images.forEach((image) => {
      adData.append(`images`, image);
    });
    setSubmitting(true);
    axios
      .post(
        "https://parallel-anglerfish-akasha-6ad22695.koyeb.app/api/v1/addolxad",
        adData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
        router.push("/myads");
      });
  };

  return (
    <>
      {categoryDetail && (
        <div className="w-[70%] m-5">
          {/* Provide form context to child components */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="border-[1px] border-solid border-[#002F345C] rounded-md">
                <Category />
                <UploadImages />
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
                    {submitting ? "Posting..." : "Post Now"}
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
