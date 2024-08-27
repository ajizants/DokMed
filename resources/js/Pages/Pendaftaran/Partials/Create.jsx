import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingInput from "@/Components/FloatingInput";

const CreatePatientForm = () => {
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
        <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <ToastContainer />
            <h3 className="mb-3 text-lg font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                Pendaftaran Pasien
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid-flow-col">
                        <FloatingInput
                            type="text"
                            id="noAntri"
                            label="No Antri"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid-flow-col">
                        <button
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
                                <path
                                    fillRule="evenodd"
                                    d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
                                    clip-rule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                        {/* <!-- Main modal --> */}
                        <div
                            id="default-modal"
                            tabIndex="-1"
                            aria-hidden="true"
                            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                        >
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Terms of Service
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="default-modal"
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
                                            <span className="sr-only">
                                                Close modal
                                            </span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 space-y-4">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            With less than a month to go before
                                            the European Union enacts new
                                            consumer privacy laws for its
                                            citizens, companies around the world
                                            are updating their terms of service
                                            agreements to comply.
                                        </p>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            The European Union’s General Data
                                            Protection Regulation (G.D.P.R.)
                                            goes into effect on May 25 and is
                                            meant to ensure a common set of data
                                            rights in the European Union. It
                                            requires organizations to notify
                                            users as soon as possible of
                                            high-risk data breaches that could
                                            personally affect them.
                                        </p>
                                    </div>
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                            data-modal-hide="default-modal"
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            I accept
                                        </button>
                                        <button
                                            data-modal-hide="default-modal"
                                            type="button"
                                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FloatingInput
                    type="text"
                    id="norm"
                    label="NORM"
                    value={formData.norm}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="nik"
                    label="NIK"
                    value={formData.nik}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="nama"
                    label="Nama"
                    value={formData.nama}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="alamat"
                    label="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="no_hp"
                    label="No HP"
                    value={formData.no_hp}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="date"
                    id="tgl_lahir"
                    label="Tanggal Lahir"
                    value={formData.tgl_lahir}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="gender"
                    label="Jenis Kelamin"
                    value={formData.gender}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="pekerjaan"
                    label="Pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="id_user"
                    label="User ID"
                    value={formData.id_user}
                    onChange={handleChange}
                />
                <FloatingInput
                    type="text"
                    id="name_user"
                    label="User Name"
                    value={formData.name_user}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Create Patient
                </button>
            </form>
        </div>
    );
};

export default CreatePatientForm;
