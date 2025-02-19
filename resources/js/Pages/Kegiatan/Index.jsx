// import PaginatedTable from "@/Components/Table";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import CreateKegiatanForm from "./Partials/Create";
// const columns = [
//     { Header: "ID", accessor: "id" },
//     { Header: "Nama User", accessor: "nama_user" },
//     { Header: "Kegiatan", accessor: "kegiatan" },
//     { Header: "Tanggal", accessor: "tanggal" },
//     { Header: "Waktu Mulai", accessor: "waktu_mulai" },
//     { Header: "Waktu Selesai", accessor: "waktu_selesai" },
//     { Header: "Keterangan", accessor: "keterangan" },
//     {
//         Header: "Actions",
//         accessor: "actions",
//         disableSortBy: true, // Opsional, agar tidak bisa diurutkan
//     },
// ];

// export default function Index({ auth, data_kegiatan }) {
//     console.log("🚀 ~ Index ~ data_kegiatan:", data_kegiatan);

//     const handleEdit = (data) => {
//         setEditMode(true);
//         setSelectedId(data.id); // Simpan ID yang sedang diedit
//         setData({
//             kegiatan: data.kegiatan,
//             tanggal: data.tanggal,
//             waktu_mulai: data.waktu_mulai,
//             waktu_selesai: data.waktu_selesai,
//             keterangan: data.keterangan,
//             user_id: data.user_id,
//             name_user: data.name_user,
//         });
//     };

//     const handleDelete = (id) => {
//         console.log("Hapus data ID:", id);
//         Swal.fire({
//             title: "Apakah Anda yakin?",
//             text: "Data akan dihapus secara permanen!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Ya, Hapus",
//             cancelButtonText: "Batal",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Panggil API atau metode delete di sini
//                 console.log("Menghapus ID:", id);
//             }
//         });
//     };

//     const kegiatanDatas = data_kegiatan.map((data) => ({
//         ...data,
//         actions: (
//             <div className="flex space-x-2">
//                 <button
//                     onClick={() => handleEdit(data)}
//                     className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => handleDelete(data.id)}
//                     className="px-2 py-1 text-sm bg-red-500 text-white rounded"
//                 >
//                     Delete
//                 </button>
//             </div>
//         ),
//     }));

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//                     Profile
//                 </h2>
//             }
//         >
//             <Head title="Kegiatan" />

//             <div className="py-6">
//                 <div className="md:max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
//                     <div className="md:grid md:grid-cols-3 md:space-x-2 space-y-4 md:space-y-0">
//                         <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full md:col-span-1">
//                             <CreateKegiatanForm user={auth.user} />
//                         </div>
//                         <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full md:col-span-2">
//                             <PaginatedTable
//                                 data={kegiatanDatas}
//                                 columns={columns}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import CreateKegiatanForm from "./Partials/Create";
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

const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Nama User", accessor: "nama_user" },
    { Header: "Kegiatan", accessor: "kegiatan" },
    { Header: "Tanggal", accessor: "tanggal" },
    { Header: "Waktu Mulai", accessor: "waktu_mulai" },
    { Header: "Waktu Selesai", accessor: "waktu_selesai" },
    { Header: "Keterangan", accessor: "keterangan" },
    {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
    },
];

export default function Index({ auth, data_kegiatan }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState(null); // Simpan data yang akan diedit

    const handleEdit = (data) => {
        setEditMode(true);
        setSelectedData(data);
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
                try {
                    await axios.delete(`/api/kegiatan/${id}`, {
                        withCredentials: true,
                    });

                    // Hapus data dari state
                    setKegiatan((prevKegiatan) =>
                        prevKegiatan.filter((item) => item.id !== id),
                    );

                    Toast.fire({
                        title: "Berhasil!",
                        text: "Kegiatan telah dihapus",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Gagal menghapus kegiatan:", error);
                    Swal.fire("Error!", "Gagal menghapus kegiatan.", "error");
                }
            }
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
