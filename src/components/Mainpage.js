import Sidebar from "./Sidebar";

const { useParams } = require("react-router-dom");
const { use } = require("../Backend/routes/authRoutes");
const { useEffect, useState } = require("react");

function Mainpage(prop)
{
    const param=useParams();
    const[page,setpage]=useState();
    useEffect(()=>
    {
        setpage(param.page);

    },param)
    return(
        <div className="home">
            <Sidebar/>
            
        </div>
    )
}