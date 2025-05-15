import React, { useState } from 'react';
import './CreateTask.css'; // Link the CSS
import { useRecoilState } from 'recoil';
import CUser from '../UserRecoil';
import User_Token from './Tokaerecoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [Cuser, setCuser] = useRecoilState(CUser);
  const [token] = useRecoilState(User_Token);
  const navigate = useNavigate();
  const temp = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[temp.getDay()];
  const date = temp.getFullYear() + '-' + String(temp.getMonth() + 1).padStart(2, '0') + '-' + String(temp.getDate()).padStart(2, '0');

  // console.log("Current user:", Cuser);
  // console.log("Token:", token);

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

      const taskdata = {
        title: taskTitle.trim(),
        description: description.trim(),
        startDate: date,
        deadline: dueDate || null,
        assignee: assignedUsers.trim() || null,  // Make it optional
        status: statusMap[T_status] || 'pending',
        priority: priority,
        totalTasks: totalTasks
        // createdBy: Cuser._id
      };

      console.log('Sending task data:', taskdata);

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
      
      console.log('Task created:', response.data);
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

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [T_status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [assignedUsers, setAssignedUsers] = useState('');
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
    React.createElement('label', { className: 'label' }, 'Total Tasks'),
    React.createElement('input', {
      type: 'number',
      className: 'input',
      value: totalTasks,
      onChange: (e) => setTotalTasks(e.target.value),
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
    
    React.createElement('button', { 
      className: 'create-task-btn',
      onClick: Addtask_DB 
    }, 'CREATE TASK')
  );
}

export default CreateTask;
