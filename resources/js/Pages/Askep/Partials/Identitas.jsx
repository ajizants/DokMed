import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";

import FloatingInput from "@/Components/FloatingInput";
import ConfirmationModal from "@/Components/ConfirmationModal";
import ModalCreatePatientForm from "@/Pages/Pasien/ModalCreatePasien";

function IdentityForm() {
    const [searchId, setSearchId] = useState("");
    const [patientData, setPatientData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const pasienSearch = async (event) => {
        event.preventDefault();

        const paddedSearchId = searchId.padStart(6, "0");

        try {
            const response = await fetch(`/pasien/${paddedSearchId}`);
            const data = await response.json();

            if (response.ok) {
                if (data.error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Do you want to continue",
                        icon: "error",
                        confirmButtonText: "Cool",
                    });
                } else {
                    Toast.fire({
                        title: "Success!",
                        text: "Pasien Ditemukan..!!",
                        icon: "success",
                    });
                    setPatientData(data);
                }
            } else {
                // setShowConfirmation(true);
                Swal.fire({
                    title: "Pasien belum terdaftar..!!!",
                    text: "Lanjutkan ke pendaftaran pasien?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const modal = document.getElementById("static-modal");
                        modal.classList.remove("hidden"); // Menampilkan modal
                        modal.classList.add("flex");
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
            });
            console.error("Network error:", error);
        }
    };

    const handleConfirm = () => {
        const modal = document.getElementById("static-modal");
        modal.classList.remove("hidden"); // Menampilkan modal
        modal.classList.add("flex");
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            {/* <ConfirmationModal
                message="Pasien Tidak Ditemukan, Ingin Menambahkan Pasien...?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isVisible={showConfirmation}
            /> */}
            <ModalCreatePatientForm isVisible={showConfirmation} />

            <form onSubmit={pasienSearch} className="">
                <div className="flex gap-4 items-center">
                    <div className="flex-initial w-full">
                        <FloatingInput
                            type="text"
                            id="search_id"
                            label="Cari No RM / NIK"
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
                    <button
                        // onClick={handleConfirm}
                        data-modal-target="static-modal"
                        data-modal-toggle="static-modal"
                        className="inline-flex text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32"
                        type="button"
                    >
                        Add Pasien
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
                            <div className="lg:flex-initial w-64 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="norm"
                                    label="NORM"
                                    value={patientData.norm || ""}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-2/4 mt-4">
                                <FloatingInput
                                    type="text"
                                    id="nik"
                                    label="NIK"
                                    value={patientData.nik || ""}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-full mt-4">
                                <FloatingInput
                                    type="text"
                                    id="nama"
                                    label="Nama"
                                    value={patientData.nama}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-full mt-4">
                                <FloatingInput
                                    type="text"
                                    id="alamat"
                                    label="Alamat"
                                    value={patientData.alamat}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-initial w-full mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="no_hp"
                                    label="No HP"
                                    value={patientData.no_hp}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-full mt-4">
                                <FloatingInput
                                    type="date"
                                    id="tgl_lahir"
                                    label="Tanggal Lahir"
                                    value={patientData.tgl_lahir}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-full mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="gender"
                                    label="Jenis Kelamin"
                                    value={patientData.gender}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial w-full mt-4 ">
                                <FloatingInput
                                    type="text"
                                    id="pekerjaan"
                                    label="Pekerjaan"
                                    value={patientData.pekerjaan}
                                    readOnly
                                />
                            </div>
                        </div> */}
                        {/* <div className="lg:flex gap-3 sm:mt-0">
                            <div className="lg:flex-initial mt-4">
                                <FloatingInput
                                    type="text"
                                    id="id_user"
                                    label="User ID"
                                    value={patientData.id_user}
                                    readOnly
                                />
                            </div>
                            <div className="lg:flex-initial mt-4">
                                <FloatingInput
                                    type="text"
                                    id="name_user"
                                    label="User Name"
                                    value={patientData.user?.name || ""}
                                    readOnly
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default IdentityForm;
