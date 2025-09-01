import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  note?: string;
  category: string;
}

interface EditTransactionModalProps {
  transaction: Transaction | null;
  onUpdate: (transaction: Transaction) => void;
  onCancel: () => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  transaction,
  onUpdate,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<Transaction | null>(null);

  // Open/close modal based on transaction prop
  useEffect(() => {
    if (transaction && dialogRef.current) {
      setFormData({ ...transaction });
      // Use setTimeout to ensure the DOM is ready
      setTimeout(() => {
        dialogRef.current?.showModal();
      }, 0);
    } else if (!transaction && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [transaction]);

  const handleInputChange = (
    field: keyof Transaction,
    value: string | number
  ) => {
    setFormData((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
    }
  };

  const handleCancel = () => {
    onCancel();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (!transaction) {
    return (
      <dialog ref={dialogRef} className="modal">
        {/* Empty modal that stays in DOM */}
      </dialog>
    );
  }

  if (!formData) {
    return (
      <dialog ref={dialogRef} className="modal">
        {/* Modal with form data loading */}
      </dialog>
    );
  }

  return (
    <dialog ref={dialogRef} className="modal modal-bottom">
      <div className="modal-box relative p-12">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-12 top-12"
          onClick={handleCancel}
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold mb-4">Edit Transaction</h3>

        {/* Form for transaction details */}
        <form className="space-y-3" onSubmit={handleSubmit}>
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
              value={formData.amount}
              onChange={(e) => {
                const value = Number(e.target.value);
                handleInputChange("amount", value);
                handleInputChange("type", value > 0 ? "income" : "expense");
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
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
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
              value={formData.note || ""}
              onChange={(e) => handleInputChange("note", e.target.value)}
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action ">
            <button type="button" className="btn " onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Transaction
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop to close the modal */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleCancel}>close</button>
      </form>
    </dialog>
  );
};

export default EditTransactionModal;
