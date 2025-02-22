import { useState } from "react";
import axios from "axios";
import ButtonLime from "./ButtonLime";

export default function DownloadPdfButton() {
    const [loading, setLoading] = useState(false);

    // const handleDownload = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get("/generate-pdf");
    //         const pdfUrl = response.data.url;

    //         // Buat link untuk download
    //         const link = document.createElement("a");
    //         link.href = pdfUrl;
    //         link.setAttribute("download", "laporan.pdf");
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error("Gagal mengunduh PDF", error);
    //     }
    //     setLoading(false);
    // };
    const handleDownload = async () => {
        setLoading(true); // Set loading ke true
        try {
            // Kirim parameter sebagai query string
            const response = await axios.get("/generate-pdf", {
                params: {
                    tanggal_awal: tanggal.tanggal_awal,
                    tanggal_akhir: tanggal.tanggal_akhir,
                },
            });

            // Ambil URL PDF dari response
            const pdfUrl = response.data.url;

            // Buat link untuk download
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.setAttribute("download", "laporan.pdf"); // Atur nama file
            document.body.appendChild(link); // Tambahkan link ke DOM
            link.click(); // Trigger download
            document.body.removeChild(link); // Hapus link dari DOM
        } catch (error) {
            console.error("Gagal mengunduh PDF", error);
            // Tampilkan pesan error ke pengguna (opsional)
            alert("Gagal mengunduh PDF. Silakan coba lagi.");
        } finally {
            setLoading(false); // Set loading ke false, baik sukses maupun gagal
        }
    };
    //         // onClick={handleDownload}

    return (
        <ButtonLime
            onClick={handleDownload}
            disabled={loading}
            // className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            {loading ? "Sedang Mengunduh..." : "Download PDF"}
        </ButtonLime>
    );
}
