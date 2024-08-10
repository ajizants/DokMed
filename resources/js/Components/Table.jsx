import React, { useState } from "react";

const PaginatedTable = ({ data, columns }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search query
    const filteredData = data.filter((item) =>
        columns.some((column) =>
            item[column.accessor]
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    );

    // Calculate pagination data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="relative overflow-x-auto p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search"
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-md dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    {column.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.accessor}
                                        className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {item[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginatedTable;
