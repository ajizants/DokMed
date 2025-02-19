// import React, { useState } from "react"; // Import useState from react
// import { useForm } from "@inertiajs/react"; // Import useForm from Inertia.js
// import FloatingInput from "@/Components/FloatingInput";
// import ButtonGreen from "@/Components/ButtonGreen";
// import ButtonRed from "@/Components/ButtonRed";
// import ButtonBlue from "@/Components/ButtonBlue";
// import Swal from "sweetalert2";
// import FloatingSelect from "@/Components/FloatingSelect";

// const CreateKegiatanForm = ({ user }) => {
//     const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         iconColor: "white",
//         customClass: {
//             popup: "colored-toast",
//         },
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//     });

//     const {
//         data: formData,
//         setData,
//         post,
//         processing,
//         errors,
//         reset,
//     } = useForm({
//         kegiatan: "",
//         tanggal: new Date().toISOString().split("T")[0],
//         waktu_mulai: "",
//         waktu_selesai: "",
//         keterangan: "",
//         user_id: user.id || "",
//         name_user: user.name || "",
//     });

//     const handleChange = (event) => {
//         setData(event.target.id, event.target.value);
//     };

//     const simpan = async (event) => {
//         event.preventDefault();

//         Swal.fire({
//             title: "Menyimpan...",
//             text: "Mohon tunggu sebentar.",
//             allowOutsideClick: false,
//             allowEscapeKey: false,
//             showConfirmButton: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             },
//         });

//         post(route("kegiatan.store"), {
//             preserveScroll: true, // Agar halaman tidak reload
//             onSuccess: (response) => {
//                 console.log("Success:", response);

//                 // Ambil flash message dengan pengecekan lengkap
//                 const successMessage =
//                     response?.props?.flash?.success ||
//                     "Kegiatan berhasil disimpan!";

//                 Swal.fire({
//                     title: "Berhasil!",
//                     text: successMessage,
//                     icon: "success",
//                     confirmButtonText: "OK",
//                 });

//                 // Reset form setelah sukses
//                 reset();

//                 // Update tabel jika ada data baru
//                 if (response?.props?.flash?.newData) {
//                     setKegiatan((prev) => [
//                         response.props.flash.newData,
//                         ...prev,
//                     ]);
//                 }
//             },
//             onError: (errors) => {
//                 console.log("Error:", errors);

//                 Swal.fire({
//                     title: "Gagal!",
//                     text: errors?.message || "Terjadi kesalahan!",
//                     icon: "error",
//                     confirmButtonText: "OK",
//                 });
//             },
//         });
//     };

//     return (
//         <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
//             <h2 className="mb-7 text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
//                 Formulir Kegaiatan Harian
//             </h2>

//             <form onSubmit={simpan}>
//                 <div className="space-y-4">
//                     <FloatingInput
//                         type="text"
//                         id="kegiatan"
//                         value={formData.kegiatan}
//                         label="Nama Kegiatan"
//                         onChange={handleChange}
//                         kelas="mt-4"
//                     />
//                     <FloatingInput
//                         type="text"
//                         id="keterangan"
//                         value={formData.keterangan}
//                         label="Keterangan"
//                         onChange={handleChange}
//                         kelas="mt-4"
//                     />
//                     <FloatingInput
//                         type="date"
//                         id="tanggal"
//                         label="Tanggal"
//                         value={formData.tanggal}
//                         onChange={handleChange}
//                     />
//                     <FloatingInput
//                         type="time"
//                         id="waktu_mulai"
//                         value={formData.waktu_mulai}
//                         label="Waktu Mulai"
//                         onChange={handleChange}
//                     />
//                     <FloatingInput
//                         type="time"
//                         id="waktu_selesai"
//                         value={formData.waktu_selesai}
//                         label="Waktu Selesai"
//                         onChange={handleChange}
//                     />
//                     {/* <div className="sm:grid grid-cols-2 gap-4 space-y-3"> */}
//                     <FloatingInput
//                         type="text"
//                         id="user_id"
//                         label="ID USER"
//                         value={formData.user_id}
//                         onChange={handleChange}
//                     />
//                     <FloatingInput
//                         type="text"
//                         id="name_user"
//                         label="Nama User"
//                         value={formData.name_user}
//                         onChange={handleChange}
//                     />
//                     {/* </div> */}
//                 </div>
//                 <div className="col-span-2 flex justify-end space-x-2 mt-8">
//                     <ButtonGreen type="submit" disabled={processing}>
//                         Simpan
//                     </ButtonGreen>
//                     <ButtonRed type="button" onClick={() => reset()}>
//                         Reset
//                     </ButtonRed>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateKegiatanForm;

