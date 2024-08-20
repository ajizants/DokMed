import React, { useState, useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import FloatingInput from "@/Components/FloatingInput";
import FloatingSelect from "@/Components/FloatingSelect";
function Kunjungan({ sdki }) {
    const sdkiOptions = sdki.map((sdki) => ({
        value: sdki.kode_dx,
        label: sdki.diagnosa,
    }));

    const [bb, setBB] = useState(""); // Weight
    const [tb, setTB] = useState(""); // Height
    const [imt, setIMT] = useState(""); // BMI

    useEffect(() => {
        if (bb && tb) {
            const heightInMeters = tb / 100; // assuming TB is in cm, convert to meters
            const calculatedIMT = calculateIMT(bb, heightInMeters);
            setIMT(calculatedIMT.toFixed(2)); // round to 2 decimal places
        }
    }, [bb, tb]);

    function calculateIMT(weight, height) {
        return weight / (height * height);
    }

    return (
        <div>
            <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-2" action="#">
                    <div className="lg:flex gap-3">
                        <div className="lg:flex-1 mb-2 lg:mb-0">
                            <FloatingTextArea
                                type="text"
                                id="subjektif"
                                label="Data Subjektif"
                            />
                        </div>
                        <div className="lg:flex-1 mb-2 lg:mb-0">
                            <FloatingTextArea
                                type="text"
                                id="objektif"
                                label="Data Objektif"
                            />
                        </div>
                    </div>

                    <div className="lg:flex gap-2 space y-2">
                        <FloatingInput
                            id="td"
                            label="Tekanan Darah"
                            type="text"
                            mode="numeric"
                            className="lg:flex-1"
                        />
                        <FloatingInput id="nadi" label="Nadi" type="number" />
                        <FloatingInput id="rr" label="RR" type="number" />
                        <FloatingInput id="suhu" label="Suhu" type="number" />
                        <FloatingInput
                            id="bb"
                            label="BB"
                            value={bb}
                            type="number"
                            onChange={(e) => setBB(e.target.value)}
                        />
                        <FloatingInput
                            id="tb"
                            label="TB"
                            value={tb}
                            type="number"
                            onChange={(e) => setTB(e.target.value)}
                        />
                        <FloatingInput
                            id="imt"
                            label="IMT"
                            value={imt}
                            readOnly
                            type="number"
                        />
                    </div>
                    <label
                        htmlFor="asesment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Asesment
                    </label>
                    <div className="lg:flex gap-3 space-y-2 lg:space-y-0">
                        <div className="lg:flex-1 w-full">
                            <FloatingSelect
                                name="Diagnosa Primer"
                                id="dx_1"
                                options={sdkiOptions}
                                label="Pilih Diagnosa Primer"
                            />
                        </div>
                        <div className="lg:flex-1 w-full dark:bg-gray-700">
                            <FloatingSelect
                                name="Diagnosa Sekunder"
                                id="dx_2"
                                options={sdkiOptions}
                                label="Pilih Diagnosa Sekunder"
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

export default Kunjungan;
