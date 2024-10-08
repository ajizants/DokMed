// resources/js/Pages/user/Index.jsx
import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Nama", accessor: "name" },
    { Header: "Email", accessor: "email" },
];

export default function Index({ auth, status, user }) {
    console.log("🚀 ~ Index ~ user:", user);
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <PaginatedTable data={user} columns={columns} />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
