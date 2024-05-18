import React from "react";
import HeroImg from "../../Assets/icons8-anonymous-mask-480.svg";
import { NavLink } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div className="flex flex-col md:gap-0 items-center md:flex-row md:items-center md:justify-center overflow-hidden bg-yellow-100">
        <div className="pl-4 order-2 md:order-[-1]">
          <h1 className="  text-[1.4rem] md:text-[3rem] font-extrabold text-[#307eb6] dark:text-[#307eb6]">
            Welcome to Unlock.it
          </h1>
          <p className="text-[1rem] md:text-[2rem]  font-bold">
            Unleash Your Ideas Anonymously,
          </p>
          <p className="text-[2rem] text-[#307eb6] font-bold hidden md:block mx-24">
            Share your Plans!
          </p>
          <br />
          <p className="mt-2 text-[1rem]  md:text-[2rem] font-bold text-[#000] w-full dark:text-white">
            Confess.<span className="text-[#8d2b2bfd]">Thoughts</span>.Anonymously
          </p>
          <br />
          <NavLink to="/boards">
            <button className="mt-4 mx-40 btn py-4 px-5 bg-[#307eb6] md:mt-2 rounded-xl hover:bg-[#318bcc] text-white">
             Open Boards
            </button>
          </NavLink>
        </div>
        <div className=" img rotate-[10deg] w-max text-[#307eb6] md:mt-10 md:mb-10 ">
          <img alt="hero_img" className="w-[20rem] md:w-full" src={HeroImg} />
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
