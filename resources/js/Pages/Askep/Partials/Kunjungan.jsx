import React, { useState, useEffect } from "react";
import Select from "react-select";

function Kunjungan({ sdki }) {
    console.log("🚀 ~ Kunjungan ~ sdki:", sdki);
    const [bb, setBB] = useState(""); // Weight
    const [tb, setTB] = useState(""); // Height
    const [imt, setIMT] = useState(""); // BMI
    const sdkiOptions = sdki.map((sdki) => ({
        value: sdki.kode_dx,
        label: sdki.diagnosa,
    }));

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
                        <div className="lg:flex-1">
                            <label
                                htmlFor="subjektif"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Data Subjektif
                            </label>

                            <textarea
                                type="text"
                                id="subjektif"
                                name="Data Subjektif"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Tuliskan Data Subjektif"
                                title="Tuliskan Data Subjektif Pasien"
                            ></textarea>
                        </div>
                        <div className="lg:flex-1">
                            <label
                                htmlFor="objektif"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Data Objektif
                            </label>
                            <textarea
                                type="text"
                                id="objektif"
                                name="Data Objektif"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Tuliskan Data Objektif"
                                title="Tuliskan Data Objektif"
                            ></textarea>
                        </div>
                    </div>

                    <div className="lg:flex gap-2">
                        <input
                            type="text"
                            id="td"
                            inputMode="numeric"
                            name="Tekanan Darah"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="TD"
                            title="Tuliskan TD Pasien"
                        />
                        <input
                            type="number"
                            id="nadi"
                            inputMode="numeric"
                            name="Nadi"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Nadi"
                            title="Tuliskan Nadi Pasien"
                        />
                        <input
                            type="number"
                            id="rr"
                            inputMode="numeric"
                            name="RR"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="RR"
                            title="Tuliskan RR Pasien"
                        />
                        <input
                            type="number"
                            id="suhu"
                            inputMode="numeric"
                            name="Suhu"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Suhu"
                            title="Tuliskan Suhu Pasien"
                        />
                        <input
                            type="number"
                            id="bb"
                            inputMode="numeric"
                            name="BB"
                            value={bb}
                            onChange={(e) => setBB(e.target.value)}
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="BB"
                            title="Tuliskan BB Pasien"
                        />
                        <input
                            type="number"
                            id="tb"
                            inputMode="numeric"
                            name="TB"
                            value={tb}
                            onChange={(e) => setTB(e.target.value)}
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="TB"
                            title="Tuliskan TB Pasien"
                        />
                        <input
                            type="number"
                            id="imt"
                            inputMode="numeric"
                            name="IMT"
                            value={imt}
                            readOnly
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="IMT"
                            title="IMT (Body Mass Index) pasien"
                        />
                    </div>
                    <label
                        htmlFor="asesment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Asesment
                    </label>
                    <div className="lg:flex gap-3">
                        <div className="lg:flex-1 w-full">
                            <Select
                                name="Diagnosa Primer"
                                id="dx_1"
                                options={sdkiOptions}
                                placeholder="Pilih Diagnosa Primer"
                            />
                        </div>
                        <div className="lg:flex-1 w-full">
                            <Select
                                name="Diagnosa Sekunder"
                                className="z-20"
                                id="dx_2"
                                options={sdkiOptions}
                                placeholder="Pilih Diagnosa Sekunder"
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
            {/* <div className="columns-2 flex gap-2">
                <div className="w-2/5 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-2" action="#">
                        <label
                            htmlFor="subjektif"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Data Subjektif
                        </label>

                        <textarea
                            type="text"
                            id="subjektif"
                            name="Data Subjektif"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Tuliskan Data Subjektif"
                            title="Tuliskan Data Subjektif Pasien"
                        ></textarea>
                        <label
                            htmlFor="objektif"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Data Objektif
                        </label>

                        <div className="lg:flex gap-2">
                            <input
                                type="text"
                                id="td"
                                inputMode="numeric"
                                name="Tekanan Darah"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="TD"
                                title="Tuliskan TD Pasien"
                            />
                            <input
                                type="number"
                                id="nadi"
                                inputMode="numeric"
                                name="Nadi"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Nadi"
                                title="Tuliskan Nadi Pasien"
                            />
                            <input
                                type="number"
                                id="rr"
                                inputMode="numeric"
                                name="RR"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="RR"
                                title="Tuliskan RR Pasien"
                            />
                            <input
                                type="number"
                                id="suhu"
                                inputMode="numeric"
                                name="Suhu"
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Suhu"
                                title="Tuliskan Suhu Pasien"
                            />
                        </div>
                        <div className="lg:flex gap-2">
                            <input
                                type="number"
                                id="bb"
                                inputMode="numeric"
                                name="BB"
                                value={bb}
                                onChange={(e) => setBB(e.target.value)}
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="BB"
                                title="Tuliskan BB Pasien"
                            />
                            <input
                                type="number"
                                id="tb"
                                inputMode="numeric"
                                name="TB"
                                value={tb}
                                onChange={(e) => setTB(e.target.value)}
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="TB"
                                title="Tuliskan TB Pasien"
                            />
                            <input
                                type="number"
                                id="imt"
                                inputMode="numeric"
                                name="IMT"
                                value={imt}
                                readOnly
                                className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                placeholder="IMT"
                                title="IMT (Body Mass Index) pasien"
                            />
                        </div>
                        <textarea
                            type="text"
                            id="objektif"
                            name="Data Objektif"
                            className="mt-1 h-30 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Tuliskan Data Objektif"
                            title="Tuliskan Data Objektif"
                        ></textarea>
                        <label
                            htmlFor="asesment"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Asesment
                        </label>

                        <div className="w-full">
                            <Select
                                name="Diagnosa Primer"
                                id="dx_1"
                                options={sdkiOptions}
                                placeholder="Pilih Diagnosa Primer"
                            />
                        </div>
                        <div className="w-full">
                            <Select
                                name="Diagnosa Sekunder"
                                id="dx_2"
                                options={sdkiOptions}
                                placeholder="Pilih Diagnosa Sekunder"
                            />
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

                <div className="w-4/5 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div> */}
        </div>
    );
}

export default Kunjungan;
