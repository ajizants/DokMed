import React, { useState } from "react";
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
            maxHeight: "100px", // Sesuaikan tinggi dropdown
            overflowY: "auto",
            paddingRight: "2px", // Ruang untuk scrollbar
        }),
    };
    return (
        <Select
            id={id}
            options={options}
            className="my-react-select-container"
            styles={customStyles}
            classNamePrefix="my-react-select"
            name={name}
            placeholder={label}
            isClearable
        />
    );
}

export default FloatingSelect;
