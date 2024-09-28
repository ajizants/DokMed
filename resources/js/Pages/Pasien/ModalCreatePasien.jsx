import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CreatePatientForm from "./Create";

const ModalCreatePatientForm = (user) => {
    const [formData, setFormData] = useState({
        no_rmm: "",
        nik: "",
        nama: "",
        alamat: "",
        no_hp: "",
        tgl_lahir: "",
        gender: "",
        pekerjaan: "",
        id_user: "",
        name_user: "",
    });
    return (
        <div
            id="static-modal"
            tabIndex="-1"
            className="hidden scrollable-content fixed top-0 right-0 left-0 z-50 justify-center items-center bg-black bg-opacity-50 w-full md:inset-0 max-h-full"
        >
            <div className="relative p-4 w-full max-w-6xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Form Pendaftaran Pasien
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                                const modal =
                                    document.getElementById("static-modal");
                                modal.classList.add("hidden");
                                modal.classList.remove("flex");
                            }}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5 space-y-4">
                        <CreatePatientForm user={user.user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCreatePatientForm;
