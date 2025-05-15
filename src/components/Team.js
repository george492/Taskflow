import { useEffect, useState } from "react";
import axios from "axios";
import Teammember from "./Teammemeber";
import { useRecoilState } from "recoil";
import User_Token from "./Tokaerecoil";

function Team() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
 // const token = localStorage.getItem("token");
  const [token,setttoken]=useRecoilState(User_Token);
  
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      // console.log("Welcome to the dashboard");
      const response = await axios .get("http://localhost:5000/api/auth/users");

      setUsers(response.data)
      console.log("Users fetched:", response.data);
      
      console.log("Users fetched 2:", users);
    } catch (error) {
      console.error('Failed to fetch Users:', error);
      setUsers([]);
    }
  };

}, [ ]);
  
    // Count tasks by assignee
  const assigneeStats = {};

  tasks.forEach((task) => {
    const assigneeId = task.assignee?._id || task.assignee;
    if (!assigneeId) return;

    if (!assigneeStats[assigneeId]) {
      assigneeStats[assigneeId] = {
        _id: assigneeId,
        pending: 0,
        inProgress: 0,
        done: 0,
      };
    }

    switch (task.status) {
      case "To Do":
        assigneeStats[assigneeId].pending++;
        break;
      case "In Progress":
        assigneeStats[assigneeId].inProgress++;
        break;
      case "Done":
        assigneeStats[assigneeId].done++;
        break;
      default:
        break;
    }
  });

  // Merge user info into stats
  const teamData = Object.values(assigneeStats).map((stat) => {
    const user = users.find((u) => u._id === stat._id) || {};
    return {
      ...stat,
      name: user.name || "Unknown",
      email: user.email || "Unknown",
      profileImage: user.profileImage || "",
    };
  });

  return (
    <div className="TEAm">
      <h1>Team Members</h1>
      <div className="team">
        {teamData.map((m) => (
          <Teammember key={m._id} m={m} />
        ))}
      </div>
    </div>
  );
}

export default Team;
