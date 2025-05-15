import { useEffect, useState } from 'react';
import './Dashboard.css'
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CUser from '../UserRecoil';
import axios from 'axios';
// import { useRecoilState } from 'recoil';
// import CUser from '../UserRecoil';
import All__Tasks from './TasksRecoil';
import User_Token from './Tokaerecoil';

function Dashboard(prop)
{
  const [tasks, setTasks] = useRecoilState(All__Tasks);
  const [Cuser, setCuser] = useRecoilState(CUser);
  const [token, setToken] = useRecoilState(User_Token);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);  
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [low, setLow] = useState(0);
  const [med, setMed] = useState(0);
  const [high, setHigh] = useState(0);
  const[lowper,setLowper] = useState(0);
  const[medper,setMedper] = useState(0);
  const[highper,setHighper] = useState(0);
  
  useEffect(() => {
      const totalCount = tasks.length;
      const pendingCount = tasks.filter(task => task.status === 'pending').length;
      const inProgressCount = tasks.filter(task => task.status === 'in Progress').length;
      const completedCount = tasks.filter(task => task.status === 'Completed').length;
      const lowCount = tasks.filter(task => task.priority === 'Low').length;
      const medCount = tasks.filter(task => task.priority === 'Medium').length;
      const highCount = tasks.filter(task => task.priority === 'High').length;
      const lowper = (pendingCount/totalCount)*100;
      const medper = (inProgressCount/totalCount)*100;
      const highper = (completedCount/totalCount)*100;
      setTotal(totalCount);
      setPending(pendingCount);
      setInProgress(inProgressCount);
      setCompleted(completedCount);
      setLow(lowCount);
      setMed(medCount);
      setHigh(highCount);
      setLowper(lowper);
      setMedper(medper);
      setHighper(highper);
  },[tasks,]);
  const border_style = {
    background: `conic-gradient(
      #673ab7 0% ${lowper}%,
      #03a9f4 ${lowper}% ${lowper + medper}%,
      #009688 ${lowper + medper}%  ${ highper}%
    )`
  };
  

  const after1_style = `.bars > div:nth-child(1)::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${low}%;
    background: #4caf50;
  }`;

  const after2_style = `.bars > div:nth-child(2)::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${med}%;
    background: #ff9800;
  }`;

  const after3_style = `.bars > div:nth-child(3)::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${high}%;
    background: #f44336;
  }`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks([]);
      }
    };

    if (Cuser && token) {
      fetchTasks();
    }
  }, [Cuser, token]);


  const temp = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[temp.getDay()];
  const date = temp.getFullYear() + '-' + String(temp.getMonth() + 1).padStart(2, '0') + '-' + String(temp.getDate()).padStart(2, '0');

  return(
    <div className='Dash'>
       <div className="welcome_message">
        <h1>Welcome!{Cuser.name}</h1>
        <p>{dayName} {date}</p>
        <div className="tasks_dash">
            <div>
            <p><span>{total}</span> total tasks</p>
            </div>
            <div>
            <p><span>{pending}</span> pending tasks</p>
            </div>
            <div>
            <p><span>{inProgress}</span> inProgress tasks</p>
            </div>
            <div>
            <p><span>{completed}</span> completed tasks</p>
            </div>
        </div>
      
       </div>
       <div className='tasks_stat'>
        <div className='task_dist'>
            <h1>task distribution</h1>
            <div className='P_C'>
                <div className='circle_border' style={ total>0?border_style:{backgroundColor:"#ddd"}}>
            <div className='circle'>

            </div></div>
            </div>
            <div className='task_explain'>
            <p>pending</p>
            <p>inProgress</p>
            <p>completed</p>
            </div>
        </div>
        <div className='task_prio'>
        <h1>task periority level</h1>
        <div className='task_prioC'>
        <div className='levels'>
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
        </div>
        <div className='bars'>
            <div className='low_bar'></div>
            <div className='med_bar'></div>
            <div className='high_bar' ></div>
        </div>
        <style>
            
                {after1_style};
                </style>
                <style>
                {after2_style};
                </style>
                <style>
                {after3_style};
            
        </style>
        </div>
        </div>
       </div>
       <div className='recent_tasks'>
        <div className='start'>
          <h1>recent tasks</h1>
          <NavLink to='/task'>
            <span>see all</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">status</th>
                <th scope="col">priority</th>
                <th scope="col">created on</th>
              </tr>
            </thead>
            <tbody>
            {
              
              // numoftasks();
              tasks.length>0?
            tasks.map((x)=>
            {
              return(
              <tr>
                <td ><span>{x.title}</span></td>
                <td className={x.status}><span>{x.status}</span></td>
                <td className={x.priority}><span>{x.priority}</span></td>
                <td><span>{x.createdAt}</span></td>
              </tr>)
            }):
            <h1>No tasks !</h1>
            }
              
             
            </tbody>
          </table>
        </div>
       </div>
       
    )
}
export default Dashboard;