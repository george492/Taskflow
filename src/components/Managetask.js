import { NavLink, useParams } from 'react-router-dom';
import './Managetask.css'

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import User_Token from './Tokaerecoil';
import CUser from '../UserRecoil';
import axios from 'axios';
import All__Tasks from './TasksRecoil';
import AllTasks from './AllTasks';
function Managetask()
{
  const[tasks,settasks]=useRecoilState(All__Tasks);
  const param=useParams();
  // const [Tasks,settasks]=useState([]);
  const[pending,setpending]=useState(0);
  const[progress,setprogress]=useState(0);
  const[completed,setcompleted]=useState(0);
  const[all,setall]=useState(0);
  const[token,setToken]=useRecoilState(User_Token);
  const[Cuser,setCuser]=useRecoilState(CUser);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        settasks(response.data);
      
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        settasks([]);
      }
    };

    if (Cuser && token) {
      fetchTasks();
    }
  }, []);

    useEffect(()=>
    {
        
           setall(tasks.length);
              const  Taskat=tasks.filter(p=>p.status==='Completed');
              setcompleted(Taskat.length);
              const  Taskat1=tasks.filter(p=>p.status==='pending');
              setpending(Taskat1.length);
              const  Taskat2=tasks.filter(p=>p.status==='in Progress');
              setprogress(Taskat2.length);
    },[ tasks])
    return(
        <div className="managetask">
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <h1 className="navbar-brand" href="#">My Tasks</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav task_info">
        <NavLink to='/task/all' className={({ isActive }) => (isActive ? 'Active nav-link active' : 'nav-link active')}  aria-current="page" href="#">  <p>All</p>
        <span>{all}</span></NavLink>
        < NavLink to='/task/pending'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')}  href="#"><p>pending</p>
        <span>{pending}</span></NavLink>
        <NavLink to='/task/in Progress'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')} ><p>in progress</p>
        <span>{progress}</span></NavLink>
        <NavLink to='/task/Completed'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')} ><p>Completed</p>
        <span>{completed}</span></NavLink>
       
      </div>
    </div>
  </div>
</nav>
            </header>
            <AllTasks/>
        </div>
    )
}
export default Managetask;