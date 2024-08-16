import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useEffect, useState } from "react";
import TopBar from "@/Components/TopBar";
import FooterApp from "@/Components/Footer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const currentYear = new Date().getFullYear();
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-gray-950 dark:text-white/50">
                <div className="relative">
                    {/* Background Image */}
                    <img
                        src="/jumbotron-bg.jpg"
                        alt="Jumbotron Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 dark:from-gray-950  to-opacity-75 bg-blend-multiply"></div>

                    {/* Content Section */}
                    <section className="relative z-10 h-screen">
                        <div className="px-4 mx-auto h-screen max-w-screen-xl text-center py-24 lg:py-56">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                                Transformasi Dokumen Medis Anda dengan
                                Dokumentasi yang Aman dan Mudah Diakses
                            </h1>
                            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                                Permudah praktik kesehatan Anda dengan layanan
                                dokumentasi medis kami yang komprehensif,
                                memastikan catatan pasien yang akurat dan aman
                                yang dapat diakses kapan saja Anda
                                membutuhkannya.
                            </p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <a
                                    href="#"
                                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                                >
                                    Get started
                                    <svg
                                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
                                <a
                                    href="#"
                                    className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <header className="top-0 sticky z-500 flex justify-between gap-2 py-3 px-8 lg:grid-cols-3  bg-cyan-400 dark:bg-gray-950 bg-transparent-10">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            <Link href="/">
                                <h1 className="ml-2 text-gray-800 dark:text-white text-bold font-extrabold font-mono text-2xl non-italic hover:italic hover:translate-x-5 transition-all ease-in-out">
                                    DokMed
                                </h1>
                            </Link>
                        </div>
                    </div>
                    <nav className="-mx-3 flex flex-1 justify-end">
                        <button
                            id="theme-toggle"
                            type="button"
                            onClick={toggleDarkMode}
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        >
                            {isDarkMode ? (
                                <svg
                                    id="theme-toggleLight-icon"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    id="theme-toggle-dark-icon"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            )}
                        </button>
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className=" min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="mt-6 z-0">
                            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <FooterApp />
            </div>
        </>
    );
}
