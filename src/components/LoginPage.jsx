import React, { useContext, useRef, useState } from "react";
import { LOGIN_IMG } from "../utils/contanst";
import { useNavigate } from "react-router-dom";
import ThemeContext from "@/utils/Context";
import { Button } from "./ui/button";

function LoginPage() {
  const userEmail = useRef(null);
  const userPassword = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { isDark, setIsDark } = useContext(ThemeContext);

  function submitForm(e) {
    e.preventDefault();
    const email = userEmail.current.value;
    const password = userPassword.current.value;

    if (email === "demouser@gmail.com" && password === "demopass") {
      navigate("/lessonPlan");
    } else {
      setErrorMessage("Please enter valid email or password!");
    }
  }

  return (
    <div className={`w-full h-screen ${isDark ? "bg-[#2b2b2b] " : "bg-white"}`}>
      <div className="p-3">
        <Button
          onClick={() => setIsDark(!isDark)}
          className={`px-4 py-2 ${
            isDark
              ? "bg-white text-black hover:bg-[#d3d3d3]"
              : "bg-black text-white hover:bg-[#565656]"
          } rounded-lg `}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <div className={`w-[80%] mx-auto flex gap-5 justify-center mt-[30px]`}>
        <form
          onSubmit={(e) => submitForm(e)}
          className={`w-[35%] px-10 py-14 shadow-[4px_3px_10px_rgba(0,0,0,0.5)] ${
            isDark ? "bg-[#2b3350] text-white" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-semibold">Login</h1>
          <div className="text-lg font-semibold mt-8">Email</div>
          <input
            className="px-3 py-2 w-full bg-transparent rounded-md border-[2px] mt-1 border-gray-400 "
            type="email"
            ref={userEmail}
            required
            placeholder="Email address"
          />
          <div className="text-lg font-semibold mt-6">Password</div>
          <input
            className="px-3 py-2 w-full bg-transparent rounded-md border-[2px] mt-1 border-gray-400"
            type="password"
            ref={userPassword}
            required
            placeholder="Enter password"
          />
          {errorMessage && (
            <p className="mt-3 text-center text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 text-lg  font-semibold mt-10 ${
              isDark
                ? "bg-[#f5f5f5] text-black hover:bg-[#ede6e6dd]"
                : "bg-[#893DFF] text-white hover:bg-[#8b3dffdd]"
            }  rounded-md cursor-pointer`}
          >
            Login
          </button>
        </form>
        <div>
          <img className="max-w-[550px] rounded-sm" src={LOGIN_IMG} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;