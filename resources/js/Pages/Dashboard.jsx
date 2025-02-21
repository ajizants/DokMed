// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function Dashboard({ auth }) {
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

export default function Dashboard({
    auth,
    totalUsers,
    totalOnlineUsers,
    activitiesPerMonth,
}) {
    console.log("🚀 ~ activitiesPerMonth:", activitiesPerMonth);
    console.log("🚀 ~ totalOnlineUsers:", totalOnlineUsers);
    console.log("🚀 ~ totalUsers:", totalUsers);
    // Contoh data kegiatan per bulan
    const activityData = activitiesPerMonth;

    // Contoh data total user dan user online
    // const totalUsers = 500;
    const onlineUsers = totalOnlineUsers;
    const offlineUsers = totalUsers - onlineUsers;

    const userData = [
        { name: "Online", value: onlineUsers },
        { name: "Offline", value: offlineUsers },
    ];

    const COLORS = ["#0088FE", "#FFBB28"];

    const [axisColor, setAxisColor] = useState("gray");

    useEffect(() => {
        // Cek apakah ada class "dark" di <html>
        const isDarkMode = document.documentElement.classList.contains("dark");
        setAxisColor(isDarkMode ? "white" : "gray");
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Grafik Batang */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden text-gray-800 dark:text-gray-100 shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Grafik Total Kegiatan Per Bulan
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={activityData}>
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: axisColor }}
                                    axisLine={{ stroke: axisColor }}
                                />
                                <YAxis
                                    tick={{ fill: axisColor }}
                                    axisLine={{ stroke: axisColor }}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="activities"
                                    fill="#4F46E5"
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Grafik Circle (Total User & Online User) */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total User */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Total User
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={userData}
                                        dataKey="value" // PERUBAHAN DARI "valueKey" KE "dataKey"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {userData.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Total User Online */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Total User Online
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={userData}
                                        dataKey="value" // PERUBAHAN DARI "valueKey" KE "dataKey"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {userData.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
