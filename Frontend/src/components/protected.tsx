import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { showCustomToast } from "./customtoaster";

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      showCustomToast({
        message: "You must be signed in to access this page.",
        type: "error",
      });
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="w-full min-h-[80dvh] flex justify-center items-center">
        <div>
          <Loader className="animate-spin h-8 w-8" />
        </div>
      </div>
    );
  }

  return isSignedIn ? <>{children}</> : null;
};

export default Protected;
