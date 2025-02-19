import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateKegiatanForm from "./Partials/Create";

export default function Index({ auth, pasien }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Kegiatan" />

            <div className="py-6">
                <div className="md:max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="md:grid md:grid-cols-2 md:space-x-2 space-y-4 md:space-y-0">
                        <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full">
                            <CreateKegiatanForm user={auth.user} />
                        </div>
                        <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg w-full">
                            {/* <PaginatedTable data={pasien} columns={columns} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
