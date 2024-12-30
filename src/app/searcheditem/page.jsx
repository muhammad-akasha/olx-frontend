import SearchedItems from "../../components/SearchedItem";
import React, { Suspense } from "react";
import Skeliton from "../../components/Skeliton";

const SearhedPage = () => {
  return (
    <Suspense
      fallback={
        <div className="px-8">
          <Skeliton />
        </div>
      }
    >
      <SearchedItems />;
    </Suspense>
  );
};

export default SearhedPage;
