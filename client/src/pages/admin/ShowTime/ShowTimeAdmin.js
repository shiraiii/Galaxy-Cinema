import React from "react";
import { useNavigate } from "react-router-dom";

const ShowTimeAdmin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/admin/showtime/create")}>Add</button>
    </div>
  );
};

export default ShowTimeAdmin;
