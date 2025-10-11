import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slice/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  console.log(connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="text-center font-bold text-3xl mt-10 text-white">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-4xl mb-6">Connections</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, About } =
            connection;
          return (
            <div key={_id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/2 p-4">
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
                    {age && gender && (
                      <p className="text-sm text-gray-500">
                        {age + ", " + gender}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{About}</p>
                  </div>
                  <Link to={'/chat/'+_id} ><div className="text-black bg-green-400 p-2 px-4 rounded-lg font-semibold">chat</div></Link>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
