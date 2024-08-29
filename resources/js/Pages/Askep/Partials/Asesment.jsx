import React, { useState, useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import FloatingInput from "@/Components/FloatingInput";
import FloatingSelect from "@/Components/FloatingSelect";
import VitalSign from "./VitalSign";
function Asesment({ sdki }) {
    return (
        <div>
            <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-2" action="#">
                    <VitalSign sdki={sdki} idDx={"awal"} />
                    <div className="lg:flex gap-6 space-y-4">
                        <div className="lg:flex-1 lg:mt-4 mb-2 lg:mb-0">
                            <FloatingTextArea
                                type="text"
                                id="riwayat_penyakit"
                                label="Riwayat Penyakit Dahulu"
                            />
                        </div>
                        <div className="lg:flex-1 mb-2 lg:mb-0">
                            <FloatingTextArea
                                type="text"
                                id="riwayat_penyakit_keluarga"
                                label="Riwayat Penyakit Keluarga"
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
                </form>
            </div>
        </div>
    );
}

export default Asesment;
