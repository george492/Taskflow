import './Teammember.css'
function Teammember(prop)
{
    
    return(
        <div className="member">
            <div className="p_info">
                <div className="image">
                    <img src={prop.m.avatar}/>
                </div>
                <div className="p_text">
                    <p>{prop.m.name}</p>
                    <p>{prop.m.email}</p>
                </div>
            </div>
            <div className="p_tasks">
            <div className="pending">
                    <p>{prop.m.tasks.pending}</p>
                    <p>pending</p>
                </div>
                <div className="Progress">
                    <p>{prop.m.tasks.inProgress}</p>
                    <p>in progress</p>
                </div>
                <div className="pending">
                    <p>{prop.m.tasks.completed}</p>
                    <p>Completed</p>
                </div>
              
               
            </div>
        </div>
    )
}
export default Teammember;