import { useParams } from "react-router-dom";

import Task from "./Task";
import { useEffect, useState } from "react";
import All__Tasks from "./TasksRecoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import User_Token from "./Tokaerecoil";
import CUser from "../UserRecoil";

function AllTasks()
{
    const param=useParams();
    const [Tasks,settasks]=useState([]);
    const[TaskDat,setTaskData]=useRecoilState(All__Tasks);
    const [token, setToken] = useRecoilState(User_Token);
    const [Cuser, setCuser] = useRecoilState(CUser);
    // console.log("TaskData" ,TaskDat );
    useEffect(() => {
      // console.log("Cuser",Cuser);
      // console.log("token",token);
        const fetchTasks = async () => {
          try {
            // console.log("Welcome to the dashboard");
            const response = await axios.get('http://localhost:5000/api/tasks', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setTaskData(response.data);
            // console.log("Tasks fetched:", response.data);
            
            // console.log("Tasks fetched 2:", tasks);
          } catch (error) {
            console.error('Failed to fetch tasks:', error);
            setTaskData([]);
          }
        };
    
        if (Cuser && token) {
          fetchTasks();
        }
      }, [Cuser, token]);
    useEffect(()=>
    {
        if(param.status==='all')
            settasks(TaskDat);
        else{     
              const  Taskat=TaskDat.filter(p=>p.status===param.status);
              settasks(Taskat);}
    },[param,TaskDat])
//    TaskData.filter(p=>p.status===param.status);
    return(
        <div className="alltasks">
           
    {
    //    console.log("Tasks",Tasks)
   Tasks.map((t)=>
    {
        
        return(
        <Task t={t} key={t._id}/>)
        
    })
  }
    {/* // <div> {TaskDat[0].name}</div>
        // <Task t={Tasks[0]} key={Tasks[0]._id}/> */}
    
    </div>)
}
export default AllTasks;