import './Teammember.css'
function Teammember(prop)
{
    
    return(
        <div className="member">
            <div className="p_info">
                <div className="image">
                    <img src={prop.m.profileImage||"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}/>
                </div>
                <div className="p_text">
                    <p>{prop.m.name}</p>
                    <p>{prop.m.email}</p>
                </div>
            </div>
            <div className="p_tasks">
            <div className="pending">
                    <p>{prop.m.pending}</p>
                    <p>pending</p>
                </div>
                <div className="Progress">
                    <p>{prop.m.inprogress}</p>
                    <p>in progress</p>
                </div>
                <div className="pending">
                    <p>{prop.m.complete}</p>
                    <p>Completed</p>
                </div>
              
               
            </div>
        </div>
    )
}
export default Teammember;