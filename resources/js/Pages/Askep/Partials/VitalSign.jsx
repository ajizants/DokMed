import React, { useState, useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import FloatingInput from "@/Components/FloatingInput";
import FloatingSelect from "@/Components/FloatingSelect";

export default function VitalSign({ sdki, data, setData }) {
    const sdkiOptions = sdki.map((sdki) => ({
        value: sdki.kode_dx,
        label: sdki.diagnosa,
    }));

    const [bb, setBB] = useState(""); // Weight
    const [tb, setTB] = useState(""); // Height
    const [imt, setIMT] = useState(""); // BMI

    useEffect(() => {
        if (bb && tb) {
            const heightInMeters = tb / 100; // Convert height from cm to meters
            const calculatedIMT = calculateIMT(bb, heightInMeters);
            setIMT(calculatedIMT.toFixed(2)); // Round to 2 decimal places
        }
    }, [bb, tb]);

    function calculateIMT(weight, height) {
        return weight / (height * height);
    }

    return (
        <div className="space-y-4">
            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
                <div className="lg:flex-1 mb-2 lg:mb-0">
                    <FloatingTextArea
                        type="text"
                        id="subjektif"
                        label="Data Subjektif"
                        value={data.subjektif}
                        onChange={(e) => setData("subjektif", e.target.value)}
                    />
                </div>
                <div className="lg:flex-1 mb-2 lg:mb-0">
                    <FloatingTextArea
                        type="text"
                        id="objektif"
                        label="Data Objektif"
                        value={data.objektif}
                        onChange={(e) => setData("objektif", e.target.value)}
                    />
                </div>
            </div>

            <div className="lg:flex gap-2 space-y-4 lg:space-y-0">
                <FloatingInput
                    id="td"
                    label="Tekanan Darah"
                    type="text"
                    value={data.td}
                    onChange={(e) => setData("td", e.target.value)}
                />
                <FloatingInput
                    id="nadi"
                    label="Nadi"
                    type="number"
                    value={data.nadi}
                    onChange={(e) => setData("nadi", e.target.value)}
                />
                <FloatingInput
                    id="rr"
                    label="RR"
                    type="number"
                    value={data.rr}
                    onChange={(e) => setData("rr", e.target.value)}
                />
                <FloatingInput
                    id="suhu"
                    label="Suhu"
                    type="number"
                    value={data.suhu}
                    onChange={(e) => setData("suhu", e.target.value)}
                />
                <FloatingInput
                    id="bb"
                    label="BB"
                    value={bb}
                    type="number"
                    onChange={(e) => {
                        setBB(e.target.value);
                        setData("bb", e.target.value); // Update form data
                    }}
                />
                <FloatingInput
                    id="tb"
                    label="TB"
                    value={tb}
                    type="number"
                    onChange={(e) => {
                        setTB(e.target.value);
                        setData("tb", e.target.value); // Update form data
                    }}
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
                className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                Asesment
            </label>
            <div className="lg:flex gap-3 space-y-4 lg:space-y-0">
                <div className="lg:flex-1 w-full">
                    <FloatingSelect
                        name={`Diagnosa Primer`}
                        id="dx_1"
                        options={sdkiOptions}
                        label="Pilih Diagnosa Primer"
                        value={data.dx_1}
                        onChange={(e) => setData("dx_1", e.target.value)}
                    />
                </div>
                <div className="lg:flex-1 w-full">
                    <FloatingSelect
                        name={`Diagnosa Sekunder`}
                        id="dx_2"
                        options={sdkiOptions}
                        label="Pilih Diagnosa Sekunder"
                        value={data.dx_2}
                        onChange={(e) => setData("dx_2", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
