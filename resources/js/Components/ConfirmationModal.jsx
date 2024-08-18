import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const ConfirmationModal = ({ message, onConfirm, onCancel, isVisible }) => {
    const confirmButtonRef = useRef(null);

    useEffect(() => {
        if (isVisible && confirmButtonRef.current) {
            confirmButtonRef.current.focus();
        }
    }, [isVisible]);

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
                <div className="flex mb-6 items-center justify-center">
                    <svg
                        className="w-[46px] h-[46px] text-yellow-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.6"
                            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
                <p className="text-lg mb-6">{message}</p>
                <div className="flex gap-4 items-center justify-center">
                    <button
                        ref={confirmButtonRef}
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
