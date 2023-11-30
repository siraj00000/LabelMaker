import React from "react";
import Hero from "./_components/Section/Hero";
import HowItWork from "./_components/Section/HowItWork";
import WhatWeProve from "./_components/Section/WhatWeProve";

const Home = () => {
  return (
    <main>
      {/* HomePage Hero Section */}
      <Hero />

      {/* What Label makers prove */}
      <WhatWeProve />

      {/* How it works Section */}
      <HowItWork />

    </main>
  );
};

export default Home;
