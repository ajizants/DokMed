import React, { useEffect } from "react";
import FloatingTextArea from "@/Components/FloatingTextArea";
import FloatingInput from "@/Components/FloatingInput";
import FloatingSelect from "@/Components/FloatingSelect";

export default function VitalSign({ sdki, ket, data, setData }) {
    const sdkiOptions = sdki.map((sdki) => ({
        value: sdki.kode_dx,
        label: sdki.diagnosa,
    }));

    useEffect(() => {
        if (data.bb && data.tb) {
            const heightInMeters = data.tb / 100; // assuming TB is in cm, convert to meters
            const calculatedIMT = calculateIMT(data.bb, heightInMeters);
            setData("imt", calculatedIMT.toFixed(2)); // round to 2 decimal places
        }
    }, [data.bb, data.tb]);

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
                    type="number"
                    value={data.bb}
                    onChange={(e) => setData("bb", e.target.value)}
                />
                <FloatingInput
                    id="tb"
                    label="TB"
                    type="number"
                    value={data.tb}
                    onChange={(e) => setData("tb", e.target.value)}
                />
                <FloatingInput
                    id="imt"
                    label="IMT"
                    value={data.imt}
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
                        onChange={(value) => setData("dx_1", value)}
                    />
                </div>
                <div className="lg:flex-1 w-full">
                    <FloatingSelect
                        name={`Diagnosa Sekunder`}
                        id="dx_2"
                        options={sdkiOptions}
                        label="Pilih Diagnosa Sekunder"
                        value={data.dx_2}
                        onChange={(value) => setData("dx_2", value)}
                    />
                </div>
            </div>
        </div>
    );
}
