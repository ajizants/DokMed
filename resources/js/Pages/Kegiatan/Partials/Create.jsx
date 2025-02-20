import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import FloatingInput from "@/Components/FloatingInput";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "white",
    customClass: {
        popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

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

        const formMethod = editMode ? put : post;
        const routeName = editMode
            ? route("kegiatan.update", existingData.id)
            : route("kegiatan.store");

        formMethod(routeName, {
            preserveScroll: true,
            preserveState: true, // 🛠️ Agar form tidak di-reset jika validasi gagal
            onSuccess: () => {
                Toast.fire({
                    title: "Berhasil!",
                    text: editMode
                        ? "Kegiatan berhasil diperbarui!"
                        : "Kegiatan berhasil disimpan!",
                    icon: "success",
                });
                resetForm();
            },
            onError: (errors) => {
                console.error("Kesalahan Validasi:", errors);
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat menyimpan data. Periksa kembali input Anda.",
                    "error",
                );
            },
        });
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
                        value={data.kegiatan || ""}
                        label="Nama Kegiatan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="text"
                        id="keterangan"
                        value={data.keterangan || ""}
                        label="Keterangan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="date"
                        id="tanggal"
                        value={data.tanggal || ""}
                        label="Tanggal"
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_mulai"
                        value={data.waktu_mulai || ""}
                        label="Waktu Mulai"
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_selesai"
                        value={data.waktu_selesai || ""}
                        label="Waktu Selesai"
                        onChange={handleChange}
                    />
                    {/* <div className="sm:grid grid-cols-2 gap-4 space-y-3"> */}
                    <FloatingInput
                        type="text"
                        id="user_id"
                        value={data.user_id || ""}
                        label="ID USER"
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="name_user"
                        value={data.name_user || ""}
                        label="Nama User"
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
