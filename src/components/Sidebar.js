import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { useEffect, useState } from 'react';
import CUser from '../UserRecoil';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
function Sidebar()
{
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
        { console.log(active)}
         <div className='bars_icon'>
        <i onClick ={()=>
            {
                setbar(!bar);
            }
        }class="fa-solid fa-bars"></i>
        </div>
       
        <div className={bar?'appear side_bar ':'side_bar'}>
           
            <div className='img'>
                {/* <img src={Cuser.avatr}/> */}
                </div>
                {/* <p className='cate'> <span>{prop.user.cat}</span></p> */}
                <p className='name'>{Cuser.name}</p>
                <p className='email'>{Cuser.email}</p>
                <ul>
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