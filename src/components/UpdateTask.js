import React, { useEffect, useState } from 'react';
import './UpdateTask.css'; // External CSS
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import All__Tasks from './TasksRecoil';
import User_Token from './Tokaerecoil';
import axios from 'axios';
function UpdateTask() {
  const navigate=useNavigate();
  const param=useParams();
  const[tasks,settasks]=useRecoilState(All__Tasks);
  const[task,setTask]=useState(tasks.find(t=>t._id===param.id));
  const [token, setToken] = useRecoilState(User_Token
  );
//  task.value={};
useEffect(()=>
{

  setTask(tasks.find(t=>t._id===param.id));
    console.log("attasks",task)
},[param.id])
  // const[task,setTask]=useState(tasks.find(t=>t._id===param.id));
  // const [task,setTask]=useState([]);
  // const [taskTitle, setTaskTitle] = useState('Create App UI');
  // const [description, setDescription] = useState('Develop a dynamic product catalog with filtering and sorting features. Ensure the catalog is mobile-responsive and offers seamless navigation. Focus on improving performance and minimizing page load times.');
  // const [priority, setPriority] = useState('Medium');
  // const [dueDate, setDueDate] = useState('2025-04-05');
  // const [assignedUsers, setAssignedUsers] = useState(['User1', 'User2']);
  // const [todos, setTodos] = useState(['Create Product Card', 'Develop Category Filter UI']);
  // const [attachments, setAttachments] = useState(['react.dev']);
  // const [newTodo, setNewTodo] = useState('');
  // const [newAttachment, setNewAttachment] = useState('');

  // function handleAddTodo() {
  //   if (newTodo.trim() !== '') {
  //     setTodos([...todos, newTodo]);
  //     setNewTodo('');
  //   }
  // }

  // function handleDeleteTodo(index) {
  //   const updatedTodos = [...todos];
  //   updatedTodos.splice(index, 1);
  //   setTodos(updatedTodos);
  // }

  // function handleAddAttachment() {
  //   if (newAttachment.trim() !== '') {
  //     setAttachments([...attachments, newAttachment]);
  //     setNewAttachment('');
  //   }
  // }

  // function handleDeleteAttachment(index) {
  //   const updatedAttachments = [...attachments];
  //   updatedAttachments.splice(index, 1);
  //   setAttachments(updatedAttachments);
  // }

  // function handleDeleteTask() {
  //   // You can add your delete logic here
  //   alert('Task Deleted');
  // }

  const handleUpdate = async () => {
    try {
      console.log("task",task);
      const updatedTask = {
        title:task.title,
        description:task.description,
        priority:task.priority,
        status:task.status,
        TaskDone:task.doneTasks,
        totalTasks:task.totalTasks,
        
        deadline:task.deadline,
        // add other fields if needed
      };

      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`, // replace with your actual token
        },
      });

      alert('Task updated successfully');
      navigate('/task/all'); // send updated task back to parent
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    }
  }

   return React.createElement(
    'div',
    { className: 'update-task-container' },

    React.createElement('div', { className: 'header-section' },
      React.createElement('h2', null, 'Update Task'),
      React.createElement('button', { className: 'delete-btn',  }, '🗑️ Delete')
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
    React.createElement('div',{className:'row'},
    React.createElement('div', { className: 'col' },
    React.createElement('label', { className: 'label' }, 'Total Tasks'),
    React.createElement('input', {
      type: 'number',
      className: 'input',
      value: task.totalTasks,
      onChange: (e) => setTask({...task,totalTasks:e.target.value}),
    })),
    React.createElement('div', { className: 'col' },
    React.createElement('label', { className: 'label' }, 'Total Tasks'),
    React.createElement('input', {
      type: 'number',
      className: 'input',
      value: task.doneTasks,
      onChange: (e) => setTask({...task,doneTasks:e.target.value}),
    }))),
    React.createElement('div',{className:'row'}),
    React.createElement('div', { className: 'col' },
      React.createElement('label', { className: 'label' }, 'Due Date'),
      React.createElement('input', {
        type: 'date',
        className: 'input',
        value: task.deadline,
        onChange: (e) => setTask({...task,deadline:e.target.value}),
      })
    ),

  //   // React.createElement('label', { className: 'label' }, 'TODO Checklist'),
  //   // React.createElement('ul', { className: 'todo-list' },
  //   //   todos.map((todoItem, index) =>
  //   //     React.createElement('li', { key: index, className: 'todo-item' },
  //   //       React.createElement('span', null, `${String(index + 1).padStart(2, '0')} ${todoItem}`),
  //   //       React.createElement('button', { className: 'delete-small-btn', onClick: () => handleDeleteTodo(index) }, '🗑️')
  //   //     )
  //   //   )
  //   // ),
  //   // React.createElement('div', { className: 'todo-section' },
  //   //   React.createElement('input', {
  //   //     type: 'text',
  //   //     className: 'input',
  //   //     placeholder: 'Enter Task',
  //   //     value: newTodo,
  //   //     onChange: (e) => setNewTodo(e.target.value),
  //   //   }),
  //   //   React.createElement('button', { className: 'add-btn', onClick: handleAddTodo }, '+ Add')
  //   // ),

  //   // React.createElement('label', { className: 'label' }, 'Add Attachments'),
  //   // React.createElement('ul', { className: 'attachment-list' },
  //   //   attachments.map((link, index) =>
  //   //     React.createElement('li', { key: index, className: 'attachment-item' },
  //   //       React.createElement('span', null, link),
  //   //       React.createElement('button', { className: 'delete-small-btn', onClick: () => handleDeleteAttachment(index) }, '🗑️')
  //   //     )
  //   //   )
  //   // ),
  //   // React.createElement('div', { className: 'todo-section' },
  //   //   React.createElement('input', {
  //   //     type: 'text',
  //   //     className: 'input',
  //   //     placeholder: 'Add File Link',
  //   //     value: newAttachment,
  //   //     onChange: (e) => setNewAttachment(e.target.value),
  //   //   }),
  //   //   React.createElement('button', { className: 'add-btn', onClick: handleAddAttachment }, '+ Add')
  //   // ),

    React.createElement('button', { className: 'update-task-btn', onClick: handleUpdate }, 'UPDATE TASK')
   );
}

export default UpdateTask;
