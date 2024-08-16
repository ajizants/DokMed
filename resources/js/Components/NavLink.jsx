import { Link } from "@inertiajs/react";
import classNames from "classnames";

const NavLink = ({ href, active, icon, label }) => {
    const linkClasses = classNames(
        "relative flex items-center group px-2 py-1 transition duration-150 ease-in-out",
        {
            "text-blue-500 border-b-2 border-blue-500": active,
            "text-white": !active,
        }
    );
    const iconClasses = classNames("w-7 h-7", {
        "text-blue-500 border-b-2 border-blue-500": active,
        "text-white": !active,
    });

    return (
        <Link href={href} className={linkClasses}>
            <div className="relative flex items-center hover:scale-110">
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 whitespace-nowrap hidden group-hover:block bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                    {label}
                </div>
                <svg
                    className={iconClasses}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    {icon}
                </svg>
            </div>
        </Link>
    );
};

export default NavLink;
