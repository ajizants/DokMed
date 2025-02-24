import PaginatedTable from "@/Components/Table";
import { useMemo } from "react";

const UserSection = ({ users, columns, loading, error }) => {
    console.log("🚀 ~ UserSection ~ users:", users);
    console.log("🚀 ~ UserSection ~ columns:", columns);
    const memoizedColumns = useMemo(() => columns, [columns]); // Hindari re-render jika tidak berubah
    // console.log("🚀 ~ UserSection ~ memoizedColumns:", memoizedColumns);

    return (
        <div className="p-1 sm:p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="text-center font-bold dark:text-white mb-4">
                Data User
            </div>

            {loading && (
                <div className="text-center text-gray-500">Loading...</div>
            )}
            {error && <div className="text-center text-red-500">{error}</div>}

            {!loading && !error && (
                <PaginatedTable columns={memoizedColumns} data={users} />
            )}
        </div>
    );
};

export default UserSection;
