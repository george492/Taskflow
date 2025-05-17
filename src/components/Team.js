import { useEffect, useState } from "react";
import axios from "axios";
import Teammember from "./Teammemeber";
import { useRecoilState } from "recoil";
import User_Token from "./Tokaerecoil";
import CUser from '../UserRecoil';
import  All__Tasks  from "./TasksRecoil";
function Team() {
  const [usersArray, setUsersArray] = useState([]);
  const[current_user,set_current_user]=useRecoilState(CUser);
  const[tasks,setTasks]=useRecoilState(All__Tasks); 
  const[flag,setflag]=useState(false);
  const [fetch,setfetch]=useState(false);
  const [token,setttoken]=useRecoilState(User_Token);
  const [stat,set_stat]=useState('');
  const [inProgress,set_inProgress]=useState(0);
  const [complete,set_complete]=useState(0);
  const [pending,set_pending]=useState(0);
  let Team_members=[]
  const [Team_membersA, set_Team_membersA] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios .get("http://localhost:5000/api/auth/users");

      setUsersArray(response.data)
      
    } catch (error) {
      console.error('Failed to fetch Users:', error);
      setUsersArray([]);
    }
  };
  useEffect(() => {
 fetchUsers();
}, []);
useEffect(() => {
  if(usersArray.length>0&&!flag && tasks.length>0)
  {
    setflag(true);
    get_team_members(usersArray);
   
  }
  
}, [usersArray,tasks]);
 
function getUsers(t, usersA) {
  if (!t.assignee) return [];

  return t.assignee.map((u) => {
    const user = usersA.find((us) => us._id === u._id&&us._id!==current_user._id);
    if (!user) return null;

    const currentStats = {
      pending: 0,
      complete: 0,
      inprogress: 0,
    };

    return {
      name: user.name,
      id: user._id,
      pending: currentStats.pending + (t.status === 'pending' ? 1 : 0),
      complete: currentStats.complete + (t.status === 'Completed' ? 1 : 0),
      inprogress: currentStats.inprogress + (t.status === 'in Progress' ? 1 : 0),
      email: user.email,
      profileImage: user.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    };
  }).filter(Boolean); // Remove null entries
}

function get_team_members(users) {
  const updatedMembers = tasks.flatMap((t) => getUsers(t, users));

  // Merge duplicates and sum counts
  const mergedMembers = updatedMembers.reduce((acc, member) => {
    const existing = acc.find((m) => m.id === member.id);
    if (existing) {
      existing.pending += member.pending;
      existing.complete += member.complete;
      existing.inprogress += member.inprogress;
    } else {
      acc.push({ ...member }); // Clone to avoid mutation
    }
    return acc;
  }, []);

  set_Team_membersA(mergedMembers);
}

  return (
    <div className="TEAm">
      <h1>Team Members</h1>
      <div className="team">
      {Team_membersA&&Team_membersA.map((m) => {
  return <Teammember key={m._id} m={m} />;
})}
      </div>
    </div>
  );
}

export default Team;
