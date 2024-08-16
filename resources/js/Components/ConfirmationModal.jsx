import React from "react";
import ReactDOM from "react-dom";

const ConfirmationModal = ({ message, onConfirm, onCancel, isVisible }) => {
    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                isVisible ? "opacity-100 z-50" : "opacity-0 -z-10"
            }`}
        >
            <div
                className={`bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 ${
                    isVisible ? "scale-100" : "scale-90"
                }`}
            >
                <p className="text-lg mb-4">{message}</p>
                <div className="flex gap-2">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;
