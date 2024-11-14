import Logo from "@/components/Logo";
// import TrackMyOrder from "@/components/TrackMyOrder";
import React from "react";

const TrackOrderPage = () => {
  return (
    <div className="min-h-screen h-full w-full bg-gray-100 flex justify-center items-center flex-col space-y-10 ">
      <Logo />
      <div className="max-w-lg h-[20rem] bg-white shadow-lg rounded-2xl">
        {/* <TrackMyOrder /> */}
        <h1>Track order</h1>
      </div>
    </div>
  );
};

export default TrackOrderPage;
