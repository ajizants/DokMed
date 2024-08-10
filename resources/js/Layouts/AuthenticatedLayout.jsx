import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import SidebarMenu from "@/Components/MultiNav";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="top-0 sticky z-500 md:ml-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between py-2">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="ml-2 text-gray-800 dark:text-white text-bold">
                                        DOKMED
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.name || "Guest"}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("pasien.index")}
                            active={route().current("pasien")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex">
                <aside className="hidden md:block overflow-x-hidden fixed h-screen top-0 pt-2 w-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center py-3 space-y-4">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Dashboard
                                    </div>
                                    <svg
                                        className="w-7 h-7 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Pasien
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                            <NavLink
                                href={route("pasien.index")}
                                active={route().current("pasien.index")}
                                className="relative flex items-center group"
                            >
                                <div className="relative flex items-center">
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                        Users
                                    </div>
                                    <svg
                                        className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </NavLink>

                            <SidebarMenu>
                                <SidebarMenu.Trigger>
                                    <div className="relative flex items-center">
                                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                                            Master Data
                                        </div>
                                        <div className="relative flex items-center">
                                            <svg
                                                className="w-[28px] h-[28px] text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </SidebarMenu.Trigger>
                                <SidebarMenu.Content align="right" width="56">
                                    <SidebarMenu.Link href="#">
                                        Sub Item 1
                                    </SidebarMenu.Link>
                                    <SidebarMenu.SubMenu>
                                        <SidebarMenu.Link href="#">
                                            Sub Sub Item 1
                                        </SidebarMenu.Link>
                                        <SidebarMenu.Link href="#">
                                            Sub Sub Item 2
                                        </SidebarMenu.Link>
                                    </SidebarMenu.SubMenu>
                                    <SidebarMenu.Link href="#">
                                        Sub Item 2
                                    </SidebarMenu.Link>
                                </SidebarMenu.Content>
                            </SidebarMenu>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 md:ml-20 px-4 lg:px-2 py-2">
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                </main>
            </div>
        </div>
    );
}
