"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";
import { RiLogoutBoxLine, RiSearchLine } from "react-icons/ri";
import { Input } from "@headlessui/react";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { HiOutlineUserCircle } from "react-icons/hi";
import { PiUserCircleThin } from "react-icons/pi";
import { IoChevronDown } from "react-icons/io5";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 pt-[35px]">
      <div className="myContainer w-full flex justify-between items-center gap-20">
        <div className="relative w-full max-w-[686px]">
          <RiSearchLine
            size={24}
            className="absolute top-[25%] left-6 text-[#535862]"
          />
          <Input
            name="search"
            value={""}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search a student..."
            className="w-full border border-[#E9EAEB]  py-3 pl-[63px] pr-4 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]"
          />
        </div>
        {/* <div className="flex items-center gap-4">
          <PiUserCircleThin className="text-[34px]" />
          <span className="text-sm inline-block whitespace-nowrap">
            Tubo Layefa
          </span>
          <IoChevronDown className="text-[24px]" />
        </div> */}
        <Menu>
          <MenuButton className="focus:outline-none">
            <div className="flex items-center gap-4">
              <PiUserCircleThin className="text-[34px]" />
              <span className="text-sm inline-block whitespace-nowrap">
                Tubo Layefa
              </span>
              <IoChevronDown className="text-[18px]" />
            </div>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom start"
            className="w-40 origin-top-right  bg-white  font-medium shadow py-4  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2  px-3 py-1.5 cursor-pointer text-secondary data-focus:bg-secondary data-focus:text-white">
                <RiLogoutBoxLine />
                <span>Sign out</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="myContainer">
        <hr className="text-[#EDECEC] mt-[14px]" />
      </div>
    </header>
  );
}
