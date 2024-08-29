import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingInput from "@/Components/FloatingInput";
import FloatingSelect from "@/Components/FloatingSelect";

const jkOptions = [
    { value: "L", label: "Laki-laki" },
    { value: "P", label: "Perempuan" },
];

const pekerjaanOptions = [
    { value: "PNS", label: "PNS" },
    { value: "TNI", label: "TNI" },
    { value: "POLRI", label: "POLRI" },
    { value: "Petani", label: "Petani" },
    { value: "Pedagang", label: "Pedagang" },
    { value: "Buruh", label: "Buruh" },
    { value: "Lainnya", label: "Lainnya" },
];

const CreatePatientForm = (user) => {
    const [formData, setFormData] = useState({
        norm: "",
        nik: "",
        nama: "",
        alamat: "",
        no_hp: "",
        tgl_lahir: "",
        gender: "",
        pekerjaan: "",
        id_user: "",
        name_user: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/pasien", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Patient created successfully!", {
                    position: "top-center",
                });
                setFormData({
                    norm: "",
                    nik: "",
                    nama: "",
                    alamat: "",
                    no_hp: "",
                    tgl_lahir: "",
                    gender: "",
                    pekerjaan: "",
                    id_user: "",
                    name_user: "",
                });
            } else {
                toast.error(data.error || "An error occurred", {
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`, {
                position: "top-right",
            });
            console.error("Network error:", error);
        }
    };

    return (
        <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <ToastContainer />
            <h3 className="text-lg font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                Create New Patient
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:flex gap-3 sm:mt-0">
                        <div className="lg:flex-initial w-64 mt-4">
                            <FloatingInput
                                type="text"
                                id="norm"
                                label="NO RM"
                                value={formData.norm}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lg:flex-initial w-2/4 mt-4">
                            <FloatingInput
                                type="text"
                                id="nik"
                                label="NIK"
                                value={formData.nik}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="text"
                                id="no_hp"
                                label="No HP"
                                value={formData.no_hp}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="lg:flex gap-3 sm:mt-0">
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="text"
                                id="nama"
                                label="Nama"
                                value={formData.nama}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="text"
                                id="alamat"
                                label="Alamat"
                                value={formData.alamat}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="lg:flex gap-3 sm:mt-0">
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="date"
                                id="tgl_lahir"
                                label="Tanggal Lahir"
                                value={formData.tgl_lahir}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingSelect
                                id="gender"
                                label="Jenis Kelamin"
                                value={formData.gender}
                                onChange={handleChange}
                                options={jkOptions}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingSelect
                                id="pekerjaan"
                                label="Pekerjaan"
                                value={formData.pekerjaan}
                                onChange={handleChange}
                                options={pekerjaanOptions}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="text"
                                id="id_user"
                                label="User ID"
                                value={user.user.id}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lg:flex-initial w-full mt-4">
                            <FloatingInput
                                type="text"
                                id="name_user"
                                label="User Name"
                                value={user.user.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Create Patient
                </button>
            </form>
        </div>
    );
};

export default CreatePatientForm;
