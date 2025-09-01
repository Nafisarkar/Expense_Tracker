import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { showCustomToast } from "./customtoaster";

const SyncUser = () => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const createUserInDb = async () => {
        try {
          console.log("User data loaded, attempting to sync user...");
          const token = await getToken();

          const response = await axios.post(
            "http://localhost:3000/api/users/create",
            {
              email:
                user?.primaryEmailAddress?.emailAddress || "johndoe@one.com",
              name: user?.fullName || "John Doe",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 201) {
            showCustomToast({
              message: "Account created successfully!",
              type: "success",
            });
            console.log("User created successfully in DB.");
          } else if (response.status === 200) {
            console.log("User already exists in DB, sync complete.");
          }
        } catch (error) {
          console.error("Failed to sync user with database:", error);
          // It's good practice to log the detailed error
          if (axios.isAxiosError(error)) {
            console.error("Axios error details:", error.response?.data);
          }
        } finally {
          navigate("/");
        }
      };

      createUserInDb();
    }
    // The effect depends on these values. It will not run until they are available.
  }, [isLoaded, user, getToken, navigate]);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="text-center">
        <Loader className="w-10 h-10 animate-spin mx-auto" />
        <p className="mt-4">Finalizing your account...</p>
      </div>
    </div>
  );
};

export default SyncUser;
