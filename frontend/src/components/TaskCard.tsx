import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TaskCardProps {
  title: string;
  description: string;
  deadline: string;
  priority: number;
  taskid: string;
  changeRefresh: () => void;
}

const Card = styled.div<{ priority: number }>`
  background: ${(props) => (props.priority > 5 ? '#ffe6e6' : '#e6f7ff')};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.5em;
  color: #333;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
`;

const Deadline = styled.p`
  font-size: 0.9em;
  color: #999;
`;

const Priority = styled.p<{ priority: number }>`
  font-size: 0.9em;
  font-weight: bold;
  color: ${(props) => (props.priority > 5 ? '#ff6347' : '#4682b4')};
`;

const TaskCard: React.FC<TaskCardProps> = ({ title, description, deadline, priority, taskid, changeRefresh }) => {
  const navigate = useNavigate();

  const handleCardClick = (taskid: string) => {
    navigate(`/${taskid}`);
  };

  return (
    <Card priority={priority} onClick={() => handleCardClick(taskid)}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Deadline>Deadline: {deadline}</Deadline>
      <Priority priority={priority}>Priority: {priority}</Priority>
    </Card>
  );
};

export default TaskCard;
