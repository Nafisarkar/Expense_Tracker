import { Edit, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import React, { useRef } from "react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  note?: string;
  category: string;
}

interface TransactionItemProps {
  tx: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  tx,
  onEdit,
  onDelete,
}) => {
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const { id, type, amount, date, note } = tx;
  const isIncome = type === "income";

  // Determine styles and icon based on transaction type
  const colorClass = isIncome ? "text-success" : "text-error";
  const Icon = isIncome ? TrendingUp : TrendingDown;
  const formattedAmount = ` ${Math.trunc(amount)} $`;

  const handleDeleteClick = () => {
    deleteModalRef.current?.showModal();
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    deleteModalRef.current?.close();
  };

  const handleCancelDelete = () => {
    deleteModalRef.current?.close();
  };

  return (
    <div
      key={id}
      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out border-1 border-base-300"
    >
      <div className="card-body p-4 flex flex-row items-center justify-between gap-4 mx-3">
        {/* Left side: Icon and Details */}
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full bg-base-300`}>
            <Icon className={`h-6 w-6 ${colorClass}`} />
          </div>
          <div>
            <p className="font-bold text-lg capitalize">{type}</p>
            {note && <p className="text-sm text-base-content/60">{note}</p>}
          </div>
        </div>

        {/* Right side: Amount, Date, and Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-right">
            <p className={`font-mono font-bold text-xl ${colorClass}`}>
              {formattedAmount}
            </p>
            <p className="text-xs text-base-content/60">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3">
            <button
              className={`p-2 rounded-full bg-base-300 h-10 w-10 flex justify-center items-center`}
              onClick={() => onEdit(tx)}
            >
              <Edit className="h-4 w-4" />
            </button>

            <button
              className={`p-2 bg-base-300 rounded-full h-10 w-10 flex justify-center items-center`}
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal using dialog element */}
      <dialog ref={deleteModalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete This Transaction?</h3>
          <div className="modal-action">
            <button className="btn" onClick={handleCancelDelete}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancelDelete}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TransactionItem;
