import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IdentityForm() {
    const [searchId, setSearchId] = useState("");
    const [patientData, setPatientData] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/pasien/${searchId}`);
            const data = await response.json();

            if (response.ok && data && Object.keys(data).length > 0) {
                toast.success("Patient found!", {
                    position: "top-center", // Use string instead of `toast.POSITION.TOP_center`
                });
                setPatientData(data);
            } else {
                toast.error("No patient found with this ID.", {
                    position: "top-center", // Use string instead of `toast.POSITION.TOP_center`
                });
                setPatientData(null); // Clear any previous data
            }
        } catch (error) {
            toast.error("An error occurred while fetching patient data.", {
                position: "top-right", // Use string instead of `toast.POSITION.TOP_RIGHT`
            });
            console.error("Network error:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSearch} className="">
                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <input
                            type="text"
                            inputMode="numeric"
                            id="search_id"
                            name="search_id"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Enter patient ID and press Enter or click Search"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>

            {patientData && (
                <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <h3 className="text-lg font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                        Patient Identity
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="nik"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    NIK
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    id="nik"
                                    name="nik"
                                    value={patientData.nik || ""}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="nama"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={patientData.nama}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="alamat"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="alamat"
                                    name="alamat"
                                    value={patientData.alamat}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-1 mt-2 ">
                                <label
                                    htmlFor="no_hp"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="no_hp"
                                    name="no_hp"
                                    value={patientData.no_hp}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="tgl_lahir"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="tgl_lahir"
                                    name="tgl_lahir"
                                    value={patientData.tgl_lahir}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2 ">
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    value={patientData.gender}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2 ">
                                <label
                                    htmlFor="pekerjaan"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    id="pekerjaan"
                                    name="pekerjaan"
                                    value={patientData.pekerjaan}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="id_user"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    id="id_user"
                                    name="id_user"
                                    value={patientData.id_user}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="lg:flex-1 mt-2">
                                <label
                                    htmlFor="name_user"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="name_user"
                                    name="name_user"
                                    value={patientData.user?.name || ""}
                                    readOnly
                                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IdentityForm;
