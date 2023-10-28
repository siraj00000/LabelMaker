import React from "react";
import Banner from "../../../banner/Banner";

type HeaderSectionProps = {
  title: string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ title }) => {
  return (
    <section>
      <Banner title={title} />
    </section>
  );
};

export default HeaderSection;
