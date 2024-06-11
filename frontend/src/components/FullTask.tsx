import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

const FullTask = () => {
  const { taskid } = useParams();

  const navigate = useNavigate()

  const [taskData, setTaskData] = useState<any>();
  // const {taskid } = useParams();

  // console.log("taskid---",taskid);

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
        taskid: taskid, // Pass the taskid as an argument
      };

      const response = await axios.post(
        "http://localhost:4000/getTaskById",
        payload
      );

      console.log(response.data);

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

  const handleDelete = async (taskid:string)=>{
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
            userEmail:email,
            taskid:taskid
        }

        const response = await axios.post('http://localhost:4000/removeTask', payload)

        if(response.status == 200)
            {
                alert("Task removed Successfully");
                // changeRefresh();

                navigate('/')
                
            }

        
    } catch (error) {
      console.log("Error Deleting Task ",error)   
    }
}


    const handleEdit =  (taskid:string)=>{
        
        navigate(`/update/${taskid}`)
    }

  return <div>FullTask{taskid}
  
  
  <button onClick={()=>handleDelete(taskData.taskid)}>

    Delete
  </button>


  <button onClick={()=>handleEdit(taskData.taskid)}>

    Edit
  </button>
  
  </div>;
};

export default FullTask;
