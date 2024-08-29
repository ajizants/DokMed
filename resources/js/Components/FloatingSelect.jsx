import React from "react";
import Select from "react-select";

function FloatingSelect({ label, options, id, name }) {
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            "::-webkit-scrollbar": {
                width: "2px",
                height: "2px",
            },
            "::-webkit-scrollbar-track": {
                background: "#978d8d",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#e2dddd",
                border: "2px solid #7d7676",
                borderRadius: "20px",
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555",
            },
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "100px", // Adjust the height of the dropdown
            overflowY: "auto",
            paddingRight: "2px",
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: "#978d8d", // Set your desired border color
            boxShadow: state.isFocused ? "none" : "none", // Remove the box-shadow on focus
            "&:hover": {
                borderColor: "#978d8d", // Ensure border color remains consistent on hover
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#978d8d",
        }),
    };

    return (
        <div className="relative mt-6">
            <Select
                id={id}
                options={options}
                styles={customStyles}
                className="my-react-select-container mt-3"
                classNamePrefix="my-react-select"
                name={name}
                placeholder=""
                isClearable
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
                {label}
            </label>
        </div>
    );
}

export default FloatingSelect;
