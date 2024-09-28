import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import ResponsiveNavLink from "./ResponsiveNavLink";

// const NavButton = ({ iconPath, label, onClick, href, active }) => {
//     const baseClasses = "w-5 h-5 mb-2";
//     const activeClasses = active
//         ? "text-blue-600 dark:text-blue-500"
//         : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";

//     return (
//         <Link
//             href={href || "#"}
//             onClick={onClick}
//             className="relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
//         >
//             <svg
//                 className={`${baseClasses} ${activeClasses}`}
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//             >
//                 <path d={iconPath} />
//             </svg>

//             <div
//                 className={`absolute bottom-0 mb-6 whitespace-nowrap text-sm  bg-gray-800 dark:bg-gray-300 text-white dark:text-black rounded-lg px-2 py-1 ${
//                     active
//                         ? "text-blue-600 dark:text-blue-500"
//                         : "text-gray-500 dark:text-gray-400"
//                 } opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-opacity`}
//             >
//                 {label}
//             </div>
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-caret-down-fill text-gray-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-opacity"
//                 viewBox="0 0 16 16"
//             >
//                 <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
//             </svg>
//         </Link>
//     );
// };

const NavButton = ({ iconPath, label, onClick, href, active }) => {
    const baseClasses = "w-5 h-5 mb-2";
    const activeClasses = active
        ? "text-blue-600 dark:text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";

    const Component = href ? Link : "button"; // Use Link if href is provided, otherwise use button

    return (
        <Component
            href={href || "#"} // Use # if href is not provided
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
                className={` bottom-0 mb-6 whitespace-nowrap text-sm text-white dark:text-black rounded-lg px-2 py-1 ${
                    active
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-500 dark:text-gray-400"
                } `}
            >
                {label}
            </span>
        </Component>
    );
};

const MobileNav = ({ user }) => {
    const [showingNavigationUp, setShowingNavigationUp] = useState(false);

    return (
        <>
            <div className={showingNavigationUp ? "block w-full" : "hidden"}>
                <div className="w-64 rounded-tl-xl pt-4 fixed right-0 bottom-16 pb-1 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-600">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800 dark:text-gray-300">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-400">
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
            <div className="lg:hidden fixed bottom-0 left-0 z-20 w-full h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mt-2 mx-auto font-medium">
                    <NavButton
                        iconPath="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                        label="Home"
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    />
                    <NavButton
                        iconPath="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                        label="Pendaftaran"
                        href={route("pendaftaran.index")}
                        active={route().current("pendaftaran.index")}
                    />
                    <NavButton
                        iconPath="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                        label="Askep"
                        href={route("askep.index")}
                        active={route().current("askep.index")}
                    />
                    <NavButton
                        iconPath="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z"
                        label="Master"
                        href={route("master.index")}
                        active={route().current("master.index")}
                    />
                    <NavButton
                        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                        label="Profil"
                        onClick={() =>
                            setShowingNavigationUp((prevState) => !prevState)
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default MobileNav;
