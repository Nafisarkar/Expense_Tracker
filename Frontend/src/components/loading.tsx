import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center">
      <Loader className=" animate-spin " />
    </div>
  );
};

export default Loading;
