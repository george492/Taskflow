import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { useEffect, useState } from 'react';
import CUser from '../UserRecoil';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import User_Token from './Tokaerecoil';
import All__Tasks from './TasksRecoil';
import axios from 'axios';
function Sidebar()
{
    const [token,setToken]=useRecoilState(User_Token);
    const [user,setUser]=useRecoilState(CUser);
    const[taskat,setTaskat]=useRecoilState(All__Tasks);
     useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token)
        {
            setToken(token);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    },[])
    useEffect(() => {
        
          const fetchTasks = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setTaskat(response.data);
              
            } catch (error) {
              console.error('Failed to fetch tasks:', error);
              setTaskat([]);
            }
          };
      
          if (user && token) {
            fetchTasks();
          }
        }, [user, token]);
   
    const [active,setActive] = useState(false);
    const location = useLocation();
    useEffect(()=>{
      
        const pathname = location.pathname;
        if (pathname.includes('login')) {
            setActive(false);
          }
          else{
            setActive(true);
          }
    },[location])
    const [Cuser, setCUser] = useRecoilState(CUser);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    useEffect(()=>
    {
       
            setIsMobile(window.innerWidth < 769);
          
      
        

    },[window.innerWidth])
    const [bar,setbar]=useState(false);
    return(
       <>
     {active?
    
     <div className={bar?'color1 cont':'color2 cont'}>
       
         <div className='bars_icon'>
        <i onClick ={()=>
            {
                setbar(!bar);
            }
        }class="fa-solid fa-bars"></i>
        </div>
       
        <div className={bar?'appear side_bar ':'side_bar'}>
           
            <div className='img'>
                <img src={Cuser.profileImage||"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}/>
                </div>
                {/* <p className='cate'> <span>{prop.user.cat}</span></p> */}
                <p className='name'>{Cuser.name}</p>
                <p className='email'>{Cuser.email}</p>
                <ul>
                    <li>
                    <NavLink to='./profile' className={({ isActive }) => (isActive ? 'active' : '')}>
                    <i class="fa-solid fa-user"></i>
                        <span>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='./dashboard' className={({ isActive }) => (isActive ? 'active' : '')}>
                        <i class="fa-solid fa-border-all"></i>
                        <span>dash board</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./task'className={({ isActive }) => (isActive ? 'active ' : '')}>
                        <i class="fa-solid fa-clipboard-list"></i>
                        <span>Manage task</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='./createtask'className={({ isActive }) => (isActive ? 'active ' : '')}>
                        <i class="fa-solid fa-square-plus"></i>
                        <span>create task</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='./team' className={({ isActive }) => (isActive ? 'active ' : '')}>
                        <i class="fa-solid fa-user-group"></i>
                        <span>team Members</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='./logout' className={({ isActive }) => (isActive ? 'active ' : '')}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span>Log out</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            </div>
    :null}
    </>
    )
}
export default Sidebar;