import React from "react";
import Image from "next/image";

const Section2 = () => {
  return (
    <div className="flex  w-auto ">
      <div>
        <h1 className="ml-96  text-5xl text-blue-800 font-semibold">
          {" "}
          3 services in One
        </h1>

        <div className="h-64 py-12 flex flex-col  mt-16 ml-28 justify-start items-start rounded-lg bg-yellow-400 ">
          <h1 className="font-semibold flex text-blue-600  ml-10 text-4xl">
            Avoid Fake Products{" "}
          </h1>
          <h1 className="text-4xl flex font-semibold ml-10 text-red-500 m-4">
            Simply Check
          </h1>
          <button className="ml-14 m-2 justify-center items-center flex rounded-md p-2 text-white bg-blue-500 w-32">
            KNOW HOW
          </button>
          <Image
            src={require("@/app/assets/png/fake.png")}
            className=" flex flex-row w-32 mx-auto   h-3/4 "
            alt=""
          />
          <div className="rounded-lg p-10 border-4 border-blue-400 ">
            <h1 className=" text-6xl font-semibold text-blue-500">
              What Label Maker Prov
            </h1>
            <h1 className=" text-black mt-3 opacity-40">
              That you cannot do otherwise
            </h1>
            <h1 className="text-4xl flex flex-row">$0</h1>
            <span className="opacity-40 flex flex-row text-black">
              Abolute Free
            </span>

            <ul>
              <li>Scan and Verify Authentic Products in 2 steps</li>
              <li>Register and Track Product Warranty</li>
              <li>Book your service at regular intervals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
