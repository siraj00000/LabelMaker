import React from "react";
import Image from "next/image";


const HeroSection = () => {
  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-8 h-auto">
      <figure className="bg-white col-span-1">
        <Image
          src={require("@/app/assets/jgp/child.jpg")}
          className="w-full h-full md:object-cover object-contain"
          alt=""
          priority
        />
      </figure>
      <article className="col-span-1 flex flex-col justify-center my-auto max-md:items-center gap-5 pr-5 max-h-96">
        <h1 className="text-neutral-600 md:text-4xl max-md:text-3xl max-sm:text-2xl max-md:text-center break-words capitalize">
          <strong className="text-black md:text-6xl max-md:text-4xl max-sm:text-2xl block">
            Simplest Method
          </strong> 
          for Authenticating Products.
        </h1>

        <button className="h-12 w-44 text-white rounded-md bg-blue-500">
          Scan now
        </button>

        <h6 className="text-lg font-semibold text-neutral-600">Check & then buy</h6>
      </article>
    </main>
  )
}

export default HeroSection;
