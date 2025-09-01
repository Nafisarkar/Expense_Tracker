import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { showCustomToast } from "../components/customtoaster";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  note?: string;
  category: string;
}

interface State {
  transactionlist: Transaction[];
  loading: boolean;
  incomeTotal?: number;
  expenseTotal?: number;
  balance?: number;
}

interface Action {
  fetchTransaction: (token: string) => Promise<void>;
  addTransaction: (
    token: string,
    amount: number,
    type: "income" | "expense",
    category: string,
    note: string
  ) => Promise<void>;
  deleteTransaction: (id: string, token: string) => Promise<void>;
  updateTransaction: (
    id: number,
    token: string,
    data: Partial<Transaction>
  ) => Promise<void>;
}

const useTransectionStore = create<State & Action>()(
  devtools((set, get) => ({
    transactionlist: [],
    loading: false,
    incomeTotal: 0,
    expenseTotal: 0,
    balance: 0,
    fetchTransaction: async (token: string) => {
      set({ loading: true });
      // fetch transaction list from backend and set to state
      await axios
        .get("http://localhost:3000/api/expense/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {

          set({ transactionlist: response.data.transactionsList });
          let tempIncome = 0;
          let tempExpense = 0;
          let tempBalance = 0;
          response.data.transactionsList.forEach(
            (singleTransection: Transaction) => {
              if (singleTransection.type === "income") {
                tempIncome += Number(singleTransection.amount);
              } else {
                tempExpense += Number(singleTransection.amount);
              }
            }
          );
          tempBalance = tempIncome - tempExpense;
          set({
            incomeTotal: tempIncome,
            expenseTotal: tempExpense,
            balance: tempBalance,
          });
        })
        .catch((error) => {
          console.error("Error fetching transaction list:", error);
        });
      set({ loading: false });
    },
    addTransaction: async (
      token: string,
      amount: number,
      type: "income" | "expense",
      category: string,
      note: string
    ) => {
      set({ loading: true });
      await axios
        .post(
          "http://localhost:3000/api/expense/",
          {
            amount: Number(amount),
            type,
            category,
            note,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 201) {
            showCustomToast({
              message: "Added successfully!",
              type: "success",
            });

          }
        })
        .catch((error) => {
          console.error("There was an error adding the transaction!", error);
        });
      set({ loading: false });
      // refetch transaction list
      get().fetchTransaction(token);
    },
    deleteTransaction: async (id: string, token: string) => {
      set({ loading: true });
      await axios
        .delete(`http://localhost:3000/api/expense/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            showCustomToast({
              message: "Deleted successfully!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the transaction!", error);
        });
      set({ loading: false });
      // refetch transaction list
      get().fetchTransaction(token);
    },
    updateTransaction: async (
      id: string,
      token: string,
      data: Partial<Transaction>
    ) => {
      set({ loading: true });
      await axios
        .put("http://localhost:3000/api/expense/" + id, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            showCustomToast({
              message: "Updated successfully!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.error("There was an error updating the transaction!", error);
        });
      set({ loading: false });
      // refetch transaction list
      get().fetchTransaction(token);
    },
  }))
);

export default useTransectionStore;
