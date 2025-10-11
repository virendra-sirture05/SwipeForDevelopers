import axios from "axios";
import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      console.log("user added");
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="a w-full h-[85vh]">
      <div className="card bg-gradient-to-r bg-white w-96 shadow-lg mx-auto mt-12">
        <div className="card-body">
          <h2 className="font-bold font-sans text-4xl text-center text-black">
            {isLoginForm ? "Login" : "sign up"}
          </h2>

          {!isLoginForm && (
            <>
              <label className="flex items-center text-xl text-gray-900 gap-2 bg-white border-2 border-gray-300 focus-within:border-blue-500 p-2 w-full">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  className="grow bg-transparent outline-none"
                  placeholder="firstName..."
                />
              </label>
              <label className="flex items-center text-xl text-gray-900 gap-2 bg-white border-2 border-gray-300 focus-within:border-blue-500 p-2 w-full">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  className="grow bg-transparent outline-none"
                  placeholder="lastName..."
                />
              </label>
            </>
          )}

          <label className="flex items-center text-xl text-gray-900 gap-2 bg-white border-2 border-gray-300 focus-within:border-blue-500 p-2 w-full">
            <IoMdMail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="grow bg-white outline-none"
              placeholder="Email"
            />
          </label>

          <label className="flex items-center text-xl text-gray-900 gap-2 bg-white border-2 border-gray-300 focus-within:border-blue-500 p-2 w-full">
            <IoKeySharp />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="grow bg-transparent outline-none"
            />
          </label>
          {error && (
            <p className="bg-red-100 border border-red-500 text-red-600 rounded-md p-2">
              {error}
            </p>
          )}
          <div className="card-actions justify-center">
            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              className="btn btn-primary text-xl"
            >
              {isLoginForm ? "Login" : "sign up"}
            </button>
          </div>

          <p
            onClick={() => setIsLoginForm((value) => !value)}
            className="cursor-pointer font-sans text-black text-xl"
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
