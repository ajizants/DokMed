import { useState } from "react";
import axios from "axios";
import ButtonLime from "./ButtonLime";

export default function DownloadPdfButton({ tanggal }) {
    console.log("🚀 ~ DownloadPdfButton ~ tanggal:", tanggal);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true); // Set loading ke true
        try {
            // Kirim parameter sebagai query string
            const response = await axios.get("/kegiatanPDF", {
                params: {
                    tanggal_awal: tanggal.tanggal_awal,
                    tanggal_akhir: tanggal.tanggal_akhir,
                },
            });

            // Ambil URL PDF dari response
            const pdfUrl = response.data.url;
            console.log("🚀 ~ handleDownload ~ pdfUrl:", pdfUrl);

            // Buat link untuk download
            const link = document.createElement("a");
            link.href = pdfUrl;
            // ambil / terahkir dari odf url untuk nama file
            const namaFile = pdfUrl.split("/").pop();
            link.setAttribute("download", namaFile); // Atur nama file
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
