import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <SignUp signInUrl="/login" forceRedirectUrl={"/sync-user"} />
    </div>
  );
};

export default SignUpPage;
