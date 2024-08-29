import React, { useState, useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import VitalSign from "./VitalSign";
import ButtonGreen from "@/Components/ButtonGreen";
import { useForm } from "@inertiajs/react";
import ButtonBlue from "@/Components/ButtonBlue";
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
        imt: "", // Add IMT to the form state
        dx_1: "",
        dx_2: "",
        riwayat_penyakit: "",
        riwayat_penyakit_keluarga: "",
    });

    const simpanAssesment = async (event) => {
        event.preventDefault();
        post(route("askep.store"), {
            onFinish: () => reset(),
        });
    };
    return (
        <div>
            <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-2" onClick={simpanAssesment}>
                    <VitalSign
                        sdki={sdki}
                        data={data}
                        setData={setData}
                        ket={"awal"}
                    />
                    <div className="lg:flex gap-6 space-y-4">
                        <div className="lg:flex-1 lg:mt-4 mb-2 lg:mb-0">
                            <FloatingTextArea
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

                    <label
                        htmlFor="planing"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Planing
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

                    <ButtonGreen>Simpan</ButtonGreen>
                </form>
            </div>
        </div>
    );
}

export default Asesment;
