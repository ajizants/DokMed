import React, { useState, useMemo } from "react";

const PaginatedTable = ({ data, columns, errorMessage }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter data based on search query (optimized with useMemo)
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            columns.some((column) => {
                const value = item[column.accessor];
                return value
                    ? value
                          .toString()
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    : false;
            }),
        );
    }, [data, searchQuery, columns]);

    // Calculate pagination data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                className="mb-4 px-4 py-2 border border-gray-300 rounded-md dark:border-gray-700 w-full"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
            />

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-100">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-100 tracking-wider">
                                No
                            </th>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className="px-2 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-100 tracking-wider"
                                >
                                    {column.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {errorMessage ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center text-red-500 p-4 border"
                                >
                                    {errorMessage}
                                </td>
                            </tr>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    {columns.map((column) => (
                                        <td
                                            key={column.accessor}
                                            className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {item[column.accessor] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center text-red-500 p-4 border"
                                >
                                    Tidak ada data tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                    {/* Tombol pertama */}
                    <button
                        className="dark:text-gray-300 px-2 py-2 sm:px-3 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 text-sm sm:text-base"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                        aria-label="First Page"
                    >
                        <span className="sm:block hidden">« First</span>
                        <span className="sm:hidden">«</span>
                    </button>

                    {/* Tombol sebelumnya */}
                    <button
                        className="dark:text-gray-300 px-2 py-2 sm:px-3 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 text-sm sm:text-base"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous Page"
                    >
                        <span className="sm:block hidden">‹ Prev</span>
                        <span className="sm:hidden">◀</span>
                    </button>

                    {/* Nomor halaman */}
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>

                    {/* Tombol berikutnya */}
                    <button
                        className="dark:text-gray-300 px-2 py-2 sm:px-3 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 text-sm sm:text-base"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next Page"
                    >
                        <span className="sm:block hidden">Next ›</span>
                        <span className="sm:hidden">▶</span>
                    </button>

                    {/* Tombol terakhir */}
                    <button
                        className="dark:text-gray-300 px-2 py-2 sm:px-3 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 text-sm sm:text-base"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        aria-label="Last Page"
                    >
                        <span className="sm:block hidden">Last »</span>
                        <span className="sm:hidden">»</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaginatedTable;
