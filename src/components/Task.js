import { useEffect, useState } from "react"
import './Task.css'
import { useNavigate } from "react-router-dom";
// import { Alert } from "bootstrap";
import { Alert } from '@mui/material';
import axios from "axios";
import { useRecoilState } from "recoil";
import User_Token from "./Tokaerecoil";

function Task(prop) {
    const navigate = useNavigate();
    const [token, setToken] = useRecoilState(User_Token);
    const [open, setOpen] = useState(false);
    const [deletePage, setDeletePage] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [width1, setwidth] = useState(prop.t.TaskDone / prop.t.totalTasks);
    const [color, setcolor] = useState();
    useEffect(() => {

        if (prop.t.status === 'Completed')
            setcolor('high')
        else if (prop.t.status === 'in Progress')
            setcolor('medium')
        if (prop.t.status === 'pending')
            setcolor('low')

    }, [])
    const handleEdit = () => {
        localStorage.setItem('taskId', prop.t._id);
        navigate(`/edit/${prop.t._id}`);
    }

    return (
        <>

            <div className="task">

                <div className="edit_delet">
                    <button className="edit" onClick={handleEdit}><i class="fa-solid fa-pen-to-square"></i></button>
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
                        <span style={{ width: `${prop.t.TaskDone / prop.t.totalTasks * 100}%` }} className={color}></span>
                    </div>
                    <div className="dates">
                        <div className="start_date">
                            <p>start Date</p>
                            <p>{prop.t.createdAt && prop.t.createdAt.split('T')[0]}</p>
                        </div>
                        <div className="end_date">
                            <p>Due Date</p>
                            <p>{prop.t.deadline && prop.t.deadline && prop.t.deadline.split('T')[0]}</p>
                        </div>
                    </div>
                    <div className="teams">
                        {prop.t.assignee ? prop.t.assignee.map((x) => {
                            return (
                                <div className="team_member">
                                    <div className="team_member_info">
                                        <p>{x.name} , </p>
                                        <img src={x.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} />
                                    </div>
                                </div>
                            )
                        }) : <p>No assignee</p>}
                    </div>
                    {prop.t.ratingGiven > 0 &&
                        <div className="rating">
                            <p>Rating : {prop.t.ratingGiven} / 5 <i class="fa-solid fa-star"></i></p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Task;