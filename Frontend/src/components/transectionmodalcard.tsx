import React, { useState } from "react";
import { X } from "lucide-react"; // Using lucide-react for a close icon
import { useAuth } from "@clerk/clerk-react";
import useTransectionStore from "../store/transectionstore";

const TransactionModalCard: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [txType, setTxType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const { getToken } = useAuth();
  const { addTransaction } = useTransectionStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getToken();
    if (!amount || !category) {
      return;
    }
    await addTransaction(
      token!,
      Math.abs(Number(amount)),
      txType,
      category,
      note
    );
    // close the modal programmatically
    const modalCheckbox = document.getElementById(
      "transaction_modal"
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }

    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor="transaction_modal"
        className="card bg-primary mx-4 h-12 text-center flex justify-center items-center text-ellipsis cursor-pointer"
      >
        <h1 className=" font-bold text-md text-primary-content">
          Add Transaction
        </h1>
      </label>

      {/* The modal */}
      <input type="checkbox" id="transaction_modal" className="modal-toggle " />
      <div className="modal modal-top" role="dialog">
        <div className="modal-box  relative p-12">
          {/* Close button */}
          <label
            htmlFor="transaction_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-12 top-12"
          >
            <X size={20} />
          </label>

          <h3 className="text-lg font-bold mb-4">Add a New Transaction</h3>

          {/* Form for transaction details */}
          <form className="space-y-3" onSubmit={handleOnSubmit}>
            {/* Amount */}
            <div className="form-control w-full space-y-1">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="2000"
                className="input input-bordered w-full"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  const val = Number(e.target.value);
                  if (val > 0) {
                    setTxType("income");
                  } else if (val < 0) {
                    setTxType("expense");
                  }
                }}
              />
            </div>

            {/* Category */}
            <div className="form-control w-full space-y-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Salary, Groceries"
                className="input input-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Note */}
            <div className="form-control flex flex-col space-y-1">
              <label className="label">
                <span className="label-text">Note (Optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Received salary from company"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <label htmlFor="transaction_modal" className="btn btn-ghost">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary">
                Add Transaction
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop to close the modal */}
        <label className="modal-backdrop" htmlFor="transaction_modal">
          Close
        </label>
      </div>
    </div>
  );
};

export default TransactionModalCard;
