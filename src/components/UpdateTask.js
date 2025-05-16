import React, { useEffect, useState } from 'react';
import './UpdateTask.css'; // External CSS
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import All__Tasks from './TasksRecoil';
import User_Token from './Tokaerecoil';
import axios from 'axios';
// import { Alert } from 'bootstrap';
import Alert from '@mui/material/Alert';
function UpdateTask() {
  const navigate=useNavigate();
  const param=useParams();
  const[tasks,settasks]=useRecoilState(All__Tasks);
  const[task,setTask]=useState(tasks.find(t=>t._id===param.id));
  const [token, setToken] = useRecoilState(User_Token);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = useState(false);
  const[error_one,setError_one]=useState(false);
  const[error_neg,setError_neg]=useState(false);
//  task.value={};
useEffect(()=>
{
  setTask(tasks.find(t=>t._id===localStorage.getItem('taskId')));
},[])
// useEffect(()=>
// {
//   setTask(tasks.find(t=>t._id===param.id));
// },[param.id])


  function handleAddTodo() {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  }

  function handleDeleteTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }
  const handleDelete=async()=>
    {
        try {
            const response = await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
              headers: {
                Authorization: `Bearer ${token}`, // if using JWT auth
              },
            });
            alert(response.data.message);
                navigate('/task/all');
        
          } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete task');
          }
        };
        

  const handleUpdate = async () => {
    if(task.TaskDone>task.totalTasks)
    {
     setError_one(true);
     setTimeout(()=>
     {
      setError_one(false);
     },3000);
     return;
    }
    else if(task.TaskDone<0)
    {
      setError_neg(true);
      setTimeout(()=>
      {
        setError_neg(false);
      },3000);
      return;
    }
    console.log("true or false ",task.TaskDone===task.totalTasks);
    try {
      const updatedTask = {
        title:task.title,
        description:task.description,
        priority:task.priority,
        status:task.TaskDone===task.totalTasks?"Completed":task.status,
        TaskDone:task.TaskDone,
        totalTasks:task.totalTasks,
        Checklist:task.checklist,
        deadline:task.deadline,
        // add other fields if needed
      };

      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`, // replace with your actual token
        },
      });
      setOpen(true);
      navigate('/task/all');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    }
  }

   return React.createElement(
    'div',
    { className: 'update-task-container' },
    React.createElement('div',{className:open?"delete_page":"delete_page_hidden"},
      React.createElement(Alert,{severity:"warning"},"Are you sure you want to Delete the task?"),
      React.createElement('div',{className:"delete_btn_section"},
      React.createElement('button',{className:"delete_btn",onClick:handleDelete},"Delete"),
      React.createElement('button',{className:"cancel_btn",onClick:()=>setOpen(false)},"Cancel"))
    ) ,
    React.createElement('div', { className: 'header-section' },
      React.createElement('h2', null, 'Update Task'),
      React.createElement('button', { className: 'delete-btn', onClick:()=>setOpen(true) }, '🗑️ Delete')
    ),

    React.createElement('label', { className: 'label' }, 'Task Title'),
    React.createElement('input', {
      type: 'text',
      className: 'input',
      value: task.title,  
      onChange: (e) => setTask({...task,title:e.target.value}),
    })
    ,

    React.createElement('label', { className: 'label' }, 'Description'),
    React.createElement('textarea', {
      className: 'textarea',
      value: task.description,
      onChange: (e) => setTask({...task,description:e.target.value}),
    }),

    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col' },
        React.createElement('label', { className: 'label' }, 'Priority'),
        React.createElement(
          'select',
          {
            className: 'select',
            value: task.priority,
            onChange: (e) => setTask({...task,priority:e.target.value}),
          },
          React.createElement('option', { value: 'Low' }, 'Low'),
          React.createElement('option', { value: 'Medium' }, 'Medium'),
          React.createElement('option', { value: 'High' }, 'High')
        )
      ),
      React.createElement('div', { className: 'col' },
        React.createElement('label', { className: 'label' }, 'Status'),
        React.createElement(
          'select',
          {
            className: 'select',
            value: task.status,
            onChange: (e) => setTask({...task,status:e.target.value}),
          },
          React.createElement('option', { value: 'Pending' }, 'Pending'),
          React.createElement('option', { value: 'In Progress' }, 'In Progress'),
          React.createElement('option', { value: 'Completed' }, 'Completed')
        )
      ),
     
      React.createElement('div', { className: 'col' },
        
    //     React.createElement('label', { className: 'label' }, 'Assign To'),
    //     React.createElement('div', { className: 'assigned-users' },
    //       task.assignee.map((user, idx) =>
    //         React.createElement('span', { key: idx, className: 'user-avatar' }, user.name)
    //       )
    //     )
      )
    ),
    React.createElement('div',{className:error_one?"error_one":"error_one_hidden"},
      React.createElement(Alert,{severity:"error"},"Task Done cannot be greater than total tasks")
    ),
    React.createElement('div',{className:error_neg?"error_neg":"error_neg_hidden"},
      React.createElement(Alert,{severity:"error"},"Task Done cannot be negative")
    ),
    React.createElement('div',{className:'row'},
    React.createElement('div', { className: 'col' },
    React.createElement('label', { className: 'label' }, 'Done Tasks'),
    React.createElement('input', {
      type: 'number',
      className: 'input',
      value: task.TaskDone,
      onChange: (e) => setTask({...task,TaskDone:e.target.value}),
    })),
    React.createElement('div', { className: 'col' },
    React.createElement('label', { className: 'label' }, 'Total Tasks'),
    React.createElement('input', {
      type: 'number',
      className: 'input',
      value: task.totalTasks,
      readOnly:true,
      onChange: (e) => setTask({...task,totalTasks:e.target.value}),
    }))),
    React.createElement('div',{className:'row'}),
    React.createElement('div', { className: 'col' },
      React.createElement('label', { className: 'label' }, 'Due Date'),
      React.createElement('input', {
        type: 'date',
        className: 'input',
        value: task.deadline.split('T')[0],
        onChange: (e) => setTask({...task,deadline:e.target.value}),
      })
    ),
    React.createElement('div',{className:'row'},
      React.createElement('label', { className: 'label' }, 'TODO Checklist'),
    React.createElement('ul', { className: 'todo-list' },
      task.Checklist.map((todoItem, index) =>
        React.createElement('li', { key: index, className: 'todo-item' },
          React.createElement('span', null, `${String(index + 1).padStart(2, '0')} ${todoItem}`),
        )
      )
    )),
    // React.createElement('label', { className: 'label' }, 'TODO Checklist'),
    // React.createElement('ul', { className: 'todo-list' },
    //   task.Checklist.map((todoItem, index) =>
    //     React.createElement('li', { key: index, className: 'todo-item' },
    //       React.createElement('span', null, `${String(index + 1).padStart(2, '0')} ${todoItem}`),
    //       React.createElement('button', { className: 'delete-small-btn', onClick: () => handleDeleteTodo(index) }, '🗑️')
    //     )
    //   )
    // ),
    // React.createElement('div', { className: 'todo-section' },
    //   React.createElement('input', {
    //     type: 'text',
    //     className: 'input',
    //     placeholder: 'Enter Task',
    //     value: newTodo,
    //     onChange: (e) => setNewTodo(e.target.value),
    //   }),
    //   React.createElement('button', { className: 'add-btn', onClick: handleAddTodo }, '+ Add')
    // ),

    // React.createElement('label', { className: 'label' }, 'Add Attachments'),
    // React.createElement('ul', { className: 'attachment-list' },
    //   attachments.map((link, index) =>
    //     React.createElement('li', { key: index, className: 'attachment-item' },
    //       React.createElement('span', null, link),
    //       React.createElement('button', { className: 'delete-small-btn', onClick: () => handleDeleteAttachment(index) }, '🗑️')
    //     )
    //   )
    // ),
    // React.createElement('div', { className: 'todo-section' },
    //   React.createElement('input', {
    //     type: 'text',
    //     className: 'input',
    //     placeholder: 'Add File Link',
    //     value: newAttachment,
    //     onChange: (e) => setNewAttachment(e.target.value),
    //   }),
    //   React.createElement('button', { className: 'add-btn', onClick: handleAddAttachment }, '+ Add')
    // ),

    React.createElement('button', { className: 'update-task-btn', onClick: handleUpdate }, 'UPDATE TASK')
   );
}

export default UpdateTask;
