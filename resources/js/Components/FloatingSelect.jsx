import React, { useState } from "react";
import Select from "react-select";

function FloatingSelect({ label, options, id, name }) {
    return (
        <Select
            id={id}
            options={options}
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            name={name}
            placeholder={label}
            isClearable
        />
    );
}

export default FloatingSelect;
