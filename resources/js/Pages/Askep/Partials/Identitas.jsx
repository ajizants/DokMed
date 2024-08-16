import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingInput from "@/Components/FloatingInput";

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
                        <FloatingInput
                            type="text"
                            id="search_id"
                            label="Enter patient ID and press Enter or click Search"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
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
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="nik"
                                    label="NIK"
                                    value={patientData.nik || ""}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="nama"
                                    label="Nama"
                                    value={patientData.nama}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="alamat"
                                    label="Alamat"
                                    value={patientData.alamat}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-1 mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="no_hp"
                                    label="No HP"
                                    value={patientData.no_hp}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="date"
                                    id="tgl_lahir"
                                    label="Tanggal Lahir"
                                    value={patientData.tgl_lahir}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="gender"
                                    label="Jenis Kelamin"
                                    value={patientData.gender}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="pekerjaan"
                                    label="Pekerjaan"
                                    value={patientData.pekerjaan}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="id_user"
                                    label="User ID"
                                    value={patientData.id_user}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-1 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="name_user"
                                    label="User Name"
                                    value={patientData.user?.name || ""}
                                    readOnly
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
