import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import EditProfileCard from "./EditProfileCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.About || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          About: about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex gap-10 absolute top-0 left-[30%] p-6">
        <div className="flex justify-center items-center">
          <div className="card bg-white w-full max-w-md shadow-lg rounded-xl p-4">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            
            <label className="w-full my-3">
              <span className="text-lg text-gray-700">First Name:</span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="w-full my-3">
              <span className="text-lg text-gray-700">Last Name:</span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="w-full my-3">
              <span className="text-lg text-gray-700">Photo URL:</span>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="w-full my-3">
              <span className="text-lg text-gray-700">Age:</span>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="w-full my-3">
              <span className="text-lg text-gray-700">Gender:</span>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="w-full my-3">
              <span className="text-lg text-gray-700">About:</span>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full bg-gray-100 text-lg text-gray-700 rounded-lg p-2 mt-2"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button
                className="btn bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <EditProfileCard user={{ firstName, lastName, photoUrl, age, gender }} />

        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success bg-green-500 text-white">
              <span>Profile saved successfully!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
