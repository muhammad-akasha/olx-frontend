"use client";
import React, { useState } from "react";
import { BsExclamationDiamond } from "react-icons/bs";
import EditPageInput from "../reusablecomponent/EditPageInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthenticate } from "../Contexts/UserContext";
import Protect from "../components/Protect";
import { useRouter } from "next/navigation";

const EditPage = () => {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuthenticate();
  const [submitting, setSubmiting] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [image, setImage] = useState(watch("image") || "");
  const updateProfile = async (data) => {
    setSubmiting(true);
    const { name, email, contact, image } = data;
    console.log(name, email, contact, image, isLogin._id);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("id", isLogin._id);
    console.log("image added", data);
    if (image) {
      formData.append("profile", image);
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/updateuser",
        formData
      );
      console.log(res.data);
      setIsLogin(res.data.user);
      Swal.fire({
        title: "Profile Updated!",
        icon: "success",
        draggable: true,
      });
      reset();
      setImage("");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setValue("image", e.target.files[0]);
  };

  const removeImg = () => {
    setImage("");
    setValue("image", "");
  };

  const deleteMyAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8000/api/v1/deleteaccount", {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            setIsLogin("");
            Swal.fire({
              title: "Deleted!",
              text: "Your Account has been deleted.",
              icon: "success",
            });
            router.push("/");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Conditional rendering based on whether the user is logged in
  if (!isLogin) {
    return <Protect />;
  }

  return (
    <>
      <section className="mt-4 p-5 border-[.1rem] border-solid border-[rgba(0, 47, 52, .2)] max-w-[80%] m-auto rounded-md">
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="border-b-[.1rem] pb-4 font-semibold">
            <h2>Edit Profile</h2>
          </div>
          <div className="pt-4 font-semibold border-b-[.1rem] pb-2">
            <h3>Profile Photo</h3>
            <div className="flex gap-4 items-center">
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={
                    (image && URL.createObjectURL(image)) ||
                    isLogin.profilePicture ||
                    `/iconProfilePicture.png`
                  }
                  alt="profiledummy"
                />
              </div>
              <div>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <input
                      className="opacity-0 w-full h-full absolute top-0"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      name="profile"
                      id="profile"
                      onChange={handleImage}
                    />
                    <button className="btn btn-neutral">Upload Image</button>
                  </div>
                  <div className="flex gap-4 items-center">
                    {image && (
                      <div
                        onClick={removeImg}
                        className="w-[100px] h-[2rem] flex justify-center items-center mt-4 mb-2 rounded-md border-2 border-black hover:border-red-500 box-border"
                      >
                        <button className="btn btn-ghost hover:outline-none hover:bg-transparent text-[16px] hover:text-red-500">
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h6 className="text-sm mt-2 flex gap-2 items-center">
                  <BsExclamationDiamond fontSize={12} /> JPG, JPEG, PNG Min:
                  400px, Max: 1024px
                </h6>
              </div>
            </div>
          </div>
          <div className="pt-4 border-b-[.1rem] pb-4">
            <h6 className="font-semibold text-md">Name</h6>
            <EditPageInput
              register={register}
              name="name"
              placeholder={"Your Name"}
            />
          </div>
          <div className="pt-4 border-b-[.1rem]">
            <h5 className="font-semibold">Contact information</h5>
            <div>
              <EditPageInput
                register={register}
                name="email"
                type="email"
                placeholder={"Email"}
              />
            </div>
            <div>
              <EditPageInput
                register={register}
                name="contact"
                placeholder={"Contact Number"}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              disabled={submitting}
              type="submit"
              className="btn btn-neutral"
            >
              {submitting ? "Submitting..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
      <section className="my-4 p-5 border-[.1rem] border-solid border-[rgba(0, 47, 52, .2)] max-w-[80%] m-auto rounded-md">
        <div>
          <h3 className="font-semibold border-b-[.1rem] pb-4">
            Delete this account
          </h3>
        </div>
        <div className="pt-4">
          <h5 className="font-semibold">
            Are you sure you want to delete your account?
          </h5>

          <div className="w-full lg:w-full md:w-[30%] border-2 border-black hover:border-4 h-[2.7rem] flex justify-center items-center mt-4 mb-2 rounded-md">
            <button
              onClick={deleteMyAccount}
              className="btn btn-ghost hover:outline-none hover:bg-transparent text-[16px]"
            >
              Yes , delete my account
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditPage;
