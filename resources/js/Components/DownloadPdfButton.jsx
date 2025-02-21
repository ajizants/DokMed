import { useState } from "react";
import axios from "axios";
import ButtonLime from "./ButtonLime";

export default function DownloadPdfButton() {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/generate-pdf");
            const pdfUrl = response.data.url;

            // Buat link untuk download
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.setAttribute("download", "laporan.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Gagal mengunduh PDF", error);
        }
        setLoading(false);
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
