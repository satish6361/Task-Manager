import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #e0f2f1; /* Bluish tone background */
  min-height: 100vh;
`;

const FormWrapper = styled.form`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align labels to the left */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Input = styled.input`
  width: 93%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(145deg, #00acc1, #00838f); /* Bluish tone gradient */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #0097a7, #006064); /* Darker shade on hover */
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  align-self: flex-start; /* Align labels to the left */
`;

const EditTask: React.FC = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    taskid: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const fetchTask = async (taskid) => {
    try {
      const user = localStorage.getItem('user');

      if (!user) {
        throw new Error('User not found in localStorage');
      }

      const userObject = JSON.parse(user);
      const email = userObject.email;

      const payload = {
        userEmail: email,
        taskid: taskid,
      };

      const response = await axios.post('https://satish-task-manager.onrender.com/getTaskById', payload);

      let taskData = response.data.task;

      setFormData({
        title: taskData.title,
        description: taskData.description,
        deadline: formatDate(taskData.deadline),
        priority: taskData.priority,
        taskid: taskData.taskid,
      });
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    if (taskid) {
      fetchTask(taskid);
    }
  }, [taskid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem('user');

      if (!user) {
        throw new Error('User not found in localStorage');
      }

      const userObject = JSON.parse(user);
      const email = userObject.email;

      const payload = {
        title: formData.title,
        description: formData.description,
        duedate: formData.deadline,
        priority: formData.priority,
        userEmail: email,
        taskid: taskid,
      };

      const response = await axios.post('https://satish-task-manager.onrender.com/updateTask', payload);

      if (response.status === 200) {
        setSuccessMessage('Task Updated Successfully');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Wait for 2 seconds before navigating to home
      }
    } catch (error) {
      console.log('Error Updating Task ', error);
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = `${dateObject.getMonth() + 1}`.padStart(2, '0');
    const day = `${dateObject.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Update Task</Title>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        <Label htmlFor="priority">Priority</Label>
        <Input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
          required
        />
        <Label htmlFor="taskid">Task ID</Label>
        <Input
          type="text"
          name="taskid"
          placeholder="Task ID"
          value={formData.taskid}
          onChange={handleChange}
          disabled // Make taskid field disabled
        />
        <Button type="submit">Update Task</Button>
      </FormWrapper>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </Container>
  );
};

export default EditTask;
