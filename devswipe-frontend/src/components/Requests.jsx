import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/slice/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-center mt-10 font-bold text-2xl"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-4xl mb-6">Connection Requests</h1>
      <div className="flex flex-wrap justify-center gap-6 overflow-y-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, About } = request.fromUserId;
          return (
            <div
              key={_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/2 p-4"
            >
              <div className="bg-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-center p-4">
                  {/* Photo on the left */}
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover border-4 border-red-500"
                    src={photoUrl}
                  />
                  {/* Text content on the right */}
                  <div className="ml-4 text-left">
                    <h2 className="font-semibold text-xl text-gray-800 mb-2">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p className="text-sm text-gray-500">{age + ", " + gender}</p>}
                    <p className="text-sm text-gray-600 mt-2">{About}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4">
                  <button
                    className="bg-red-500 text-white py-2 px-6 rounded-xl hover:bg-red-600 transition-all duration-300"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-600 transition-all duration-300"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
