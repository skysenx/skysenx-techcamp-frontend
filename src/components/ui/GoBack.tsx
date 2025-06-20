import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";

const GoBack = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button onClick={goBack}>
      <IoChevronBackOutline size={24} />
    </button>
  );
};

export default GoBack;
