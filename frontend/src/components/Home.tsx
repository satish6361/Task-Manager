import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-top: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? '#ff6347' : '#4682b4')};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ff4500' : '#1e90ff')};
    transform: translateY(-2px);
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f0f8ff;
  min-height: 100vh;
`;

const LogoutButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  priority: number;
  taskid: string;
}

const Home: React.FC = () => {
  const [AllTask, setAllTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [sortedInc, setsortedInc] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in

  const fetchData = async () => {
    try {
      const user = localStorage.getItem('user');

      if (!user) {
        throw new Error('User not found in localStorage');
      }

      const userObject = JSON.parse(user);
      const email = userObject.email;

      if (!email) {
        throw new Error('Email not found in user object');
      }

      const payload = {
        userEmail: email,
      };

      const response = await axios.post('https://satish-task-manager.onrender.com/getAllTasks', payload);

      setAllTasks(response?.data?.Tasks || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleAdd = () => {
    navigate('/addTask');
  };

  const handleSort = () => {
    const sortedTasks = [...AllTask].sort((a, b) => {
      const priorityA = a.priority;
      const priorityB = b.priority;
      if (sortedInc) {
        return priorityA - priorityB;
      } else {
        return priorityB - priorityA;
      }
    });

    setAllTasks(sortedTasks);
    setsortedInc(!sortedInc); // Toggle the sorting direction
  };

  const changeRefresh = () => {
    setRefresh(!refresh);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <HomeContainer>
      <Header>Task Manager</Header>
      {isLoggedIn ? <LogoutButton onClick={handleLogout}>Logout</LogoutButton> : <Button onClick={() => navigate('/login')}>Login</Button>}
      <div>
        <Button primary onClick={handleAdd}>Add Task</Button>
        <Button onClick={handleSort}>Sort by Priority {sortedInc ? '▲' : '▼'}</Button>
      </div>
      <TaskContainer>
        {AllTask.map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            priority={task.priority}
            taskid={task.taskid}
            changeRefresh={changeRefresh}
          />
        ))}
      </TaskContainer>
    </HomeContainer>
  );
};

export default Home;
