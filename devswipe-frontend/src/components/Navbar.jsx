import axios from "axios";
import React from "react";
import { SiTinder } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import { removeUser } from "../utils/slice/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
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
              <div className="w-16 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg shadow-xl mt-56 w-52 p-4 space-y-2 text-gray-800"
            >
              <li className="hover:bg-pink-100 transition-all duration-200 rounded-md">
                <Link
                  to={"/profile"}
                  className="flex justify-between items-center text-lg font-semibold"
                >
                  Profile
                  <span className="badge badge-pill bg-pink-500 text-white">
                    New
                  </span>
                </Link>
              </li>
              <li className="hover:bg-pink-100 transition-all duration-200 rounded-md">
                <Link
                  to={"/connections"}
                  className="flex justify-between items-center text-lg font-semibold"
                >
                  Connections
                </Link>
              </li>
              <li className="hover:bg-pink-100 transition-all duration-200 rounded-md">
                <Link
                  to={"/requests"}
                  className="flex justify-between items-center text-lg font-semibold"
                >
                  Requests
                </Link>
              </li>
              <li className="hover:bg-pink-100 transition-all duration-200 rounded-md">
                <Link
                  className="flex justify-between items-center text-lg font-semibold"
                  to={"/premium"}
                >
                  Premium
                </Link>
              </li>
              <li className="hover:bg-pink-100 transition-all duration-200 rounded-md">
                <a
                  onClick={handleLogout}
                  className="flex justify-between items-center text-lg font-semibold text-red-500"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
