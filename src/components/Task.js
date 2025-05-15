import { useEffect, useState } from "react"
import './Task.css'
import { useNavigate } from "react-router-dom";
// import { Alert } from "bootstrap";
import { Alert } from '@mui/material';
import axios from "axios";
import { useRecoilState } from "recoil";
import User_Token from "./Tokaerecoil";

function Task(prop)
{
    const navigate=useNavigate();
    const [token,setToken]=useRecoilState(User_Token);
    const [open,setOpen]=useState(false);
    const [deletePage,setDeletePage]=useState(false);
    const [cancel,setCancel]=useState(false);
    const [width1,setwidth]=useState(prop.t.TaskDone/prop.t.totalTasks);
    const[color,setcolor]=useState();
    useEffect(()=>
    {
        console.log("in function");
        if(prop.t.status==='Completed')
            setcolor('high')
        else if(prop.t.status==='In Progress')
            setcolor('medium')
        if(prop.t.status==='Pending')
            setcolor('low')
        console.log("color"+prop.t.status);
    },[prop.t.status])
   const handleDelete=async()=>
    {
        try {
            const response = await axios.delete(`http://localhost:5000/api/tasks/${prop.t._id}`, {
              headers: {
                Authorization: `Bearer ${token}`, // if using JWT auth
              },
            });
      
            alert(response.data.message);
                navigate('/task/all');
        
          } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete task');
          }
        };
        
    return(
        <>
        {/* {console.log("prop"+prop.t)} */}
        <div className="task">
        <div className={open?"delete_page":"delete_page_hidden"}>
            <Alert severity="error">Are you sure you want to delete this task?</Alert>
           <div className='buttons'>
           <button onClick={()=>{handleDelete();setOpen(false);}}>Delete</button>
           <button onClick={()=>setOpen(false)}>Cancel</button>
           </div>
        </div>
            <div className="edit_delet">
                <button className="edit" onClick={()=>navigate(`/edit/${prop.t._id}`)}><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="delete" onClick={()=>setOpen(true)}><i class="fa-solid fa-trash"></i></button>
            </div>
            <div className="status">
                <p className={prop.t.status}> {prop.t.status}</p>
                <p className={prop.t.priority}>{prop.t.priority} priority</p>
            
            </div>
            <div className="task_name">
                <h2>{prop.t.title}</h2>
                <p className="task_desc">
                {prop.t.description}
                </p>
            </div>
            <div className="task_progress">
            <div className="task_done">
                <p>Task done : {prop.t.TaskDone}/{prop.t.totalTasks} </p>
                
            </div>
            <div className="progress">
            <span style={{ width: `${width1 * 100}%`}} className={color}></span>
                 </div>
                 <div className="dates">
                    <div className="start_date">
                        <p>start Date</p>
                        <p>{prop.t.createdAt.split('T')[0]}</p>
                    </div>
                    <div className="end_date">
                        <p>Due Date</p>
                        <p>{prop.t.deadline.split('T')[0]}</p>
                    </div>
                 </div>
                 <div className="teams">
                    {prop.t.assignee?[prop.t.assignee].map((x)=>
                    {
                        return(
                            <div>
                                <p>{x.name}</p>
                                {/* <img src={x}/> */}
                            </div>
                        )
                    }):<p>No assignee</p>}
                 </div>
            </div>
        </div>
        </>
    )
}
export default Task;