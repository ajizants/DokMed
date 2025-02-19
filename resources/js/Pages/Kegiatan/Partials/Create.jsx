import React, { useState } from "react"; // Import useState from react
import { useForm } from "@inertiajs/react"; // Import useForm from Inertia.js
import FloatingInput from "@/Components/FloatingInput";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import ButtonBlue from "@/Components/ButtonBlue";
import Swal from "sweetalert2";
import FloatingSelect from "@/Components/FloatingSelect";

const CreateKegiatanForm = ({ user }) => {
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

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        kegiatan: "",
        tanggal: new Date().toISOString().split("T")[0],
        waktu_mulai: "",
        waktu_selesai: "",
        keterangan: "",
        user_id: user.id || "",
        name_user: user.name || "",
    });

    const handleChange = (event) => {
        setData(event.target.id, event.target.value);
    };

    const simpan = async (event) => {
        event.preventDefault();

        post(route("kegiatan.store"), {
            onSuccess: (response) => {
                console.log("Success:", response); // Tangkap respons sukses di sini
                const successMessage =
                    response.props.flash.success ||
                    "Kegiatan berhasil disimpan!";
                Swal.fire({
                    title: "Berhasil!",
                    text: response,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                reset(); // Reset form setelah sukses
            },
            onError: (errors) => {
                console.log("Error:", errors); // Tangkap respons error di sini
                Swal.fire({
                    title: "Gagal!",
                    text: errors,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <h2 className="mb-7 text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                Formulir Kegaiatan Harian
            </h2>

            <form onSubmit={simpan}>
                <div className="space-y-4">
                    <FloatingInput
                        type="text"
                        id="kegiatan"
                        value={formData.kegiatan}
                        label="Nama Kegiatan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="text"
                        id="keterangan"
                        value={formData.keterangan}
                        label="Keterangan"
                        onChange={handleChange}
                        kelas="mt-4"
                    />
                    <FloatingInput
                        type="date"
                        id="tanggal"
                        label="Tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_mulai"
                        value={formData.waktu_mulai}
                        label="Waktu Mulai"
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="time"
                        id="waktu_selesai"
                        value={formData.waktu_selesai}
                        label="Waktu Selesai"
                        onChange={handleChange}
                    />
                    <div className="sm:grid grid-cols-2 gap-4">
                        <FloatingInput
                            type="text"
                            id="user_id"
                            label="ID USER"
                            value={formData.user_id}
                            onChange={handleChange}
                        />
                        <FloatingInput
                            type="text"
                            id="name_user"
                            label="Nama User"
                            value={formData.name_user}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-2 flex justify-end space-x-2 mt-8">
                    <ButtonGreen type="submit" disabled={processing}>
                        Simpan
                    </ButtonGreen>
                    <ButtonRed type="button" onClick={() => reset()}>
                        Reset
                    </ButtonRed>
                </div>
            </form>
        </div>
    );
};

export default CreateKegiatanForm;
