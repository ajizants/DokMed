import React, { useState } from "react"; // Import useState from react
import { useForm } from "@inertiajs/react"; // Import useForm from Inertia.js
import FloatingInput from "@/Components/FloatingInput";
import ButtonGreen from "@/Components/ButtonGreen";
import ButtonRed from "@/Components/ButtonRed";
import ButtonBlue from "@/Components/ButtonBlue";
import Swal from "sweetalert2";
import FloatingSelect from "@/Components/FloatingSelect";

const CreatePatientForm = ({ user }) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        no_antri: "",
        no_rm: "",
        nik: "",
        nama: "",
        alamat: "",
        no_hp: "",
        tgl_lahir: "",
        gender: "",
        pekerjaan: "",
        id_user: user.id || "",
        name_user: user.name || "",
    });

    const genderOptions = [
        { value: "L", label: "Laki-laki" },
        { value: "P", label: "Perempuan" },
    ];
    const pekerjaanOptions = [
        { value: "PNS", label: "PNS" },
        { value: "Pegawai Swasta", label: "Pegawai Swasta" },
        { value: "Wiraswasta", label: "Wiraswasta" },
        { value: "Pensiunan", label: "Pensiunan" },
        { value: "TNI", label: "TNI" },
        { value: "POLRI", label: "POLRI" },
        { value: "Petani", label: "Petani" },
        { value: "Pedagang", label: "Pedagang" },
        { value: "Lainnya", label: "Lainnya" },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchId, setSearchId] = useState("");

    const pasienSearch = async (event) => {
        event.preventDefault();

        Toast.fire({
            title: "Sedang mencari data...",
            icon: "info",
        });

        const paddedSearchId = searchId.padStart(6, "0");

        try {
            const response = await fetch(`/pasien/${paddedSearchId}`);
            const data = await response.json();

            if (response.ok) {
                if (data.error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Data pasien tidak ditemukan.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                } else {
                    Toast.fire({
                        title: "Success!",
                        text: "Pasien ditemukan!",
                        icon: "success",
                    });
                    setData({
                        no_rm: data.no_rm || "",
                        nik: data.nik || "",
                        nama: data.nama || "",
                        alamat: data.alamat || "",
                        no_hp: data.no_hp || "",
                        tgl_lahir: data.tgl_lahir || "",
                        gender: data.gender || "",
                        pekerjaan: data.pekerjaan || "",
                        id_user: user.id || "",
                        name_user: user.name || "",
                    });
                    document
                        .getElementById("input-no_rm")
                        .classList.remove("hidden");

                    document.getElementById("nik").focus();
                }
            } else {
                Swal.fire({
                    title: "Pasien belum terdaftar!",
                    text: "Lanjutkan ke pendaftaran pasien?",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.close();
                        setSearchId("");
                        reset();
                        document
                            .getElementById("input-no_rm")
                            .classList.add("hidden");
                        // Delay the focus to ensure the Swal modal has completely closed
                        setTimeout(() => {
                            document.getElementById("nik").focus();
                        }, 1000); // 100ms delay
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Kesalahan jaringan, coba lagi.",
                icon: "error",
                confirmButtonText: "OK",
            });
            console.error("Network error:", error);
        }
    };

    const handleChange = (event) => {
        setData(event.target.id, event.target.value);
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const simpanPendaftaran = async (event) => {
        event.preventDefault();

        post(route("pendaftaran.store"), {
            onSuccess: (response) => {
                console.log("Success:", response); // Tangkap respons sukses di sini
                Swal.fire({
                    title: "Berhasil!",
                    text: response,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                reset(); // Reset form setelah sukses
            },
            onError: (errors) => {
                console.log("Error:", errors); // Tangkap respons error di sini
                Swal.fire({
                    title: "Gagal!",
                    text: errors,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <h2 className="mb-7 text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100">
                Pendaftaran Pasien
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid-flow-col">
                    <FloatingInput
                        type="text"
                        id="no_antri"
                        label="No Antri"
                        onChange={handleChange}
                    />
                </div>
                <div className="grid-flow-col space-x-2">
                    <ButtonBlue type="button" onClick={toggleModal}>
                        <svg
                            className="bi bi-volume-up-fill"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 24 20"
                        >
                            <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
                            <path
                                fillRule="evenodd"
                                d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 0-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </ButtonBlue>
                    <ButtonRed type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-skip-forward-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </ButtonRed>
                </div>
            </div>

            {isModalOpen && (
                <div
                    tabIndex="-1"
                    role="dialog"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    onClick={toggleModal}
                >
                    <div
                        className="relative p-4 w-full max-w-2xl max-h-full bg-white dark:bg-gray-700"
                        onClick={(e) => e.stopPropagation()} // Prevent click propagation to modal background
                    >
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-md md:text-xl font-medium text-gray-900 dark:text-white">
                                    Cari Pasien
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            {/* <div className="p-6 md:p-7 space-y-6">
                                <div className="relative z-0 w-full group">
                                    <FloatingInput
                                        type="text"
                                        id="searchId"
                                        label="Search ID"
                                        value={searchId}
                                        onChange={(e) =>
                                            setSearchId(e.target.value)
                                        }
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={pasienSearch} className="mt-4">
                <div className="flex gap-4 items-center">
                    <div className="flex-initial w-full lg:min-w-fit">
                        <FloatingInput
                            type="text"
                            id="search_id"
                            label="Cari No RM"
                            // value={searchId}
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </div>
                    <ButtonBlue type="submit" className="mt-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </ButtonBlue>
                </div>
            </form>
            <form onSubmit={simpanPendaftaran}>
                <div className="space-y-4">
                    <FloatingInput
                        type="text"
                        id="no_rm"
                        label="No Rekam Medis"
                        value={formData.no_rm}
                        onChange={handleChange}
                        kelas="hidden mt-4"
                    />
                    <FloatingInput
                        type="text"
                        id="nik"
                        label="NIK"
                        value={formData.nik}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="nama"
                        label="Nama Pasien"
                        value={formData.nama}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        type="text"
                        id="alamat"
                        label="Alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                    />
                    <div className="sm:grid grid-cols-2 gap-4">
                        <FloatingInput
                            type="text"
                            id="no_hp"
                            label="Nomor HP"
                            value={formData.no_hp}
                            onChange={handleChange}
                        />
                        <FloatingInput
                            type="date"
                            id="tgl_lahir"
                            label="Tanggal Lahir"
                            value={formData.tgl_lahir}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="sm:grid grid-cols-2 gap-4">
                        <FloatingSelect
                            name={`Jenis Kelamin`}
                            id="gender"
                            options={genderOptions}
                            label="Jenis Kelamin"
                            value={formData.gender}
                            onChange={(value) => setData("gender", value)}
                        />
                        <FloatingSelect
                            name={`Pekerjaan`}
                            id="pekerjaan"
                            options={pekerjaanOptions}
                            label="Pekerjaan"
                            value={formData.pekerjaan}
                            onChange={(value) => setData("pekerjaan", value)}
                        />
                        {/* <FloatingInput
                        type="text"
                        id="pekerjaan"
                        label="Pekerjaan"
                        value={formData.pekerjaan}
                        onChange={handleChange}
                    /> */}
                    </div>
                </div>
                <div className="col-span-2 flex justify-end space-x-2 mt-8">
                    <ButtonGreen type="submit" disabled={processing}>
                        Simpan
                    </ButtonGreen>
                    <ButtonRed type="button" onClick={() => reset()}>
                        Reset
                    </ButtonRed>
                </div>
            </form>
        </div>
    );
};

export default CreatePatientForm;
