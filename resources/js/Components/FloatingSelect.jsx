import React, { useState } from "react";
import Select from "react-select";

function FloatingSelect({ label, options, id, ...props }) {
    const [hasValue, setHasValue] = useState(false);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            paddingTop: "1.5rem",
            paddingBottom: "0.25rem",
            borderColor: state.isFocused ? "#a3a3a3" : "#e5e7eb",
            boxShadow: state.isFocused ? "0 0 0 1px #a3a3a3" : "none",
            "&:hover": {
                borderColor: "#a3a3a3",
            },
        }),
    };

    const handleChange = (selectedOption) => {
        setHasValue(!!selectedOption);
        if (props.onChange) {
            props.onChange(selectedOption);
        }
    };

    return (
        <div className="relative">
            <label
                htmlFor={id}
                className={`absolute left-3.5 top-2 text-sm transition-all duration-300 transform ${
                    hasValue ? "text-xs -translate-y-4" : "translate-y-1/2"
                } text-gray-500 pointer-events-none`}
            >
                {label}
            </label>
            <Select
                id={id}
                options={options}
                styles={customStyles}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}

export default FloatingSelect;
