import React, { useState, useEffect } from "react";

const UpdateTransactionModal = ({
  isShow,
  onClose,
  transaction,
  onUpdate,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    category: "",
    transactionType: "credit",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormValues({
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        transactionType: transaction.transactionType,
        date: transaction.date.split("T")[0], // format YYYY-MM-DD
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(transaction._id, formValues);
  };

  if (!isShow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg animate-fade-in-scale">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formValues.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formValues.amount}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={formValues.category}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <select
            name="transactionType"
            value={formValues.transactionType}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="credit">Income</option>
            <option value="debit">Expense</option>
          </select>
          <input
            name="date"
            type="date"
            value={formValues.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransactionModal;
