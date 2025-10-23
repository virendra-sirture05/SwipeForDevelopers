import axios from "axios";
import React, { useState } from "react";
import { SiTinder } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import { removeUser } from "../utils/slice/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-pink-500 to-orange-500 text-white sm:px-10 sm:py-5">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-3xl">
          <SiTinder />
          DevSwipe
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end flex justify-center items-center gap-4">
            <h1 className="text-[20px]">{user.firstName}</h1>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                className="w-16 rounded-full"
                onClick={() => setIsOpen(true)}
              >
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>

            {/* 🔹 Right Sidebar (Slide Menu) */}
            <div
              className={`fixed z-50 top-0 right-0 h-full w-64 bg-white text-black p-6 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close Button */}
              <button
                className="text-2xl mb-6 text-green-400"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <ul className="flex flex-col gap-6 text-lg font-semibold">
                <li
                  className="cursor-pointer hover:bg-green-700/20 hover:shadow-[0_0_15px_2px_rgba(34,197,94,0.4)] rounded-xl px-4 py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    to={"/profile"}
                    className="flex justify-between items-center"
                  >
                    Profile
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      New
                    </span>
                  </Link>
                </li>

                <li
                  className="cursor-pointer hover:bg-green-700/20 hover:shadow-[0_0_15px_2px_rgba(34,197,94,0.4)] rounded-xl px-4 py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={"/connections"}>Connections</Link>
                </li>

                <li
                  className="cursor-pointer hover:bg-green-700/20 hover:shadow-[0_0_15px_2px_rgba(34,197,94,0.4)] rounded-xl px-4 py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={"/requests"}>Requests</Link>
                </li>

                <li
                  className="cursor-pointer hover:bg-green-700/20 hover:shadow-[0_0_15px_2px_rgba(34,197,94,0.4)] rounded-xl px-4 py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={"/premium"}>Premium</Link>
                </li>

                <li
                  className="cursor-pointer hover:bg-red-700/20 hover:shadow-[0_0_15px_2px_rgba(239,68,68,0.4)] rounded-xl px-4 py-2 transition-all duration-300 text-red-400"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
