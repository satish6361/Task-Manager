import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f2f1; /* Bluish tone background */
`;

const TaskWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(145deg, #00acc1, #00838f); /* Bluish tone gradient */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #0097a7, #006064); /* Darker shade on hover */
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 8px 20px;
  background: linear-gradient(145deg, #00acc1, #00838f); /* Bluish tone gradient */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #0097a7, #006064); /* Darker shade on hover */
  }

  &:first-child {
    margin-right: 10px;
  }
`;

const FullTask = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState<any>();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const fetchTask = async (taskid) => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        throw new Error("User not found in localStorage");
      }

      const userObject = JSON.parse(user);
      const email = userObject.email;

      const payload = {
        userEmail: email,
        taskid: taskid,
      };

      const response = await axios.post(
        "https://satish-task-manager.onrender.com/getTaskById",
        payload
      );

      setTaskData(response.data.task);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    if (taskid) {
      fetchTask(taskid);
    }
  }, [taskid]);

  const handleDelete = async () => {
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        throw new Error("User not found in localStorage");
      }

      const userObject = JSON.parse(user);
      const email = userObject.email;

      const payload = {
        userEmail: email,
        taskid: taskData.taskid,
      };

      const response = await axios.post(
        "https://satish-task-manager.onrender.com/removeTask",
        payload
      );

      if (response.status === 200) {
        alert("Task removed Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error Deleting Task ", error);
    }
  };

  const handleEdit = () => {
    navigate(`/update/${taskData.taskid}`);
  };

  return (
    <Container>
      <TaskWrapper>
        <TaskTitle>{taskData?.title}</TaskTitle>
        <p>Description: {taskData?.description}</p>
        <p>Deadline: {taskData?.deadline}</p>
        <p>Priority: {taskData?.priority}</p>
        <ButtonWrapper>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </ButtonWrapper>
      </TaskWrapper>
      {showConfirmationModal && (
        <ConfirmationModal>
          <ModalContent>
            <p>Are you sure you want to delete this task?</p>
            <div>
              <ModalButton onClick={confirmDelete}>Yes, Delete</ModalButton>
              <ModalButton onClick={() => setShowConfirmationModal(false)}>
                Cancel
              </ModalButton>
            </div>
          </ModalContent>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default FullTask;
