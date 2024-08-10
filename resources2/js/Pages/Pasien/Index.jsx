import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import DeleteUserForm from "./Partials/DeleteUserForm";
// import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
// import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Pasien
                </h2>
            }
        >
            <Head title="Pasien" />

            <div className="max-w-7xl mx-auto sm:px-6 md:px-4 space-y-4">
                <div className="p-2 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>

                <div className="p-2 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>

                <div className="p-2 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg"></div>
            </div>
        </AuthenticatedLayout>
    );
}
