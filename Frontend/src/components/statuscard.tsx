import { useUser } from "@clerk/clerk-react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import useTransectionStore from "../store/transectionstore";
import { useEffect, useState } from "react";

const StatusCard = () => {
  const { user, isLoaded } = useUser();
  const [mostRecentExpense, SetMostRecentExpense] = useState<number | null>(
    null
  );
  const [mostExpenceCategory, SetMostExpenseCategory] = useState<string | null>(
    null
  );
  const [mostRecentIncome, SetMostRecentIncome] = useState<number | null>(null);
  const [mostIncomeCategory, SetMostIncomeCategory] = useState<string | null>(
    null
  );

  const { incomeTotal, expenseTotal, balance, transactionlist } =
    useTransectionStore();

  useEffect(() => {
    // Helper function to find the most recent transaction of a given type
    const findMostRecent = (type: string) => {
      const filtered = transactionlist.filter((tx) => tx.type === type);
      if (filtered.length === 0) {
        return null;
      }
      // Create a copy using toSorted() (modern) or [...filtered].sort()
      const sorted = filtered.toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sorted[0];
    };

    const mostRecentExpense = findMostRecent("expense");
    const mostRecentIncome = findMostRecent("income");

    SetMostRecentExpense(mostRecentExpense?.amount ?? null);
    SetMostExpenseCategory(mostRecentExpense?.category ?? null);

    SetMostRecentIncome(mostRecentIncome?.amount ?? null);
    SetMostIncomeCategory(mostRecentIncome?.category ?? null);
  }, [transactionlist]);

  if (!isLoaded) {
    return (
      <div data-theme="night" className="p-4 ">
        <div className="card lg:card-side bg-base-200 shadow-2xl">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 animate-pulse">
              {/* Left Side Skeleton */}
              <div className="flex flex-col items-center text-center lg:text-left lg:items-start p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-primary border-opacity-30 lg:pr-8 mb-6 lg:mb-0 w-full max-w-xs">
                <div className="skeleton w-28 h-28 rounded-full mb-4"></div>
                <div className="skeleton h-8 w-48 mb-2"></div>
                <div className="skeleton h-4 w-64 mb-4"></div>
                <div className="skeleton h-8 w-24"></div>
              </div>
              {/* Right Side Skeleton */}
              <div className="flex-grow flex flex-col justify-center w-full">
                <div className="skeleton h-56 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Choose semantic colors dynamically
  const balanceColor = balance! >= 0 ? "text-success" : "text-error";

  return (
    <div className="p-4 ">
      <div className="card lg:card-side bg-base-200/70 backdrop-blur supports-[backdrop-filter]:bg-base-200/60 border border-base-300 shadow ">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8 ">
            {/* Left Side: User Info */}
            <div className="flex flex-col items-center text-center p-4 border-b lg:border-b-0 lg:border-r border-base-300/60 lg:pr-8 mb-6 lg:mb-0 lg:self-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
                  <img
                    src={
                      user?.imageUrl ??
                      "https://placehold.co/112x112/a3e635/1f2937?text=U"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <h2 className="card-title text-3xl font-bold text-base-content text-center w-full">
                {user?.fullName}
              </h2>
              <p className="text-base-content/70 mt-1 text-sm text-center w-full">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            {/* Right Side: Financial Stats */}
            <div className="flex-grow flex flex-col justify-center w-full">
              <div className="stats stats-vertical bg-base-300/70 rounded-lg w-full  border border-base-300">
                <div className="stat">
                  <div className="stat-figure text-success">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="stat-title">Total Income</div>
                  <div className=" stat-value text-success">${incomeTotal}</div>
                  <div className="stat-desc text-success/80">
                    ↗︎{" "}
                    {mostRecentIncome
                      ? `$${mostRecentIncome} from ${mostIncomeCategory}`
                      : "No income yet"}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-error">
                    <TrendingDown className="h-8 w-8" />
                  </div>
                  <div className="stat-title">Total Expenses</div>
                  <div className="stat-value text-error">${expenseTotal}</div>
                  <div className="stat-desc text-error/80">
                    ↘︎{" "}
                    {mostRecentExpense
                      ? `$${mostRecentExpense} from ${mostExpenceCategory}`
                      : "Better not west money"}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-info">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div className="stat-title">Balance</div>
                  <div className={`stat-value ${balanceColor}`}>${balance}</div>
                  <div className="stat-desc text-base-content/70">
                    Remaining
                  </div>
                </div>
              </div>

              {/* Removed Expense Tracker progress card as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
