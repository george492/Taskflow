import { NavLink, useParams } from 'react-router-dom';
import './Managetask.css'
import AllTasks from './AllTasks';
import { useEffect, useState } from 'react';
import TaskData from '../Taskdata';
import All__Tasks from './TasksRecoil';
import { useRecoilState } from 'recoil';
function Managetask()
{
  const[tasks,setTasks]=useRecoilState(All__Tasks);
    const param=useParams();
    const [Tasks,settasks]=useState([]);
    const[pending,setpending]=useState(0);
    const[progress,setprogress]=useState(0);
    const[completed,setcompleted]=useState(0);
    const[all,setall]=useState(0);
    useEffect(()=>
    {
        
           setall(tasks.length);
              const  Taskat=tasks.filter(p=>p.status==='Completed');
              setcompleted(Taskat.length);
              const  Taskat1=tasks.filter(p=>p.status==='Pending');
              setpending(Taskat1.length);
              const  Taskat2=tasks.filter(p=>p.status==='In Progress');
              setprogress(Taskat2.length);
    },[ ])
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
        < NavLink to='/task/Pending'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')}  href="#"><p>pending</p>
        <span>{pending}</span></NavLink>
        <NavLink to='/task/In Progress'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')} ><p>in progress</p>
        <span>{progress}</span></NavLink>
        <NavLink to='/task/Completed'  className={({ isActive }) => (isActive ? 'Active nav-link' : 'nav-link')} ><p>in progress</p>
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