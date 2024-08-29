import React, { useState } from "react";
import Swal from "sweetalert2";
import FloatingInput from "@/Components/FloatingInput";
import ModalCreatePatientForm from "@/Pages/Pasien/ModalCreatePasien";
import ButtonBlue from "@/Components/ButtonBlue";

function IdentityForm(user) {
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
        Toast.fire({
            title: "Loading...",
            icon: "info",
        });

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
                        modal.classList.remove("hidden");
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

    return (
        <div className="rounded-xl p-3">
            <ModalCreatePatientForm
                isVisible={showConfirmation}
                user={user.user}
            />

            <form onSubmit={pasienSearch}>
                <div className="flex gap-4 items-center">
                    <div className="flex-initial w-full lg:min-w-fit">
                        <FloatingInput
                            type="text"
                            id="search_id"
                            label="Cari No RM / NIK"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </div>
                    <ButtonBlue type="submit" className="mt-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </ButtonBlue>
                </div>
            </form>

            {patientData && (
                <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <h3 className="text-lg font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                        Patient Identity
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="lg:flex gap-3 sm:mt-0">
                            <div className="grid grid-col-2">
                                <div className="lg:flex-initial lg:w-64 mt-4">
                                    <FloatingInput
                                        type="text"
                                        id="norm"
                                        label="NORM"
                                        value={patientData.norm || ""}
                                        readOnly
                                    />
                                </div>
                                <div className="lg:flex-initial lg:w-2/4 mt-4">
                                    <FloatingInput
                                        type="text"
                                        id="nik"
                                        label="NIK"
                                        value={patientData.nik || ""}
                                        readOnly
                                    />
                                </div>
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
