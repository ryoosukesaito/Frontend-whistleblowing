import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserDelete = () => {
  
  return (
    <div>
      <div className="bg-white w-3/6 border-2">
        <h1 className="text-center mt-10 font-semibold">
          Are you sure to delete this user?
        </h1>
        <div className="flex justify-center">
          <ul className="flex items-start flex-col w-2/5">
            <li className="flex flex-row m-6">
              <div>ID</div>:<div>{adminDetail._id}</div>
            </li>
            <li className="flex flex-row basis-2 m-6">
              <div>Role</div>:<div>{adminDetail.role}</div>
            </li>
            <li className="flex flex-row m-6">
              <div>Name</div>:<div>{adminDetail.name}</div>
            </li>
            <li className="flex flex-row m-6">
              <div>Email</div>:<div>{adminDetail.email}</div>
            </li>
          </ul>
        </div>
        <div className="flex flex-row justify-center m-4 text-sm">
          <button
            className="bg-gray-scale-3 w-20 h-6 m-8"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button className="bg-delete w-20 h-6 m-8">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
