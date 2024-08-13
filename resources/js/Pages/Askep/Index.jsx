import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdentityForm from "@/Pages/Askep/Partials/Identitas";
import { Head } from "@inertiajs/react";
import Kunjungan from "./Partials/Kunjungan";
import Asesment from "./Partials/Asesment";

export default function Index({ auth, sdki }) {
    console.log("🚀 ~ Index ~ sdki:", sdki);
    const [activeSection, setActiveSection] = useState("kunjungan");

    const toggleKunjungan = () => {
        setActiveSection("kunjungan");
    };

    const toggleAsesment = () => {
        setActiveSection("asesment");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Askep
                </h2>
            }
        >
            <Head title="Askep" />

            <div className="py-6">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-2">
                    <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <IdentityForm />
                    </div>

                    <div className="flex gap-2 mt-1">
                        <button
                            onClick={toggleKunjungan}
                            className={`text-blue-500 hover:underline ${
                                activeSection === "kunjungan"
                                    ? "font-bold underline"
                                    : ""
                            }`}
                        >
                            Kunjungan
                        </button>
                        <button
                            onClick={toggleAsesment}
                            className={`text-blue-500 hover:underline ${
                                activeSection === "asesment"
                                    ? "font-bold underline"
                                    : ""
                            }`}
                        >
                            Asesment
                        </button>
                    </div>

                    {activeSection === "kunjungan" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="kunjungan">
                                <Kunjungan sdki={sdki} />
                            </div>
                        </div>
                    )}

                    {activeSection === "asesment" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="asesment">
                                <Asesment />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
