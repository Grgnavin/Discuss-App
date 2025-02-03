import React from "react";
import { Input } from "./ui/input";
import AuthHeader from "./AuthHeader";


const HeaderPage = async () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-14">
      <div className="flex justify-start">
        <h1 className="font-semibold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Input type="text" placeholder="Search posts..." />
      </div>
      <div className="flex justify-end gap-2">
        <AuthHeader />
      </div>
    </div>
  );
};

export default HeaderPage;
