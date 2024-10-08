// resources/js/Pages/Pasien/Index.jsx
import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreatePatientForm from "./Create";
import ModalCreatePatientForm from "./ModalCreatePasien";
const columns = [
    { Header: "NIK", accessor: "nik" },
    { Header: "Nama", accessor: "nama" },
    { Header: "Alamat", accessor: "alamat" },
    { Header: "Tanggal Lahir", accessor: "tgl_lahir" },
    { Header: "Jenis Kelamin", accessor: "gender" },
    { Header: "Pekerjaan", accessor: "pekerjaan" },
    { Header: "No HP", accessor: "no_hp" },
];

export default function Index({ auth, status, pasien }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-6">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CreatePatientForm status={status} />
                    </div>
                    <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <PaginatedTable data={pasien} columns={columns} />
                    </div>

                    <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
