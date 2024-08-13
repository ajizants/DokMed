import React from "react";

function IdentityForm({ user }) {
    return (
        <form>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label
                        htmlFor="id_user"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        User ID
                    </label>
                    <input
                        type="text"
                        id="id_user"
                        name="id_user"
                        value={user.id_user}
                        readOnly
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="nama"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={user.nama}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="nik"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        NIK
                    </label>
                    <input
                        type="text"
                        id="nik"
                        name="nik"
                        value={user.nik || ""}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="alamat"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="alamat"
                        name="alamat"
                        value={user.alamat}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="no_hp"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="no_hp"
                        name="no_hp"
                        value={user.no_hp}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="tgl_lahir"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="tgl_lahir"
                        name="tgl_lahir"
                        value={user.tgl_lahir}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Gender
                    </label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={user.gender}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label
                        htmlFor="pekerjaan"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Occupation
                    </label>
                    <input
                        type="text"
                        id="pekerjaan"
                        name="pekerjaan"
                        value={user.pekerjaan}
                        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </form>
    );
}

export default IdentityForm;
