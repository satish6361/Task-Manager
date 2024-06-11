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
  background-color: #f0f8ff; /* Light blue */
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
  width: calc(100% - 24px); /* Subtract padding */
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
  width: calc(100%); /* Subtract padding */
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

const AlertMessage = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  align-self: flex-start; /* Align labels to the left */
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
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('Please login to add a task');
        return;
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

      const response = await axios.post('https://satish-task-manager.onrender.com/addTask', payload);

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
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
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
        <Label htmlFor="duedate">Due Date</Label>
        <Input
          type="date"
          name="duedate"
          value={formData.duedate}
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
        <Button type="submit">Add Task</Button>
      </FormWrapper>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <AlertMessage>{errorMessage}</AlertMessage>}
    </Container>
  );
};

export default AddTask;
