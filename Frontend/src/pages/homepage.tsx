import { useAuth, useUser } from "@clerk/clerk-react";
import StatusCard from "../components/statuscard";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../components/loading";
import TransectionModalCard from "../components/transectionmodalcard";
import TransactionList from "../components/trasectionlist";
import useTransectionStore from "../store/transectionstore";

const HomePage = () => {
  const { getToken } = useAuth();
  const { isLoaded } = useUser();
  const { fetchTransaction } = useTransectionStore();

  useEffect(() => {
    const fetchExternalData = async () => {
      const token = await getToken();
      await axios.get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTransaction(token!);
    };

    fetchExternalData();
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div>
      <StatusCard />
      <TransectionModalCard />
      <TransactionList />
    </div>
  );
};

export default HomePage;
