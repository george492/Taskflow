import logo from './logo.svg';
import './App.css';
import Managetask from './components/Managetask';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Team from './components/Team';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import CreateTask from './components/CreateTask';
import React, { useEffect, useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Logout from './components/Logout';
import UpdateTask from './components/UpdateTask';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
// import CreateTask from './components/CreateTask';
// function AppLayout({  }) {
//   return (
//   //  const user = useRecoilValue(CUser);
//     <div className='home'>
//         <Sidebar />
//   <Routes>
//     {/* Remove the "./" prefix - paths are relative to parent route */}
//     <Route path="task/:status" element={<Managetask />} />
//     <Route path="task" element={<Navigate to="task/all" replace />} />
//     <Route path="team" element={<UserList />} />
//     <Route path="dashboard" element={<Dashboard />} />
    
//     {/* Add a catch-all redirect for unmatched paths */}
//     {/* <Route path="*" element={<Navigate to="dashboard" replace />} /> */}
//   </Routes>
//     </div>
   
//   );
// }
function App() {
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
  return (
   
    <RecoilRoot>
      <div className={active?'home':'home-logout'}>
        <Sidebar />
    <Routes>
    <Route path="task/:status" element={<Managetask />} />
    <Route path="edit/:id" element={<UpdateTask />} />
    <Route path="task" element={<Navigate to="/task/all" replace />} />
    <Route path="team" element={<Team />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/register" element={<Register/>} />
    <Route path="/profile" element={<Profile/>} />

      {/* <Route path="/login" element={<Homepage />} /> */}
      <Route path="/createtask" element={<CreateTask />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
    </div>
  </RecoilRoot>
  
  );
}

export default App;
