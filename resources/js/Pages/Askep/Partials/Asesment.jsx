import React, { useState, useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import VitalSign from "./VitalSign";
import ButtonGreen from "@/Components/ButtonGreen";
import { useForm } from "@inertiajs/react";

function Asesment({ sdki }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subjektif: "",
        objektif: "",
        td: "",
        nadi: "",
        rr: "",
        suhu: "",
        bb: "",
        tb: "",
        imt: "",
        dx_1: "",
        dx_2: "",
        alergi_obat: "",
        alergi_makanan: "",
        riwayat_penyakit: "",
        riwayat_penyakit_keluarga: "",
    });

    const simpanAssesment = async (event) => {
        event.preventDefault();
        post(route("asesmen.store"), {
            onFinish: () => reset(),
        });
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const formElements = Array.from(event.target.form.elements);
            const index = formElements.indexOf(event.target);
            formElements[index + 1]?.focus(); // Fokus ke elemen berikutnya
        }
    };
    return (
        <div>
            <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-2" onSubmit={simpanAssesment}>
                    <label className="block my-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                        Riwayat Pasien
                    </label>
                    <div className="lg:flex gap-6 space-y-4">
                        <div className="lg:flex-1 lg:mt-4 mb-2 lg:mb-0">
                            <FloatingTextArea
                                onKeyDown={handleKeyDown}
                                type="text"
                                id="riwayat_penyakit"
                                label="Riwayat Penyakit Dahulu"
                                value={data.riwayat_penyakit}
                                onChange={(e) =>
                                    setData("riwayat_penyakit", e.target.value)
                                }
                            />
                        </div>
                        <div className="lg:flex-1 mb-2 lg:mb-0">
                            <FloatingTextArea
                                onKeyDown={handleKeyDown}
                                type="text"
                                id="riwayat_penyakit_keluarga"
                                label="Riwayat Penyakit Keluarga"
                                value={data.riwayat_penyakit_keluarga}
                                onChange={(e) =>
                                    setData(
                                        "riwayat_penyakit_keluarga",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="lg:flex gap-6 space-y-4">
                        <div className="lg:flex-1 lg:mt-4 mb-2 lg:mb-0">
                            <FloatingTextArea
                                onKeyDown={handleKeyDown}
                                type="text"
                                id="alergi_obat"
                                label="Riwayat Alergi Obat"
                                value={data.alergi_obat}
                                onChange={(e) =>
                                    setData("alergi_obat", e.target.value)
                                }
                            />
                        </div>
                        <div className="lg:flex-1 mb-2 lg:mb-0">
                            <FloatingTextArea
                                onKeyDown={handleKeyDown}
                                type="text"
                                id="alergi_makanan"
                                label="Riwayat Alergi Makanan"
                                value={data.alergi_makanan}
                                onChange={(e) =>
                                    setData("alergi_makanan", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <VitalSign
                        sdki={sdki}
                        data={data}
                        setData={setData}
                        ket={"awal"}
                    />

                    <label
                        htmlFor="slki"
                        className="block my-3 text-lg font-medium text-gray-700 dark:text-gray-300"
                    >
                        Standar Luaran Keperawatan Indonesia (SLKI)
                    </label>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tindakan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Durasi
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <label
                        htmlFor="planing"
                        className="block my-3 text-lg font-medium text-gray-700 dark:text-gray-300"
                    >
                        Planing (P)
                    </label>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tindakan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Durasi
                                </th>
                            </tr>
                        </thead>
                    </table>

                    <ButtonGreen type="submit">Simpan</ButtonGreen>
                </form>
            </div>
        </div>
    );
}

export default Asesment;
