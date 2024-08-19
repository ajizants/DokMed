import { Link } from "@inertiajs/react";
import classNames from "classnames";

const NavLink = ({ href, active, icon, label }) => {
    const linkClasses = classNames(
        "relative flex items-center group px-2 py-1 transition duration-150 ease-in-out hover:scale-110",
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
            <li className="relative flex items-center ">
                <div className="absolute left-full w-64 top-1/2 transform -translate-y-1/2 ease-in-out ml-4 hidden group-hover:flex items-center">
                    <div className="">
                        <svg
                            className=" text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <span className=" bg-gray-200 dark:bg-gray-300 text-black px-2 py-1 rounded z-30">
                        {label}
                    </span>
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
            </li>
        </Link>
    );
};

export default NavLink;
