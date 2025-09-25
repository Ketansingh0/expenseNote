import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addTransaction, getTransactions } from "../../utils/API";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import Analytics from "./Analytics";
import DatePicker from "react-datepicker";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";

const Home = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const [cUser, setcUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const [newTransactionValues, setNewTransactionValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleStartChange = (date) => setStartDate(date);
  const handleEndChange = (date) => setEndDate(date);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTransactionValues({
      title: "",
      amount: "",
      description: "",
      category: "",
      date: "",
      transactionType: "",
    });
  };

  const handleTransactionFormChange = (e) => {
    setNewTransactionValues({
      ...newTransactionValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFrequency = (e) => setFrequency(e.target.value);
  const handleSetType = (e) => setType(e.target.value);

  const handleSubmitNewTransaction = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      newTransactionValues;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please fill in all transaction fields.", toastOptions);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(addTransaction, {
        title,
        amount,
        description,
        category,
        date,
        transactionType,
        userId: cUser._id,
      });

      if (data.success === true) {
        toast.success(data.message, toastOptions);
        handleCloseModal();
        setRefresh(!refresh);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.error("Add transaction error:", error);
      toast.error("Failed to add transaction. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  const handleTableClick = () => setView("table");
  const handleChartClick = () => setView("chart");

  useEffect(() => {
    const checkUserAndAvatar = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));

        setcUser(user);
        setRefresh((prev) => !prev);
      }
    };
    checkUserAndAvatar();
  }, [navigate]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      if (!cUser?._id) return;

      setLoading(true);
      try {
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency: frequency,
          startDate: startDate,
          endDate: endDate,
          type: type,
        });
        setTransactions(data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  return (
    <>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto flex-grow">
              <label
                htmlFor="frequency-select"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Select Frequency
              </label>
              <div className="relative">
                <select
                  id="frequency-select"
                  name="frequency"
                  value={frequency}
                  onChange={handleChangeFrequency}
                  className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="7">Last Week</option>
                  <option value="30">Last Month</option>
                  <option value="365">Last Year</option>
                  <option value="custom">Custom</option>
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

            {/* Type Filter */}
            <div className="w-full md:w-auto flex-grow">
              <label
                htmlFor="type-select"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Type
              </label>
              <div className="relative">
                <select
                  id="type-select"
                  name="type"
                  value={type}
                  onChange={handleSetType}
                  className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="all">All</option>
                  <option value="expense">Expense</option>
                  <option value="credit">Income</option>{" "}
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

            {/* View Toggles */}
            <div className="flex space-x-2 w-full md:w-auto justify-center md:justify-start">
              <button
                onClick={handleTableClick}
                className={`p-2 rounded-md transition duration-200 ease-in-out
                                ${
                                  view === "table"
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }
                                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="View as table"
              >
                <FormatListBulletedIcon sx={{ fontSize: 24 }} />
              </button>
              <button
                onClick={handleChartClick}
                className={`p-2 rounded-md transition duration-200 ease-in-out
                                ${
                                  view === "chart"
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }
                                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="View as chart/analytics"
              >
                <BarChartIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            {/* Add New Button */}
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <button
                onClick={handleOpenModal}
                className="hidden md:block py-2 px-4 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New
              </button>
              <button
                onClick={handleOpenModal}
                className="block md:hidden w-10 h-10 rounded-full font-bold text-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Add new transaction"
              >
                +
              </button>
            </div>
          </div>

          {/* Custom Date Range Picker (Conditional Render) */}
          {frequency === "custom" && (
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 bg-gray-800 p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="startDate"
                  className="text-gray-300 text-sm font-medium mb-1"
                >
                  Start Date:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  wrapperClassName="date-picker-wrapper"
                />
              </div>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="endDate"
                  className="text-gray-300 text-sm font-medium mb-1"
                >
                  End Date:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  wrapperClassName="date-picker-wrapper"
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <button
              onClick={handleResetFilters}
              className="py-2 px-6 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reset Filters
            </button>
          </div>

          {view === "table" ? (
            <TableData
              transactions={transactions}
              user={cUser}
              setRefresh={setRefresh}
            />
          ) : (
            <Analytics transactions={transactions} user={cUser} />
          )}

          <ToastContainer />

          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
              {" "}
              <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto h-auto max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300 ease-out">
                {" "}
                <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
                  <h2 className="text-xl font-bold text-gray-50">
                    Add New Transaction
                  </h2>
                  <button
                    onClick={handleCloseModal}
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
                <form
                  onSubmit={handleSubmitNewTransaction}
                  className="space-y-4"
                >
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
                      placeholder="e.g., Groceries from SuperMart"
                      value={newTransactionValues.title}
                      onChange={handleTransactionFormChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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
                      placeholder="e.g., 500"
                      value={newTransactionValues.amount}
                      onChange={handleTransactionFormChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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
                        value={newTransactionValues.category}
                        onChange={handleTransactionFormChange}
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
                      placeholder="Optional details about the transaction"
                      value={newTransactionValues.description}
                      onChange={handleTransactionFormChange}
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
                        value={newTransactionValues.transactionType}
                        onChange={handleTransactionFormChange}
                        className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="credit">Income</option>
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
                      value={newTransactionValues.date}
                      onChange={handleTransactionFormChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="py-2 px-5 rounded-md font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`py-2 px-5 rounded-md font-semibold text-white
                                      ${
                                        loading
                                          ? "bg-blue-700 cursor-not-allowed"
                                          : "bg-blue-600 hover:bg-blue-700"
                                      }
                                      transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      disabled={loading}
                    >
                      {loading ? (
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
                          Adding...
                        </span>
                      ) : (
                        "Add Transaction"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
