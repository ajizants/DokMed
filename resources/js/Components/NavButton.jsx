import React from "react";

const NavButton = ({ label, onClick, isActive }) => {
    const baseClasses =
        "flex items-center gap-2 border-gray-700 rounded-t-lg py-1 px-2 text-white group";
    const activeClasses = "bg-blue-700";
    const hoverClasses = "hover:bg-gray-200 hover:text-black";
    const inactiveClasses = "bg-gray-700";

    return (
        <>
            <li className="mt-3 dark:text-white">
                <button
                    type="button"
                    className={`${baseClasses} ${
                        isActive ? activeClasses : inactiveClasses
                    } ${hoverClasses}`}
                    onClick={onClick}
                >
                    <svg
                        className="w-[26px] h-[26px] text-gray-800 dark:text-white group-hover:text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d={
                                isActive
                                    ? "M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z"
                                    : "M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z"
                            }
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="group-hover:text-black">{label}</p>
                </button>
            </li>
        </>
    );
};

export default NavButton;
