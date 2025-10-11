import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slice/feedSlice";

const EditProfileCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, About } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="card bg-white w-80 shadow-xl rounded-3xl p-4 hover:scale-105 transition-all duration-300">
        <figure className="mb-4">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="rounded-xl object-cover h-48 w-full"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{firstName + " " + lastName}</h2>
          <p className="text-lg text-gray-500 mt-2">{About}</p>
          {age && gender && <p className="text-sm text-gray-600 mt-2">{age + ", " + gender}</p>}
          
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleSendRequest("like", _id)}
              className="bg-red-500 text-white hover:bg-red-600 rounded-full p-3 w-12 h-12 flex justify-center items-center"
            >
              <i className="fas fa-heart text-xl"></i>
            </button>
            <button
              onClick={() => handleSendRequest("dislike", _id)}
              className="bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-full p-3 w-12 h-12 flex justify-center items-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;





{/* <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested",_id)}
            >
              Interested
            </button>
          </div> */}