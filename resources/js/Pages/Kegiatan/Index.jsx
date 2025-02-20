import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import CreateKegiatanForm from "./Partials/Create";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import Toast from "@/Components/Toast";
import FloatingInput from "@/Components/FloatingInput";
import ButtonBlue from "@/Components/ButtonBlue";

const columns = [
    {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
    },
    { Header: "Kegiatan", accessor: "kegiatan" },
    { Header: "Keterangan", accessor: "keterangan" },
    { Header: "Tanggal", accessor: "tanggal" },
    { Header: "Waktu Mulai", accessor: "waktu_mulai" },
    { Header: "Waktu Selesai", accessor: "waktu_selesai" },
    { Header: "Nama User", accessor: "name_user" },
    { Header: "ID", accessor: "id" },
];

export default function Index({ auth, data_kegiatan }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState({
        kegiatan: "",
        tanggal: "",
        waktu_mulai: "",
        waktu_selesai: "",
        keterangan: "",
        user_id: "",
        name_user: "",
    });
    const [tanggal, setTanggal] = useState({
        tanggal_awal: new Date().toISOString().split("T")[0],
        tanggal_akhir: new Date().toISOString().split("T")[0],
    });

    const handleEdit = (data) => {
        console.log("🚀 ~ handleEdit ~ data:", data);
        setEditMode(true);
        setSelectedData((prev) => ({
            ...prev, // 🛠️ Pastikan user_id & name_user tetap ada
            ...data, // 🛠️ Update data yang baru
            user_id: data.user_id || prev.user_id, // ⏳ Pertahankan user_id jika tidak ada di data
            name_user: data.name_user || prev.name_user, // ⏳ Pertahankan name_user jika tidak ada di data
        }));

        // Scroll ke atas
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [kegiatan, setKegiatan] = useState([]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data kegiatan akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Menghapus Data...",
                        text: "Mohon tunggu sebentar.",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    router.delete(route("kegiatan.destroy", id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Toast.fire({
                                icon: "success",
                                title: "Data kegiatan telah dihapus.",
                            });
                        },
                        onError: (errors) => {
                            Swal.fire({
                                title: "Gagal!",
                                text: "Terjadi kesalahan saat menghapus data.",
                                icon: "error",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                            });
                            console.error(errors);
                        },
                    });
                }
            }
        });
    };

    const handleChange = (event) => {
        setTanggal({ ...tanggal, [event.target.id]: event.target.value });
    };

    const handleFilter = () => {
        router.get(route("kegiatan.index"), {
            tanggal_awal: tanggal.tanggal_awal,
            tanggal_akhir: tanggal.tanggal_akhir,
        });
    };

    const resetEditMode = () => {
        setEditMode(false);
        setSelectedData(null);
    };

    const kegiatanDatas = data_kegiatan.map((data) => ({
        ...data,
        actions: (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEdit(data)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(data.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                >
                    Delete
                </button>
            </div>
        ),
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Kegiatan
                </h2>
            }
        >
            <Head title="Kegiatan" />

            <div className="py-6">
                <div className="md:max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="md:grid md:grid-cols-3 md:space-x-2 space-y-4 md:space-y-0">
                        <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full md:col-span-1">
                            <CreateKegiatanForm
                                user={auth.user}
                                existingData={selectedData}
                                editMode={editMode}
                                resetEditMode={resetEditMode}
                            />
                        </div>
                        <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full md:col-span-2">
                            <div className="mb-2">
                                <div>
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <FloatingInput
                                                type="date"
                                                id="tanggal_awal"
                                                value={tanggal.tanggal_awal}
                                                label="Tanggal Awal"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <span className="mx-8 text-gray-500 dark:text-white">
                                            to
                                        </span>
                                        <div className="relative">
                                            <FloatingInput
                                                type="date"
                                                id="tanggal_akhir"
                                                value={tanggal.tanggal_akhir}
                                                label="Tanggal Akhir"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative">
                                            <ButtonBlue
                                                type="submit"
                                                onClick={handleFilter}
                                            >
                                                Filter
                                            </ButtonBlue>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
                                Data Kegiatan
                            </h2>
                            <PaginatedTable
                                data={kegiatanDatas}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
