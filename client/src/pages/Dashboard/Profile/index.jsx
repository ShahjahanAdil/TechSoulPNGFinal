import React, { useMemo, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ButtonLoader from "../../../components/ButtonLoader";
import axios from "axios";

const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        width: '100%',
        padding: '0.25rem 0.75rem',
        border: '1px solid #d1d5db', // Tailwind's gray-300
        borderRadius: '10px',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none', // ring-2 ring-blue-500
        '&:hover': {
            borderColor: '#9ca3af' // Tailwind's gray-400
        },
        fontSize: '1rem',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? '#e5e7eb' // Tailwind's gray-200
            : 'white',
        color: '#666',
        padding: '10px 15px',
        cursor: 'pointer',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#666',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: 20,
    }),
};

export default function Profile() {

    const { userData, dispatch } = useAuthContext();
    const { user } = useAuth0();

    const { userID, username, fullname, email, address, phone, job } = userData;
    const initialState = {
        userID,
        username,
        fullname,
        email,
        address,
        job,
        phone,
        oldPassword: "",
        newPassword: "",
    };

    const [state, setState] = useState(initialState);
    const options = useMemo(() => countryList().getData(), []);
    const [selectValue, setSelectValue] = useState(userData?.address ? options.find(opt => opt.label === userData.address || opt.value === userData.address) : '');
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (val) => {
        setSelectValue(val);
        setState((prev) => ({
            ...prev,
            address: val.label
        }));
    };

    const handleOnChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleUpdateProfile = () => {
        if (!state?.username || !state?.email) {
            return window.toastify("Username and email fields are required!", "warning")
        }

        setLoading(true);
        axios.patch(`${import.meta.env.VITE_HOST}/dashboard/profile/update-profile`, state)
            .then((res) => {
                const { status, data } = res;
                if (status === 202) {
                    window.toastify(data.message, "success");
                    setState((prev) => ({ ...prev, oldPassword: "", newPassword: "" }));
                    dispatch({
                        type: "SET_PROFILE",
                        payload: { user: { ...userData, ...state } },
                    });
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
                window.toastify(
                    err.response?.data?.message || "Something went wrong",
                    "error"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="p-4 md:p-8 bg-white rounded-[20px]  h-full shadow">
                <h5 className="text-xl  !text-[#55AF7C] font-semibold mb-8">
                    My Profile
                </h5>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={state?.username}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div>
                                <label className="font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={state?.email}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            {!user && (
                                <div>
                                    <label className="font-semibold mb-2">
                                        Enter Old Password
                                    </label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        placeholder="Enter your old password"
                                        value={state?.oldPassword}
                                        className="w-full border px-4 py-2 rounded-[10px]"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={state?.address}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div>
                                <label className="font-semibold mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="123456789"
                                    value={state?.phone}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            {!user && (
                                <div>
                                    <label className="font-semibold mb-2">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="Enter your new password"
                                        value={state?.newPassword}
                                        className="w-full border px-4 py-2 rounded-[10px]"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-[#55AF7C] text-white flex items-center gap-2 px-6 py-2 rounded-[12px] hover:bg-[#55af7cb7] transition"
                        disabled={loading}
                        onClick={handleUpdateProfile}
                    >
                        {loading ? "Saving" : "Save"} changes {loading && <ButtonLoader />}
                    </button>
                </div> */}

                {/* ---------Changes -------*/}

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Data */}
                        <div>
                            <h2 className="!text-[24px] font-semibold mb-4">Personal Data</h2>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">Real Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Enter your full name"
                                    value={state?.fullname}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">Job Title</label>
                                <input
                                    type="text"
                                    name="job"
                                    placeholder="Enter your job title"
                                    value={state?.job}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">
                                    Telephone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="123456789"
                                    value={state?.phone}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">Location</label>
                                {/* <select className="w-full border px-4 py-2 rounded-[10px]">
                                    <option value="">Select Location</option>
                                    <option value="Gambia">Gambia</option>
                                </select> */}
                                <Select styles={customSelectStyles} options={options} value={selectValue} placeholder="Select Location" onChange={handleSelectChange} />
                            </div>
                        </div>

                        {/* Right Column - Account Information */}
                        <div>
                            <h2 className="!text-[24px] font-semibold mb-4">
                                Account Information
                            </h2>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">
                                    <span className="!text-[14px] text-red-500">*</span> Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={state?.username}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-bold !text-[16px]">
                                    <span className="!text-[14px] text-red-500">*</span> Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={state?.email}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>
                            {!user &&
                                <>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-bold !text-[16px]">
                                            <span className="!text-[14px] text-red-500">*</span> Old Password
                                        </label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Enter your old password"
                                            value={state?.oldPassword}
                                            className="w-full border px-4 py-2 rounded-[10px]"
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block mb-1 font-bold !text-[16px]">
                                            <span className="!text-[14px] text-red-500">*</span> New password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Enter your new password"
                                            value={state?.newPassword}
                                            className="w-full border px-4 py-2 rounded-[10px]"
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                </>
                            }
                            {/* <div>
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forget password?
                                </a>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className="bg-[#55AF7C] text-white flex items-center gap-2 px-6 py-2 rounded-[12px] hover:bg-[#55af7cb7] transition"
                            disabled={loading}
                            onClick={handleUpdateProfile}
                        >
                            {loading ? "Saving" : "Save"} changes {loading && <ButtonLoader />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
