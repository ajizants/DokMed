import React from "react";
import VitalSign from "./VitalSign";
import ButtonGreen from "@/Components/ButtonGreen";
import { useForm } from "@inertiajs/react";

function Kunjungan({ sdki }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subjektif: "",
        objektif: "",
        td: "",
        nadi: "",
        rr: "",
        suhu: "",
        bb: "",
        tb: "",
        dx_1: "",
        dx_2: "",
    });

    const simpanKunjungan = async (event) => {
        event.preventDefault();
        post(route("askep.store"), {
            onFinish: () => reset(),
        });
    };

    return (
        <div>
            <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form
                    className="space-y-2"
                    onSubmit={simpanKunjungan}
                    id="form_Kunjungan"
                >
                    <VitalSign sdki={sdki} data={data} setData={setData} />
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
                        <tbody>
                            {/* Map through your actions here */}
                            <tr>
                                <td className="px-6 py-4">Contoh Tindakan</td>
                                <td className="px-6 py-4">30 Menit</td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonGreen>Simpan</ButtonGreen>
                </form>
            </div>
        </div>
    );
}

export default Kunjungan;
