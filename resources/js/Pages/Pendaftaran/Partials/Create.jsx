import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingInput from "@/Components/FloatingInput";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import ButtonBlue from "@/Components/ButtonBlue";

const CreatePatientForm = (user) => {
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
            <h2 className="mb-7 text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                Pendaftaran Pasien
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-3">
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
                        <ButtonBlue
                            type="button"
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                        >
                            <svg
                                className="bi bi-volume-up-fille"
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
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ButtonBlue>
                        <ButtonRed type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-skip-forward-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </ButtonRed>
                        {/* <!-- Main modal --> **/}
                        <div
                            id="default-modal"
                            tabIndex="-1"
                            aria-hidden="true"
                            className="hidden overflow-y-auto overflow-x-hidden
                            fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                        >
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Daftar Nomor Antrian
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
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Product name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Color
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Category
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Price
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            Apple MacBook Pro
                                                            17"
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            Silver
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Laptop
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $2999
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-volume-up-fill"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                                                    <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            Microsoft Surface
                                                            Pro
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            White
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Laptop PC
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $1999
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-volume-up-fill"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                                                    <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            Magic Mouse 2
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            Black
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Accessories
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $99
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-volume-up-fill"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                                                    <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            Google Pixel Phone
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            Gray
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Phone
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $799
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-volume-up-fill"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                                                    <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            Apple Watch 5
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            Red
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Wearables
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            $999
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-volume-up-fill"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                                                    <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
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
                                    </div> */}
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
                <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                        type="text"
                        id="pekerjaan"
                        label="Pekerjaan"
                        value={formData.pekerjaan}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="no_hp"
                        label="No HP"
                        value={formData.no_hp}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                        type="text"
                        id="gender"
                        label="Jenis Kelamin"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="date"
                        id="tgl_lahir"
                        label="Tanggal Lahir"
                        value={formData.tgl_lahir}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                        type="text"
                        id="id_user"
                        label="User ID"
                        value={user.user.id}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="name_user"
                        label="User Name"
                        value={user.user.name}
                        onChange={handleChange}
                    />
                </div>
                <ButtonGreen type="submit">Create Patient</ButtonGreen>
            </form>
        </div>
    );
};

export default CreatePatientForm;
