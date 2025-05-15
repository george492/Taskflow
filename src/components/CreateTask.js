import React, { useState } from 'react';
import './CreateTask.css'; // Link the CSS
import { useRecoilState } from 'recoil';
import CUser from '../UserRecoil';
import User_Token from './Tokaerecoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [Cuser, setCuser] = useRecoilState(CUser);
  const [token,setttoken]=useRecoilState(User_Token);
  const navigate = useNavigate();
  const temp = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[temp.getDay()];
  const date = temp.getFullYear() + '-' + String(temp.getMonth() + 1).padStart(2, '0') + '-' + String(temp.getDate()).padStart(2, '0');



  const Addtask_DB = async () => {
    try {
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!taskTitle.trim()) {
        alert('Task title is required');
        return;
      }

      // Map frontend status to match backend expectations
      const statusMap = {
        'Pending': 'pending',
        'In Progress': 'in Progress',
        'Completed': 'Completed'
      };
      const assignedUsersArray = assignedUsers.split(',').map(user => user.trim());
      const taskdata = {
        title: taskTitle.trim(),
        description: description.trim(),
        deadline: dueDate || null,
        assignee: assignedUsersArray || null,  // Make it optional
        status: statusMap[T_status] || 'pending',
        priority: priority,
        startDate: date,
        totalTasks: todos.length,
        Checklist: todos,
      };


      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        taskdata,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Task created successfully!');
      navigate('/task/all');
    } catch (error) {
      console.error('Failed to create task:', error);
      console.error('Error details:', error.response?.data);
      if (error.response?.status === 401) {
        alert('Your session has expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to create task: ' + (error.response?.data?.message || 'Unknown error'));
      }
    }
  };
  const [todos, setTodos] = useState([]);
  // const [attachments, setAttachments] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newAttachment, setNewAttachment] = useState('');

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
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [T_status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [assignedUsers, setAssignedUsers] = useState('');
  const [assignedUsersArray, setAssignedUsersArray] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  return React.createElement(
    'div',
    { className: 'create-task-container' },
    React.createElement('h2', null, 'Create Task'),

    React.createElement('label', { className: 'label' }, 'Task Title'),
    React.createElement('input', {
      type: 'text',
      className: 'input',
      value: taskTitle,
      onChange: (e) => setTaskTitle(e.target.value),
    }),

    React.createElement('label', { className: 'label' }, 'Description'),
    React.createElement('textarea', {
      className: 'textarea',
      value: description,
      onChange: (e) => setDescription(e.target.value),
    }),

    React.createElement('label', { className: 'label' }, 'Priority'),
    React.createElement(
      'select',
      {
        className: 'select',
        value: priority,
        onChange: (e) => setPriority(e.target.value),
      },
      React.createElement('option', { value: 'Low' }, 'Low'),
      React.createElement('option', { value: 'Medium' }, 'Medium'),
      React.createElement('option', { value: 'High' }, 'High')
    ),
    React.createElement('label', { className: 'label' }, 'Status'),
    React.createElement(
      'select',
      {
        className: 'select',
        value: T_status,
        onChange: (e) => setStatus(e.target.value),
      },
      React.createElement('option', { value: 'Pending' }, 'Pending'),
      React.createElement('option', { value: 'In Progress' }, 'In Progress'),
      React.createElement('option', { value: 'Completed' }, 'Completed')
    ),

    React.createElement('label', { className: 'label' }, 'Due Date'),
    React.createElement('input', {
      type: 'date',
      className: 'input',
      value: dueDate,
      onChange: (e) => setDueDate(e.target.value),
    }),
   

    React.createElement('label', { className: 'label' }, 'Assign To'),
    React.createElement('div', { className: 'assign-section' },
      React.createElement('input', {
        className: 'input',
        type: 'text',
        placeholder: 'Separate between Names by ,',
        value: assignedUsers,
        onChange: (e) => setAssignedUsers(e.target.value)
      }),
      // React.createElement('button', { className: 'assign-btn' }, '+1')
    ),
    React.createElement('label', { className: 'label' }, 'TODO Checklist'),
    React.createElement('ul', { className: 'todo-list' },
      todos.map((todoItem, index) =>
        React.createElement('li', { key: index, className: 'todo-item' },
          React.createElement('span', null, `${String(index + 1).padStart(2, '0')} ${todoItem}`),
          React.createElement('button', { className: 'delete-small-btn', onClick: () => handleDeleteTodo(index) }, '🗑️')
        )
      )
    ),
    React.createElement('div', { className: 'todo-section' },
      React.createElement('input', {
        type: 'text',
        className: 'input',
        placeholder: 'Enter Task',
        value: newTodo,
        onChange: (e) => setNewTodo(e.target.value),
      }),
      React.createElement('button', { className: 'add-btn', onClick: handleAddTodo }, '+ Add')
    ),
    React.createElement('button', { 
      className: 'create-task-btn',
      onClick: Addtask_DB 
    }, 'CREATE TASK')
  );
}

export default CreateTask;
