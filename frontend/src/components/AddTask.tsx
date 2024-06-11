import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f0f8ff;
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
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Input = styled.input`
  width: 100%;
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
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #0056b3;
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

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duedate: '',
    priority: '',
    taskid: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

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
        duedate: formData.duedate,
        priority: formData.priority,
        taskid: formData.taskid,
        userEmail: email,
      };

      const response = await axios.post('http://localhost:4000/addTask', payload);

      if (response.status === 201) {
        setSuccessMessage('Task Added Successfully');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Wait for 2 seconds before navigating to home
      }
    } catch (error) {
      console.log('Error Adding Task', error);
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Add Task</Title>
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
          name="taskid"
          placeholder="Task ID"
          value={formData.taskid}
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
          name="duedate"
          value={formData.duedate}
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
        <Button type="submit">Add Task</Button>
      </FormWrapper>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </Container>
  );
};

export default AddTask;
