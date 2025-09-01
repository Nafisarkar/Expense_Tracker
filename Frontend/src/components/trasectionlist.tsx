import { Loader } from "lucide-react";
import useTransectionStore from "../store/transectionstore";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import TransactionItem from "./transactionitem";
import EditTransactionModal from "./edittransactionmodal";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  note?: string;
  category: string;
}

const TransactionList = () => {
  const { getToken } = useAuth();
  const { transactionlist, loading, deleteTransaction, updateTransaction } =
    useTransectionStore();

  // State for edit modal
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleDelete = async (id: string) => {
    const token = await getToken();
    console.log("Delete transaction with id:", id);
    await deleteTransaction(id, token!);
  };

  const handleUpdate = async (transaction: Transaction) => {
    const token = await getToken();

    console.log("Update transaction with id:", transaction.id);
    await updateTransaction(Number(transaction.id), token!, {
      amount: Math.abs(Number(transaction.amount)),
      type: transaction.type,
      category: transaction.category,
      note: transaction.note,
    });

    // Reset state after successful update
    setEditingTransaction(null);
  };

  const onEdit = (tx: Transaction) => {
    console.log("Edit button clicked for transaction:", tx); // Debug log
    setEditingTransaction({ ...tx });
  };

  const handleCancel = () => {
    setEditingTransaction(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin " />
      </div>
    );
  }

  if (transactionlist.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
        <div>No transactions found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className=" mx-auto p-4 space-y-3">
        {transactionlist.map((tx) => (
          <TransactionItem
            key={tx.id}
            tx={tx}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        transaction={editingTransaction}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TransactionList;
