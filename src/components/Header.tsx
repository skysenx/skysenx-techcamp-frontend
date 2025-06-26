"use client";
import {
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Select,
} from "@headlessui/react";
import React from "react";
import { RiLogoutBoxLine, RiSearchLine } from "react-icons/ri";
import { Input } from "@headlessui/react";
import { PiUserCircleThin } from "react-icons/pi";
import { IoChevronDown } from "react-icons/io5";
import { userAuth, useVariables } from "../stores/variables";
import { loginRoute } from "../utils/route";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { useFindPrograms } from "../hooks/useProgram";
import { useFindCohorts } from "../hooks/useCohort";
import { ICohort, IProgram } from "../lib/types";

export default function Header() {
  const { setCredentials, credentials } = userAuth();
  const { data } = useFindPrograms();
  const { data: cohortData } = useFindCohorts();
  const {
    filterValue,
    setFilterValue,
    filterCriteria,
    setFilterCriteria,
    setFrom,
    from,
    setTo,
    to,
  } = useVariables();
  const router = useRouter();

  const programs = data?.data?.programs;
  const cohorts = cohortData?.data?.cohorts;

  const selectedFilter = (filter: string) => {
    switch (filter) {
      case "program":
        return "program";
        break;
      case "cohort":
        return "cohort";
        break;
      default:
        return;
        break;
    }
  };

  // console.log(programs);
  // console.log(cohorts);

  function handleLogOut() {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("refreshToken", "");
    sessionStorage.setItem("user", "");
    setCredentials("", "", {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      roles: [],
      created: "",
      updated: "",
    });
    router.push(loginRoute);
  }

  // console.log(filterValue);
  // console.log(filterCriteria);

  return (
    <header className="absolute top-0 left-0 right-0 pt-6 pb-3 flex flex-col items-end gap-5 bg-white">
      <div className="myContainer w-full flex justify-end">
        <Menu>
          <MenuButton className="focus:outline-none">
            <div className="flex items-center gap-4">
              <PiUserCircleThin className="text-[34px]" />
              <span className="text-sm inline-block whitespace-nowrap">
                {credentials?.user.firstname || ""}
              </span>
              <IoChevronDown className="text-[18px]" />
            </div>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom start"
            className="w-32 origin-top-right  bg-white  font-medium shadow py-4  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          >
            <MenuItem>
              <button
                onClick={handleLogOut}
                className="group flex w-full items-center gap-2  px-3 py-1.5 cursor-pointer text-secondary data-focus:bg-secondary data-focus:text-white"
              >
                <RiLogoutBoxLine />
                <span>Sign out</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="myContainer w-full flex justify-between items-end gap-5">
        <div className="flex items-end gap-4 w-full ">
          {!["cohort", "program"].includes(
            selectedFilter(filterCriteria) ?? ""
          ) && (
            <Field className="relative w-full max-w-[686px] flex-2/3">
              {/* <Label className="label-class">Value</Label> */}
              <div className="relative">
                <RiSearchLine
                  size={24}
                  className="absolute top-[25%] left-6 text-[#535862]"
                />
                <Input
                  name="search"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Search a student..."
                  className="w-full border border-[#E9EAEB]  py-3 pl-[63px] pr-4 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]"
                />
              </div>
            </Field>
          )}
          {selectedFilter(filterCriteria) === "program" && (
            <div className="relative w-full flex-2/3">
              <Select
                value={filterValue}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
                className="w-full border border-[#E9EAEB]  py-3 px-5 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]  appearance-none"
              >
                <option value="">Select a Program</option>
                {programs.map((p: IProgram) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <FiChevronDown
                className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          )}
          {selectedFilter(filterCriteria) === "cohort" && (
            <div className="relative w-full flex-2/3">
              <Select
                value={filterValue}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
                className="w-full border border-[#E9EAEB]  py-3 px-5 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]  appearance-none"
              >
                <option value="">Select a Cohort</option>
                {cohorts.map((c: ICohort) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <FiChevronDown
                className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          )}
          <Field className="relative w-full flex-1/3">
            {/* <Label className="label-class">Filter</Label> */}
            <div className="relative">
              <Select
                value={filterCriteria}
                onChange={(e) => {
                  setFilterCriteria(e.target.value);
                  setFilterValue("");
                }}
                className="w-full border border-[#E9EAEB]  py-3 px-5 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]  appearance-none"
              >
                <option value="">Select Filter</option>
                <option value="Name">Name</option>
                <option value="Reg_No">Reg Number</option>
                <option value="Phone">Phone</option>
                <option value="program">Program</option>
                <option value="cohort">Cohort</option>
              </Select>
              <FiChevronDown
                className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field className="w-full flex-1/3">
            <Label className="label-class">From</Label>
            <Input
              name="search"
              value={from}
              type="date"
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-[#E9EAEB]  py-3 px-4 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]"
            />
          </Field>
          <Field className="w-full flex-1/3">
            <Label className="label-class">To</Label>
            <Input
              name="search"
              value={to}
              type="date"
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-[#E9EAEB]  py-3 px-4 h-[48px] placeholder:text-[#535862] focus:border-primary   focus:outline-none caret-primary  duration-150 rounded-[12px]"
            />
          </Field>
        </div>
        {/* <Menu>
          <MenuButton className="focus:outline-none">
            <div className="flex items-center gap-4">
              <PiUserCircleThin className="text-[34px]" />
              <span className="text-sm inline-block whitespace-nowrap">
                {credentials?.user.firstname || ""}
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
              <button
                onClick={handleLogOut}
                className="group flex w-full items-center gap-2  px-3 py-1.5 cursor-pointer text-secondary data-focus:bg-secondary data-focus:text-white"
              >
                <RiLogoutBoxLine />
                <span>Sign out</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu> */}
      </div>
      <div className="myContainer w-full">
        <hr className="text-[#EDECEC] mt-1" />
      </div>
    </header>
  );
}
