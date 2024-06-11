const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.AddTask = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.duedate ||
    !req.body.priority ||
    !req.body.taskid ||
    !req.body.userEmail
  ) {
    return res.status(400).json({ message: "Enter All Required Fields" });
  }
  const { title, description, duedate, priority, taskid, userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(500).json({ message: "Error Creating Task(User)" });
    }

    const UserTasks = await Task.find({ userEmail });

    const existingTask = UserTasks.find((task) => task.taskid === taskid);

    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Task with this ID already exists" });
    }

    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Task with this Id already exists" });
    }

    const newTask = await Task.create({
      title,
      description,
      taskid,
      deadline: duedate,
      priority,
      userEmail,
    });

    return res
      .status(201)
      .json({ message: "Task created successfully", newTask });
  } catch (error) {
    console.error("Error Creating Task :", error);
    return res.status(500).json({ message: "Error Creating Task" });
  }
};

exports.GetAllTasks = async (req, res, next) => {
  if (!req.body.userEmail) {
    return res.status(400).json({ message: "Enter User Email" });
  }
  const { userEmail } = req.body;

  try {
    const Tasks = await Task.find({ userEmail });
    return res.status(200).json({ message: "All tasks - ", Tasks });
  } catch (error) {
    console.error("Error Creating Task :", error);
    return res.status(500).json({ message: "Error Creating Task" });
  }
};

exports.removeTask = async (req, res, next) => {
    const { userEmail, taskid } = req.body;


    if (!userEmail || !taskid) {
        return res.status(400).json({ message: "Enter User Email and Task ID" });
    }

    try {

        const task = await Task.findOne({ userEmail, taskid });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.deleteOne({ userEmail, taskid });

        return res.status(200).json({ message: "Task removed successfully" });
    } catch (error) {
        console.error("Error Removing Task:", error);
        return res.status(500).json({ message: "Error Removing Task" });
   
    }

}


exports.updateTask = async (req, res, next) => {
    const { userEmail, taskid, title, description, duedate, priority } = req.body;

    if (!userEmail || !taskid) {
        return res.status(400).json({ message: "Enter User Email and Task ID" });
    }

    try {
        const task = await Task.findOne({ userEmail, taskid });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (duedate) task.deadline = duedate;
        if (priority) task.priority = priority;

        await task.save();

        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error Updating Task:", error);
        return res.status(500).json({ message: "Error Updating Task" });
    }
};

exports.getTaskById = async (req, res, next) => {
    const { userEmail, taskid } = req.body;

    if (!userEmail || !taskid) {
        return res.status(400).json({ message: "Enter User Email and Task ID" });
    }

    try {
        const task = await Task.findOne({ userEmail, taskid });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task retrieved successfully", task });
    } catch (error) {
        console.error("Error Retrieving Task:", error);
        return res.status(500).json({ message: "Error Retrieving Task" });
    }
};

