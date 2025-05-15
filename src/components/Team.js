import { useEffect, useState } from "react";
import axios from "axios";
import Teammember from "./Teammemeber";

function Team() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all users
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Users fetch error:", err));

    // Fetch all tasks created by the logged-in user
    axios
      .get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Tasks fetch error:", err));
  }, [token]);

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
