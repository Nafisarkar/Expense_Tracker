import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] ">
      <SignIn signUpUrl="/signup" forceRedirectUrl={"/"} />
    </div>
  );
};

export default LoginPage;
