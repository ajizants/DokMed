import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingInput from "@/Components/FloatingInput";
import CreatePatientForm from "./Create";

const ModalCreatePatientForm = () => {
    const [formData, setFormData] = useState({
        norm: "",
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/pasien", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Patient created successfully!", {
                    position: "top-center",
                });
                setFormData({
                    norm: "",
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
            } else {
                toast.error(data.error || "An error occurred", {
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`, {
                position: "top-right",
            });
            console.error("Network error:", error);
        }
    };

    return (
        <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                            data-modal-hide="static-modal"
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
                        <CreatePatientForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCreatePatientForm;
