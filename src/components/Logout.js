import { useNavigate } from "react-router-dom";
import './Logout.css';
function Logout()
{
    const navigate = useNavigate();
    return(
        <div className="logout-container">
            <h1 className="logout-text">You sure want to logout</h1>
            <button className="logout-btn" onClick={()=>{
                navigate('/login');
            }}>Logout</button>
        </div>
    )
}
export default Logout;