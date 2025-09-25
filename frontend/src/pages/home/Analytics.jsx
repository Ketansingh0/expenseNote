import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Analytics = ({ transactions }) => {
  const validTransactions = Array.isArray(transactions) ? transactions : [];

  const TotalTransactions = validTransactions.length;
  const totalIncomeTransactions = validTransactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = validTransactions.filter(
    (item) => item.transactionType === "expense"
  );

  const totalIncomePercent =
    TotalTransactions > 0
      ? (totalIncomeTransactions.length / TotalTransactions) * 100
      : 0;
  const totalExpensePercent =
    TotalTransactions > 0
      ? (totalExpenseTransactions.length / TotalTransactions) * 100
      : 0;

  const totalTurnOver = validTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverIncome = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverExpense = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const TurnOverIncomePercent =
    totalTurnOver > 0 ? (totalTurnOverIncome / totalTurnOver) * 100 : 0;
  const TurnOverExpensePercent =
    totalTurnOver > 0 ? (totalTurnOverExpense / totalTurnOver) * 100 : 0;

  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const categoryColors = {
    Groceries: "pink-500", // Mapped from #FF6384
    Rent: "blue-500", // Mapped from #36A2EB
    Salary: "yellow-500", // Mapped from #FFCE56
    Tip: "teal-500", // Mapped from #4BC0C0
    Food: "purple-500", // Mapped from #9966FF
    Medical: "orange-500", // Mapped from #FF9F40
    Utilities: "lime-500", // Mapped from #8AC926
    Entertainment: "indigo-500", // Mapped from #6A4C93
    Transportation: "cyan-500", // Mapped from #1982C4
    Other: "red-500", // Mapped from #F45B69
  };

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Transactions Card */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 h-full flex flex-col justify-between animate-fade-in-up">
          <div className="pb-4 border-b border-gray-700 mb-4">
            <h3 className="text-xl font-bold text-gray-50">
              Total Transactions
            </h3>
          </div>
          <div className="flex flex-col items-start text-gray-100 mb-4 flex-grow">
            <p className="text-lg font-semibold mb-2">
              Total: <span className="text-blue-400">{TotalTransactions}</span>
            </p>
            <p className="text-lg font-semibold text-green-400 flex items-center">
              <ArrowDropUpIcon sx={{ fontSize: 28 }} /> Income:{" "}
              {totalIncomeTransactions.length}
            </p>
            <p className="text-lg font-semibold text-red-400 flex items-center">
              <ArrowDropDownIcon sx={{ fontSize: 28 }} /> Expense:{" "}
              {totalExpenseTransactions.length}
            </p>
          </div>
          <div className="flex justify-around items-center space-x-4">
            <div className="flex flex-col items-center animate-slide-in-left">
              <CircularProgressBar
                percentage={totalIncomePercent.toFixed(0)}
                color="green-500" // Tailwind green color
              />
              <span className="text-gray-300 text-sm mt-2">Income %</span>
            </div>
            <div className="flex flex-col items-center animate-slide-in-right">
              <CircularProgressBar
                percentage={totalExpensePercent.toFixed(0)}
                color="red-500" // Tailwind red color
              />
              <span className="text-gray-300 text-sm mt-2">Expense %</span>
            </div>
          </div>
        </div>

        {/* Total Turnover Card */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 h-full flex flex-col justify-between animate-fade-in-up delay-100">
          {" "}
          {/* Added delay */}
          <div className="pb-4 border-b border-gray-700 mb-4">
            <h3 className="text-xl font-bold text-gray-50">Total Turnover</h3>
          </div>
          <div className="flex flex-col items-start text-gray-100 mb-4 flex-grow">
            <p className="text-lg font-semibold mb-2 flex items-center">
              Total: <CurrencyRupeeIcon sx={{ fontSize: 20 }} />{" "}
              <span className="text-blue-400">{totalTurnOver.toFixed(2)}</span>
            </p>
            <p className="text-lg font-semibold text-green-400 flex items-center">
              <ArrowDropUpIcon sx={{ fontSize: 28 }} /> Income:{" "}
              <CurrencyRupeeIcon sx={{ fontSize: 20 }} />{" "}
              {totalTurnOverIncome.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-red-400 flex items-center">
              <ArrowDropDownIcon sx={{ fontSize: 28 }} /> Expense:{" "}
              <CurrencyRupeeIcon sx={{ fontSize: 20 }} />{" "}
              {totalTurnOverExpense.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-around items-center space-x-4">
            <div className="flex flex-col items-center animate-slide-in-left">
              <CircularProgressBar
                percentage={TurnOverIncomePercent.toFixed(0)}
                color="green-500"
              />
              <span className="text-gray-300 text-sm mt-2">Income %</span>
            </div>
            <div className="flex flex-col items-center animate-slide-in-right">
              <CircularProgressBar
                percentage={TurnOverExpensePercent.toFixed(0)}
                color="red-500"
              />
              <span className="text-gray-300 text-sm mt-2">Expense %</span>
            </div>
          </div>
        </div>

        {/* Categorywise Income Card */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 h-full animate-fade-in-up delay-200">
          {" "}
          {/* Added delay */}
          <div className="pb-4 border-b border-gray-700 mb-4">
            <h3 className="text-xl font-bold text-gray-50">
              Categorywise Income
            </h3>
          </div>
          <div className="space-y-4">
            {" "}
            {/* Spacing between progress bars */}
            {categories.map((category) => {
              const income = validTransactions
                .filter(
                  (transaction) =>
                    transaction.transactionType === "credit" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              const incomePercent =
                totalTurnOver > 0 ? (income / totalTurnOver) * 100 : 0;

              return (
                income > 0 && (
                  <LineProgressBar
                    key={category}
                    label={category}
                    percentage={incomePercent.toFixed(0)}
                    lineColor={categoryColors[category]}
                  />
                )
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 h-full animate-fade-in-up delay-300">
          {" "}
          <div className="pb-4 border-b border-gray-700 mb-4">
            <h3 className="text-xl font-bold text-gray-50">
              Categorywise Expense
            </h3>
          </div>
          <div className="space-y-4">
            {" "}
            {categories.map((category) => {
              const expenses = validTransactions
                .filter(
                  (transaction) =>
                    transaction.transactionType === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              const expensePercent =
                totalTurnOver > 0 ? (expenses / totalTurnOver) * 100 : 0;

              return (
                expenses > 0 && (
                  <LineProgressBar
                    key={category}
                    label={category}
                    percentage={expensePercent.toFixed(0)}
                    lineColor={categoryColors[category]}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
