import React, { useState, useEffect } from "react";
// No need for react-bootstrap imports

const UpdateTransactionModal = ({
  transaction,
  onClose,
  isShow,
  onUpdate,
  isLoading,
}) => {
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  useEffect(() => {
    if (transaction && isShow) {
      setValues({
        title: transaction.title || "",
        amount: transaction.amount || "",
        description: transaction.description || "",
        category: transaction.category || "",
        date: transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : "",
        transactionType: transaction.transactionType || "",
      });
    }
  }, [transaction, isShow]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(transaction._id, values);
    }
  };

  if (!isShow) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 animate-fade-in-scale">
      {/* Modal Content */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto transform scale-100 transition-all duration-300 ease-out">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-xl font-bold text-gray-50">
            Update Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body - Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={transaction.title}
              value={values.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder={transaction.amount} // Placeholder uses actual amount
              value={values.amount}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
                required
              >
                <option value="">Choose...</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Tip">Tip</option>
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder={transaction.description}
              value={values.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="transactionType"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Transaction Type
            </label>
            <div className="relative">
              <select
                id="transactionType"
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
                className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
                required
              >
                <option value="">Choose...</option>
                <option value="credit">Income</option>{" "}
                <option value="expense">Expense</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 rounded-md font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-5 rounded-md font-semibold text-white
                          ${
                            isLoading
                              ? "bg-blue-700 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }
                          transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransactionModal;
