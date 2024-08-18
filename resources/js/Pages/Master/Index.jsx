import React, { useState } from "react";
import PaginatedTable from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import NavButton from "@/Components/NavButton";
const columns = [
    { Header: "NIK", accessor: "nik" },
    { Header: "Nama", accessor: "nama" },
    { Header: "Alamat", accessor: "alamat" },
    { Header: "Tanggal Lahir", accessor: "tgl_lahir" },
    { Header: "Jenis Kelamin", accessor: "gender" },
    { Header: "Pekerjaan", accessor: "pekerjaan" },
    { Header: "No HP", accessor: "no_hp" },
];

export default function Index({ auth }) {
    const [activeSection, setactiveSection] = useState("SDKI");

    const handleClick = (label) => {
        setactiveSection(label);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Master
                </h2>
            }
        >
            <Head title="Master" />

            <div className="py-6">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <ul className="grid grid-cols-1 sm:grid-flow-col sm:auto-cols-max gap-3 border-b-2 border-blue-700">
                        <NavButton
                            label="SDKI"
                            onClick={() => handleClick("SDKI")}
                            isActive={activeSection === "SDKI"}
                        />
                        <NavButton
                            label="SLKI"
                            onClick={() => handleClick("SLKI")}
                            isActive={activeSection === "SLKI"}
                        />
                        <NavButton
                            label="SIKI"
                            onClick={() => handleClick("SIKI")}
                            isActive={activeSection === "SIKI"}
                        />
                        <NavButton
                            label="User"
                            onClick={() => handleClick("User")}
                            isActive={activeSection === "User"}
                        />
                        <NavButton
                            label="User"
                            onClick={() => handleClick("User")}
                            isActive={activeSection === "User"}
                        />
                        <NavButton
                            label="User"
                            onClick={() => handleClick("User")}
                            isActive={activeSection === "User"}
                        />
                        <NavButton
                            label="User"
                            onClick={() => handleClick("User")}
                            isActive={activeSection === "User"}
                        />
                        <NavButton
                            label="User"
                            onClick={() => handleClick("User")}
                            isActive={activeSection === "User"}
                        />
                    </ul>
                </div>
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 mb-3 ">
                    {activeSection === "SDKI" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="sdki">SDKI</div>
                        </div>
                    )}
                    {activeSection === "SLKI" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="slki">SLKI</div>
                        </div>
                    )}
                    {activeSection === "SIKI" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="siki">SIKI</div>
                        </div>
                    )}
                    {activeSection === "User" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="user">User</div>
                        </div>
                    )}
                    {activeSection === "SLKI" && (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div id="slki">SLKI</div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
