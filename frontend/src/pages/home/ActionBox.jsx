import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ActionBox = ({ onEdit, onDelete, transactionId }) => {
  return (
    <div className="flex items-center space-x-3">
      {" "}
      <button
        onClick={() => onEdit(transactionId)}
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                   rounded-full p-1"
        aria-label="Edit transaction"
      >
        <EditNoteIcon sx={{ fontSize: 24 }} />{" "}
      </button>
      <button
        onClick={() => onDelete(transactionId)}
        className="text-red-500 hover:text-red-400 transition-colors duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800
                   rounded-full p-1"
        aria-label="Delete transaction"
      >
        <DeleteForeverIcon sx={{ fontSize: 22 }} />{" "}
      </button>
    </div>
  );
};

export default ActionBox;
