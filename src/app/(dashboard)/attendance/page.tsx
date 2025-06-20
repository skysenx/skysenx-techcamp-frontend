/* eslint-disable @next/next/no-img-element */
import React from "react";
import CameraViewer from "../../../components/Camera";
import Button from "../../../components/ui/Button";

export default function Page() {
  return (
    <div className="flex pt-[20px] gap-16">
      <div>
        <CameraViewer />
      </div>
      <div className="w-full max-w-[533px] mx-auto">
        <div className="text-xs font-medium px-6 py-3 bg-[#FAFAFA] border border-[#E9EAEB]">
          Students
        </div>

        {/* student */}
        <div className="min-h-[300px]">
          <div className="flex gap-3 items-center px-6 py-4 border border-t-0  border-[#E9EAEB] hover:bg-[#F0F0F0]">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/images/login-image.png"
                alt="students image"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-medium text-lg">Olivia Dennis</p>
          </div>
          <div className="flex gap-3 items-center px-6 py-4 border border-t-0  border-[#E9EAEB] hover:bg-[#F0F0F0]">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/images/login-image.png"
                alt="students image"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-medium text-lg">Olivia Dennis</p>
          </div>
          <div className="flex gap-3 items-center px-6 py-4 border border-t-0  border-[#E9EAEB] hover:bg-[#F0F0F0]">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/images/login-image.png"
                alt="students image"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-medium text-lg">Olivia Dennis</p>
          </div>
        </div>
        <div className="flex justify-center mt-10 gap-5">
          <Button size="lg">Sign In</Button>
          <Button size="lg" theme="secondary">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
