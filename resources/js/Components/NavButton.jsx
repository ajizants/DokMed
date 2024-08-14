import React from "react";
import { Link } from "@inertiajs/react";

const NavButton = ({ iconPath, label, onClick, href, active }) => {
    const baseClasses = "w-5 h-5 mb-2";
    const activeClasses = active
        ? "text-blue-600 dark:text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";

    return (
        <Link
            href={href}
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
                className={`${
                    active
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                } text-sm`}
            >
                {label}
            </span>
        </Link>
    );
};

export default NavButton;