import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import FloatingInput from "@/Components/FloatingInput";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import Swal from "sweetalert2";

const CreateKegiatanForm = ({
    user,
    existingData,
    editMode,
    resetEditMode,
}) => {
    const { data, setData, post, put, processing, reset } = useForm({
        kegiatan: "",
        tanggal: new Date().toISOString().split("T")[0],
        waktu_mulai: "",
        waktu_selesai: "",
        keterangan: "",
        user_id: user.id || "",
        name_user: user.name || "",
    });

    // Jika `existingData` berubah, isi form dengan data baru
    useEffect(() => {
        if (editMode && existingData) {
            setData({
                kegiatan: existingData.kegiatan,
                tanggal: existingData.tanggal,
                waktu_mulai: existingData.waktu_mulai,
                waktu_selesai: existingData.waktu_selesai,
                keterangan: existingData.keterangan,
                user_id: existingData.user_id,
                name_user: existingData.name_user,
            });
        } else {
            reset(); // Reset form jika tidak dalam mode edit
        }
    }, [existingData, editMode]);

    const handleChange = (event) => {
        setData(event.target.id, event.target.value);
    };

    const simpan = (event) => {
        event.preventDefault();
        Swal.fire({
            title: editMode ? "Mengupdate Data..." : "Menyimpan...",
            text: "Mohon tunggu sebentar.",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        if (editMode) {
            put(route("kegiatan.update", existingData.id), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire(
                        "Berhasil!",
                        "Kegiatan berhasil diperbarui!",
                        "success",
                    );
                    resetForm();
                },
            });
        } else {
            post(route("kegiatan.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire(
                        "Berhasil!",
                        "Kegiatan berhasil disimpan!",
                        "success",
                    );
                    resetForm();
                },
            });
        }
    };

    const resetForm = () => {
        reset();
        resetEditMode();
    };

    return (
        <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <h2 className="mb-7 text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                {editMode ? "Edit Kegiatan" : "Formulir Kegiatan Harian"}
            </h2>
            <form onSubmit={simpan}>
                <div className="space-y-4">
                    <FloatingInput
                        type="text"
                        id="kegiatan"
                        value={data.kegiatan}
                        label="Nama Kegiatan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="text"
                        id="keterangan"
                        value={data.keterangan}
                        label="Keterangan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="date"
                        id="tanggal"
                        label="Tanggal"
                        value={data.tanggal}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_mulai"
                        value={data.waktu_mulai}
                        label="Waktu Mulai"
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_selesai"
                        value={data.waktu_selesai}
                        label="Waktu Selesai"
                        onChange={handleChange}
                    />
                    {/* <div className="sm:grid grid-cols-2 gap-4 space-y-3"> */}
                    <FloatingInput
                        type="text"
                        id="user_id"
                        label="ID USER"
                        value={data.user_id}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="name_user"
                        label="Nama User"
                        value={data.name_user}
                        onChange={handleChange}
                    />
                    {/* </div> */}
                </div>

                <div className="mt-8 flex justify-end space-x-2">
                    <ButtonGreen type="submit" disabled={processing}>
                        {editMode ? "Update" : "Simpan"}
                    </ButtonGreen>
                    <ButtonRed type="button" onClick={resetForm}>
                        Reset
                    </ButtonRed>
                </div>
            </form>
        </div>
    );
};

export default CreateKegiatanForm;
