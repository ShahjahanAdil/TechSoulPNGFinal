import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";
import { SiSimplelogin } from "react-icons/si";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { PiPlantLight } from "react-icons/pi";
import illustration from "../../../assets/images/illustration.png";
const initialState = { email: "", password: "" };
const generateRandomID = () => Math.random().toString(36).slice(3);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const { dispatch } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [triggerGoogleLogin, setTriggerGoogleLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = state;
    if (!email || !password) {
      return window.toastify("Please fill all fields", "warning");
    }

    setLoading(true);
    await axios
      .post(`${import.meta.env.VITE_HOST}/auth/login`, { email, password })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setState(initialState);
          localStorage.setItem("pngjwt", data.token);
          dispatch({ type: "SET_LOGGED_IN", payload: { user: data.user } });
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Frontend POST error", err.message);

        if (err.response) {
          const { status, data } = err.response;
          if (status === 401) {
            return window.toastify(data.message, "info");
          }
          return window.toastify(data?.message || "Login failed", "error");
        }

        window.toastify("Network error. Please try again later.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        const res = await axios.post(
          `${import.meta.env.VITE_HOST}/auth/google`,
          googleUserData
        );
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
      <div className="auth-container w-full h-screen p-5 flex flex-col justify-center items-center bg-[#f8f8f8]">
        <div className="auth-box w-full max-w-[450px] min-h-[300px] rounded-[5px] p-5 sm:p-8 bg-white">
          <form onSubmit={handleLogin}>
           

            <h2 className="!text-[22px] sm:!text-[26px] font-bold">
              Login Account
            </h2>
            <p className="mb-5">Login to continue your session</p>

            <div>
              <label htmlFor="email" className="font-bold mb-2 inline-block">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="johnpaul@gmail.com"
                className="w-full px-[10px] py-[8px] rounded-[5px] mb-4"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="font-bold mb-2 inline-block">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-[10px] py-[8px] rounded-[5px] mb-4"
                value={state.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="bg-[var(--md-dark)] text-[#fff] cursor-pointer w-full px-[10px] py-[8px] rounded-[5px] mt-5 hover:bg-[var(--dark)]"
              onClick={handleLogin}
            >
              Login
            </button>

            <p className="text-center my-5">- OR -</p>

            <button
              type="button"
              className="!text-[#333] w-full flex gap-3 items-center justify-center px-[10px] py-[8px] border-2 rounded-[5px] border-gray-200 hover:!bg-[#efefefa8]"
              onClick={() => handleLoginWithGoogle()}
            >
              <FcGoogle className="text-[18px]" /> Continue With Google
            </button>

            <p className="mt-5">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-[var(--primary)] font-bold hover:underline"
              >
                Signup now
              </Link>
            </p>
          </form>
        </div>
      </div>  



      {/* chnaged */}
     <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
  {/* Mint Background Side */}
  <div className="w-full relative h-full md:min-h-screen bg-[#e9f7f0] flex flex-col justify-center items-center px-4 py-8">
    <div>
      <div className="bg-white w-50 h-50 rounded-[12px] flex items-center justify-center shadow-xl p-3 z-10">
        <div className="bg-[#71C194] rounded-[12px] flex items-center justify-center">
          <span>
            <img src={illustration} alt="" className="w-full" />
          </span>
        </div>
      </div>
    </div>

    <div className="mt-5 text-center px-4">
      <p className="md:!text-[30px] !text-[16px] !text-[#71C194] font-semibold">
        Sign in to access your dashboard.
      </p>
      <p>Welcome to GreenBoard!</p>
    </div>

    {/* Circles */}
    <div className="absolute top-10 left-10 w-24 h-24 bg-[#c5e8d6] rounded-full opacity-80 blur-sm shadow-lg"></div>
    <div className="absolute top-28 left-28 w-16 h-16 border-2 border-[#a3f1c9] rounded-full opacity-60 blur-[1px]"></div>
    <div className="absolute bottom-24 left-24 w-12 h-12 border-2 border-[#d5133a60] rounded-full opacity-60 blur-[1px]"></div>
    <div className="absolute bottom-6 left-10 w-20 h-20 bg-[#d5133a60] rounded-full opacity-80 blur-sm shadow-md"></div>
  </div>

  {/* Form Side */}
  <div className="bg-white w-full h-[100%] md:h-[100%] flex flex-col items-center justify-center gap-5 px-4 py-6 md:py-10">
    <div className="main-heading text-center">
      <span className="!text-3xl font-bold">Welcome</span>
      <p>Join thousands of professionals</p>
    </div>

    <div className="bg-white p-8 rounded-[12px] border border-[#71C194] shadow-lg w-full max-w-md">
      <h2 className="!text-[20px] font-bold text-center text-gray-800 mb-2">
        Get started
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71C194]"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="form-checkbox text-[#71C194]" />
            <span>Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-[#71C194] font-medium hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#71C194] hover:bg-[#5fab84] text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          SignIn 
        </button>
 <p className='text-center my-2'>- OR -</p>
                 <button type="button" className='!text-[#333] w-full flex gap-3 items-center justify-center px-[10px] py-1.5 border-2 rounded-[12px] border-gray-200 hover:!bg-[#efefefa8]' onClick={() => handleLoginWithGoogle()}>
                        <FcGoogle className='text-[18px]' /> Continue With Google
                    </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Not registered?
          <a href="#" className="text-[#71C194] hover:underline">
            Create an account
          </a>
        </p>
        <p className="!text-[12px] text-center py-3">
          Trusted by 10000+ professionals worldwide
        </p>
      </form>
    </div>
  </div>
</div>
    </>
  );
}
