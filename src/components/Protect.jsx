import React from "react";

const Protect = () => {
  return (
    <section className="h-screen my-10 flex justify-center items-center flex-col mt-4 p-5 border-[.1rem] border-solid border-[rgba(0, 47, 52, .2)] max-w-[80%] m-auto rounded-md">
      <h2 className="font-semibold">Not Found</h2>
      <p>
        The page you are trying to access is not available. Please log in to
        continue.
      </p>
    </section>
  );
};

export default Protect;
