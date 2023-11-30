"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/png/logo.png";
import Link from "next/link";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { FiTwitter } from "react-icons/fi";

const navigationLink = [
  {
    name: "Product",
    links: [
      {
        name: "Features",
        link: "/",
        fontWeight: "font-bold",
      },
      {
        name: "pricing",
        link: "/",
      },
    ],
  },
  {
    name: "Resources",
    links: [
      { name: "Blog", link: "/" },
      { name: "User guides", link: "/" },
      { name: "Webinars", link: "/" },
    ],
  },
  {
    name: "Company",
    links: [
      { name: "About us", link: "/" },
      { name: "Contact us", link: "/" },
    ],
  },
  {
    name: "Plans & Pricing",
    links: [
      { name: "Personal", link: "/" },
      { name: "Startup", link: "/" },
      { name: "Organization", link: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white z-50">
      <div className="mx-auto space-y-8 px-4 py-14 sm:px-6 lg:space-y-16 lg:px-8">
        <aside className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section>
            <div className="text-teal-600 w-1/5">
              <Image src={Logo} alt="logo" priority />
            </div>
          </section>

          {/* Navigation Links List */}
          <section className="grid grid-cols-1 gap-8  sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
            {navigationLink.map((nav, navIndex) => (
              <div key={navIndex}>
                <p className="text16 text-light">{nav.name}</p>
                <ul className="mt-6 space-y-4 text14 text-activeTab font-nunito700">
                  {nav.links.map((subNav, subNavIndex) => (
                    <li key={subNavIndex}>
                      <Link href={subNav.link}> {subNav.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </aside>

        <aside className="flex items-center justify-center  max-md:flex-col-reverse gap-5">
          <p className="text12 text-greenish">
            Copyright ©2023 Brand,Inc All Rights Reserved.
          </p>

          <div className="flex gap-5  text-4xl  ">
            <span className="text-blue-600">
              <BsFacebook />
            </span>
            <span className="text-red-600">
              <BsYoutube />
            </span>
            <span className="text-sky-800">
              <BiLogoLinkedinSquare />
            </span>
            <span className=" text-blue-300">
              <FiTwitter />
            </span>
          </div>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
