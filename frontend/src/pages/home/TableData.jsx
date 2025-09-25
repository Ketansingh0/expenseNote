import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

import { deleteTransactions, editTransactions } from "../../utils/API";
import UpdateTransactionModal from "./UpdateTransactionModal";

const TableData = ({ transactions: initialTransactions, user, setRefresh }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDeleteId, setTransactionToDeleteId] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleEditClick = (transactionItem) => {
    setSelectedTransaction(transactionItem);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedTransaction(null);
  };

  const handleUpdateTransaction = async (id, updatedValues) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`${editTransactions}/${id}`, {
        ...updatedValues,
        userId: user._id,
      });

      if (data.success) {
        toast.success(data.message || "Transaction updated!", toastOptions);
        handleCloseUpdateModal();
        setRefresh((prev) => !prev);
      } else {
        toast.error(
          data.message || "Error updating transaction.",
          toastOptions
        );
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update transaction.", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setTransactionToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDeleteId) return;
    setIsLoading(true);
    setShowDeleteConfirm(false);

    try {
      const { data } = await axios.post(
        `${deleteTransactions}/${transactionToDeleteId}`,
        { userId: user._id }
      );

      if (data.success) {
        toast.success(data.message || "Transaction deleted!", toastOptions);
        setRefresh((prev) => !prev);
      } else {
        toast.error(data.message || "Error deleting.", toastOptions);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete.", toastOptions);
    } finally {
      setIsLoading(false);
      setTransactionToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setTransactionToDeleteId(null);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-xl p-4 animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                {["Date", "Title", "Amount", "Type", "Category", "Actions"].map(
                  (title, idx) => (
                    <th
                      key={title}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                        idx === 0 ? "rounded-tl-lg" : ""
                      } ${idx === 5 ? "rounded-tr-lg" : ""}`}
                    >
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700 text-gray-100">
              {transactions && transactions.length > 0 ? (
                transactions.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-700 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {moment(item.date).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ₹{item.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.transactionType === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.transactionType === "credit"
                          ? "Income"
                          : "Expense"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-blue-400 hover:text-blue-200"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className="text-red-400 hover:text-red-200"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-400 text-lg"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {selectedTransaction && (
        <UpdateTransactionModal
          isShow={showUpdateModal}
          onClose={handleCloseUpdateModal}
          transaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 animate-fade-in-scale">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
              <h2 className="text-xl font-bold text-gray-50">
                Confirm Deletion
              </h2>
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="py-2 px-5 rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`py-2 px-5 rounded-md text-white bg-red-600 hover:bg-red-700 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableData;
