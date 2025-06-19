"use client";

import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
// import { AiOutlineDashboard } from "react-icons/ai";
import {
  assessmentRoute,
  attendanceRoute,
  //   dashboardRoute,
  studentRoute,
} from "../utils/route";
import { usePathname } from "next/navigation";
// import { TbUsersGroup } from "react-icons/tb";
// import { PiUsersThreeBold } from "react-icons/pi";
import { MdAssessment, MdOutlinePeopleOutline } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

// Navigation items configuration
const navigationItems = [
  //   {
  //     name: "Dashboard",
  //     href: dashboardRoute, // fixed this
  //     icon: AiOutlineDashboard,
  //   },
  {
    name: "Students",
    href: studentRoute, // example second nav item
    icon: MdOutlinePeopleOutline, // you can replace with another icon
  },
  {
    name: "Attendance",
    href: attendanceRoute, // example second nav item
    icon: GrGroup, // you can replace with another icon
  },
  {
    name: "Assessments",
    href: assessmentRoute, // example second nav item
    icon: MdAssessment, // you can replace with another icon
  },
];

interface NavLinkProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-4 py-[11px] pl-10   ${
          isActive ? "bg-primary text-white" : "text-black hover:bg-gray-100"
        }`}
      >
        <Icon className="text-2xl flex-shrink-0" />
        <span className="text-lg">{item.name}</span>
      </Link>
    </li>
  );
};

const NavLinks: React.FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1">
        <ul className="flex flex-col gap-[18px]">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isActive={pathname === item.href}
              onClick={onLinkClick}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

const SideNav = () => {
  return (
    <div className="bg-[#F6FCFF] min-w-[230px] h-full">
      <div className="my-14 flex justify-center px-10">
        <Logo />
      </div>
      <div>
        <NavLinks />
      </div>
    </div>
  );
};

export default SideNav;
