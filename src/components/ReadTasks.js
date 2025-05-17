import axios from 'axios';
import { useRecoilState } from 'recoil';
import CUser from '../UserRecoil';
import All__Tasks from './TasksRecoil';

const fetchTasks = async () => {
  try {
    const u=useRecoilState(CUser);
    const token = u.token;
    
    const response = await axios.get('/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // List of tasks for the current user
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
};

// Usage in a component:
const TasksPage = () => {
  const [tasks, setTasks] =useRecoilState(All__Tasks);

  useEffect(() => {
    const loadTasks = async () => {
      const userTasks = await fetchTasks();
      setTasks(userTasks);
    };
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};
export default TasksPage;