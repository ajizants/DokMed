import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import NavButton from "@/Components/NavButton";
import axios from "axios";
import UserSection from "./Partials/UserSection";
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

export default function Index({ auth }) {
    const userRole = auth.user.roles?.includes("admin") ? "admin" : "user";
    console.log("🚀 ~ Index ~ auth:", auth);
    const [activeSection, setActiveSection] = useState("SDKI");
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = (label) => {
        setActiveSection(label);
    };

    const handleEdit = (user) => {
        console.log("🚀 ~ handleEdit ~ user:", user);
        Swal.fire({
            title: "Edit User",
            html: `
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <input 
                                id="edit-name" 
                                class="swal2-input" 
                                placeholder="Nama" 
                                value="${user.name}"
                            >
                            <input 
                                id="edit-email" 
                                class="swal2-input" 
                                placeholder="Email" 
                                value="${user.email}"
                            >
                            <select id="edit-role" class="swal2-input">
                                <option value="">Pilih Role</option>
                                <option value="admin" ${user.roles.includes("admin") ? "selected" : ""}>Admin</option>
                                <option value="user" ${user.roles.includes("user") ? "selected" : ""}>User</option>
                                <option value="nakes" ${user.roles.includes("nakes") ? "selected" : ""}>Nakes</option>
                            </select>
                        </div>
                    `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            preConfirm: () => {
                return {
                    name: document.getElementById("edit-name").value,
                    email: document.getElementById("edit-email").value,
                    roles: [document.getElementById("edit-role").value],
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUser = result.value;

                axios
                    .put(`/api/users/${user.id}`, updatedUser, {
                        withCredentials: true,
                    })
                    .then(() => {
                        Toast.fire({
                            title: "Berhasil!",
                            text: "Data user telah diperbarui",
                            icon: "success",
                        });
                        setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                                u.id === user.id ? { ...u, ...updatedUser } : u,
                            ),
                        );
                    })
                    .catch((error) => {
                        console.error("Gagal mengupdate user:", error);
                        Swal.fire(
                            "Error!",
                            "Gagal memperbarui data user.",
                            "error",
                        );
                    });
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "User akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/users/${id}`, {
                        withCredentials: true,
                    });

                    // Perbarui state users
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.id !== id),
                    );

                    Toast.fire({
                        title: "Berhasil!",
                        text: "User telah dihapus",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Gagal menghapus user:", error);
                    Swal.fire(
                        "Error!",
                        "Gagal menghapus user." + error,
                        "error",
                    );
                }
            }
        });
    };

    useEffect(() => {
        if (activeSection === "User") {
            fetchUserData();
        }
    }, [activeSection]); // Fetch data saat pindah ke tab User

    const fetchUserData = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const response = await axios.get("/api/users", {
                withCredentials: true, // Wajib untuk Sanctum
            });

            if (!response.data || typeof response.data !== "object") {
                throw new Error(
                    "Format data API tidak sesuai (data tidak berbentuk objek)",
                );
            }

            if (!Array.isArray(response.data.columns)) {
                throw new Error(
                    "Format data API tidak sesuai (columns bukan array)",
                );
            }

            if (!Array.isArray(response.data.data)) {
                throw new Error(
                    "Format data API tidak sesuai (data bukan array)",
                );
            }

            const usersData = response.data.data.map((user) => ({
                ...user,
                actions: (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(user)}
                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                ),
            }));

            const columns = [
                { Header: "ID", accessor: "id" },
                { Header: "Nama", accessor: "name" },
                { Header: "Email", accessor: "email" },
                { Header: "Role", accessor: "roles" },
                { Header: "Aksi", accessor: "actions" },
            ];

            setUsers(usersData);
            setColumns(columns); // Backend sudah menyiapkan format
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Gagal mengambil data user. " + error.message);
        } finally {
            setLoading(false);
        }
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
                        {[
                            "SDKI",
                            "SLKI",
                            "SIKI",
                            ...(userRole === "admin" ? ["User"] : []),
                        ].map((label) => (
                            <NavButton
                                key={label}
                                label={label}
                                onClick={() => handleClick(label)}
                                isActive={activeSection === label}
                            />
                        ))}
                    </ul>
                </div>

                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 mb-3">
                    {activeSection !== "User" ? (
                        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="text-center font-bold dark:text-white">
                                {activeSection}
                            </div>
                        </div>
                    ) : (
                        <UserSection
                            users={users}
                            columns={columns}
                            loading={loading}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
