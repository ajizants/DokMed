import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdentityForm from "@/Pages/Askep/Partials/Identitas";
import { Head } from "@inertiajs/react";
import Kunjungan from "./Partials/Kunjungan";
import Asesment from "./Partials/Asesment";
import NavButton from "@/Components/NavButton";

export default function Index({ auth, sdki }) {
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
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-xl ">
                        <IdentityForm user={auth.user} />
                    </div>
                </div>

                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <ul className="flex gap-3 ms-3">
                        <NavButton
                            label="Kunjungan"
                            onClick={toggleKunjungan}
                            isActive={activeSection === "kunjungan"}
                        />
                        <NavButton
                            label="Asesment Awal"
                            onClick={toggleAsesment}
                            isActive={activeSection === "asesment"}
                        />
                    </ul>
                    <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow rounded-xl ">
                        {activeSection === "kunjungan" && (
                            <div id="kunjungan">
                                <Kunjungan sdki={sdki} />
                            </div>
                        )}
                        {activeSection === "asesment" && (
                            <div id="asesment">
                                <Asesment sdki={sdki} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
