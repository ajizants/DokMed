import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import ResponsiveNavLink from "./ResponsiveNavLink";

const NavButton = ({ iconPath, label, onClick, href, active }) => {
    const baseClasses = "w-5 h-5 mb-2";
    const activeClasses = active
        ? "text-blue-600 dark:text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";

    const Component = href ? Link : "button";

    return (
        <Component
            href={href || "#"}
            onClick={onClick}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
            <svg
                className={`${baseClasses} ${activeClasses}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d={iconPath} />
            </svg>
            <span
                className={`bottom-0 mb-6 whitespace-nowrap text-sm rounded-lg px-2 py-1 ${active ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
            >
                {label}
            </span>
        </Component>
    );
};

const MobileNav = ({ user }) => {
    const userRole = user.roles?.includes("admin")
        ? "admin"
        : user.roles?.includes("nakes")
          ? "nakes"
          : "user";
    const [showingNavigationUp, setShowingNavigationUp] = useState(false);

    return (
        <>
            {showingNavigationUp && (
                <div className="block w-full fixed right-0 bottom-16 pb-1 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-tl-xl pt-4">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800 dark:text-gray-300">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-400">
                            {user.email}
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("master.index")}>
                            Master
                        </ResponsiveNavLink>
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
            )}
            <div className="lg:hidden fixed bottom-0 left-0 z-20 w-full h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mt-2 mx-auto font-medium">
                    <NavButton
                        iconPath="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                        label="Home"
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    />
                    {(userRole === "admin" || userRole === "nakes") && (
                        <NavButton
                            iconPath="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Z"
                            label="Pendaftaran"
                            href={route("pendaftaran.index")}
                            active={route().current("pendaftaran.index")}
                        />
                    )}
                    {(userRole === "admin" || userRole === "nakes") && (
                        <NavButton
                            iconPath="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"
                            label="Askep"
                            href={route("askep.index")}
                            active={route().current("askep.index")}
                        />
                    )}
                    {(userRole === "admin" || userRole === "user") && (
                        <NavButton
                            iconPath="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"
                            label="Kegiatan"
                            href={route("kegiatan.index")}
                            active={route().current("kegiatan.index")}
                        />
                    )}
                    <NavButton
                        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                        label="Lainnya"
                        onClick={() => setShowingNavigationUp((prev) => !prev)}
                    />
                </div>
            </div>
        </>
    );
};

export default MobileNav;
