import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const FormWrapper = styled.form`
  background: linear-gradient(145deg, #f6c3d9, #fda1c9);
  border-radius: 8px;
  padding: 30px;
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(145deg, #ff4081, #ff7979);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #ff4081, #ff6b6b);
  }
`;

const EditTask = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    taskid: '',
  });

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

      const response = await axios.post('http://localhost:4000/getTaskById', payload);

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

      const response = await axios.post('http://localhost:4000/updateTask', payload);

      if (response.status === 200) {
        alert('Task Updated Successfully');
        navigate('/');
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
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
          required
        />
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
    </Container>
  );
};

export default EditTask;
