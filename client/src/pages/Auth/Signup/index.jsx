import React, { useEffect, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../../components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import illustration from "../../../assets/images/illustration.png";

const initialState = { username: "", email: "", password: "" };
const generateRandomID = () => Math.random().toString(36).slice(3);

export default function Signup() {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const { dispatch } = useAuthContext();
    const [state, setState] = useState(initialState);
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false);
    const [triggerVerification, setTriggerVerification] = useState(false);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [triggerGoogleLogin, setTriggerGoogleLogin] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSignup = async (e) => {
        e.preventDefault();

        const { username, email, password } = state;
        if (!username || !email || !password) {
            return window.toastify("Please fill all fields", "warning");
        }

        if (username.trim().length < 3) return window.toastify("Username must be atleast 3 characters long", "error");
        if (!window.isEmail(email)) return window.toastify("Please enter a valid email address", "error");
        if (password.trim().length < 6) return window.toastify("Password must be atleast 6 characters long", "error");

        setVerificationLoading(true);
        await axios.post(`${import.meta.env.VITE_HOST}/auth/create-email-verification`, { email })
            .then((res) => {
                const { status, data } = res;
                if (status === 201) {
                    setTriggerVerification(true)
                    window.toastify(data.message, "success");
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
                window.toastify(err?.response?.data?.message || "Something went wrong while creating email verification code", "error");
            })
            .finally(() => {
                setVerificationLoading(false);
            });
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();

        const { username, email, password } = state;
        if (!username || !email || !password) return window.toastify("Please fill all fields", "warning");
        if (!code) return window.toastify("Enter your email verification code", "warning");

        if (username.trim().length < 3) return window.toastify("Username must be atleast 3 characters long", "error");
        if (!window.isEmail(email)) return window.toastify("Please enter a valid email address", "error");
        if (password.trim().length < 6) return window.toastify("Password must be atleast 6 characters long", "error");

        const newUserData = {
            userID: generateRandomID(),
            username,
            email,
            password,
            code,
            status: "active",
            role: "user",
            plan: "free",
            address: "",
            phone: "",
            downloads: 0,
            uploads: 0,
            points: 0,
        };

        setLoading(true);
        await axios.post(`${import.meta.env.VITE_HOST}/auth/signup`, newUserData)
            .then((res) => {
                const { status, data } = res;
                if (status === 201) {
                    window.toastify(data.message, "success");
                    navigate("/auth/login");
                }
            })
            .catch((err) => {
                const { status, data } = err.response;
                console.error("Frontend POST error", err.message);
                if (status === 403) {
                    return window.toastify(data.message, "info");
                }
                window.toastify(err?.response?.data?.message || "Something went wrong while creating user", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Google Login

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            setTriggerGoogleLogin(true);
            await loginWithPopup({
                authorizationParams: { connection: "google-oauth2" },
            });
        } catch (err) {
            console.error("Google login error:", err);
            window.toastify("Google login failed", "error");
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleAuth0Login = async () => {
            if (!triggerGoogleLogin || !user || !isAuthenticated) return;

            const googleUserData = {
                userID: generateRandomID(),
                username: user.name || user.email?.split("@")[0],
                email: user.email,
                status: "active",
                role: "user",
                plan: "free",
                address: "",
                phone: "",
                downloads: 0,
                uploads: 0,
                points: 0,
            };

            try {
                const res = await axios.post(`${import.meta.env.VITE_HOST}/auth/google`, googleUserData);
                const { status, data } = res;
                if (status === 200 || status === 201) {
                    localStorage.setItem("pngjwt", data.token);
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: data.user } });
                    window.toastify(data.message, "success");
                    navigate("/");
                }
            } catch (err) {
                console.error("Backend error:", err);
                window.toastify("Error processing Google login", "error");
            } finally {
                setLoading(false);
                setTriggerGoogleLogin(false);
            }
        };

        handleAuth0Login();
    }, [user, isAuthenticated, triggerGoogleLogin]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Mint Background Side */}
                <div className="w-full relative h-full  md:min-h-screen bg-[#e9f7f0] flex flex-col justify-center items-center px-4 py-8">
                    <div>
                        <div className="bg-white w-50 h-50 rounded-[12px] flex items-center justify-center shadow-xl p-3 z-10">
                            <div className="bg-[#71C194] rounded-[12px] flex items-center justify-center">
                                <img src={illustration} alt="" className="w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 text-center px-4">
                        <p className="md:!text-[30px] !text-[16px] !text-[#71C194] font-semibold">
                            Create your account to get started.
                        </p>
                        <p>Join the GreenBoard community today!</p>
                    </div>

                    {/* Circles */}
                    <div className="absolute top-10 left-10 w-24 h-24 bg-[#c5e8d6] rounded-full opacity-80 blur-sm shadow-lg"></div>
                    <div className="absolute top-28 left-28 w-16 h-16 border-2 border-[#a3f1c9] rounded-full opacity-60 blur-[1px]"></div>
                    <div className="absolute bottom-24 left-24 w-12 h-12 border-2 border-[#d5133a60] rounded-full opacity-60 blur-[1px]"></div>
                    <div className="absolute bottom-6 left-10 w-20 h-20 bg-[#d5133a60] rounded-full opacity-80 blur-sm shadow-md"></div>
                </div>

                {/* Form Side */}
                <div className="bg-white w-full h-[100%] md:h-[100%]  flex flex-col items-center justify-center gap-5 px-4 py-6 md:py-10">
                    <div className="main-heading text-center">
                        <span className="!text-2xl font-bold">Welcome</span>
                        <p>Join thousands of professionals</p>
                    </div>

                    <div className="bg-white p-5 rounded-[12px] border border-[#71C194] shadow-lg w-full max-w-md">
                        <h2 className="!text-[20px] font-bold text-center text-gray-800 mb-2">
                            Get started
                        </h2>

                        <form onSubmit={handleSignup}>
                            {
                                !triggerVerification ?
                                    <>
                                        <div className="mb-3">
                                            <label className="block !text-[12px] font-medium text-gray-700 mb-1">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={state.username}
                                                placeholder="Enter your username"
                                                className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="block !text-[12px] font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={state.email}
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="block !text-[12px] font-medium text-gray-700 mb-1"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                value={state.password}
                                                className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                    :
                                    <div className="my-3">
                                        <label
                                            htmlFor="code"
                                            className="block !text-[12px] font-medium text-gray-700 mb-1"
                                        >
                                            Enter code
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            placeholder="Enter your verification code"
                                            value={code}
                                            className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
                                            onChange={e => setCode(e.target.value)}
                                        />
                                    </div>
                            }

                            {
                                triggerVerification ?
                                    <button
                                        type="submit"
                                        className="w-full bg-[#71C194] my-2 hover:bg-[#5fab84] text-white py-1.5 rounded-lg font-semibold transition duration-300"
                                        disabled={loading}
                                        onClick={handleVerifyCode}
                                    >
                                        Verify Code
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="w-full bg-[#71C194] my-2 hover:bg-[#5fab84] text-white py-1.5 rounded-lg font-semibold transition duration-300"
                                        disabled={verificationLoading}
                                        onClick={handleSignup}
                                    >
                                        {
                                            !verificationLoading ?
                                                'SignUp' :
                                                'Please wait...'
                                        }
                                    </button>
                            }

                            {
                                !triggerVerification &&
                                <>
                                    <p className="text-center my-2">- OR -</p>

                                    <button
                                        type="button"
                                        className="!text-[#333] w-full flex gap-3 items-center justify-center px-[10px] py-1.5 border-2 rounded-[12px] border-gray-200 hover:!bg-[#efefefa8]"
                                        onClick={() => handleLoginWithGoogle()}
                                    >
                                        <FcGoogle className="text-[18px]" /> Continue With Google
                                    </button>
                                </>
                            }

                            <p className="mt-5 text-center">
                                Already have an account?{" "}
                                <span className="text-[#71C194] cursor-pointer hover:underline" onClick={() => navigate('/auth/login')}>
                                    Login now
                                </span>
                            </p>

                            <p className="!text-[12px] text-center py-3">
                                Trusted by 10000+ professionals worldwide
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}