const express = require('express');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json())

const connectDatabase = require('./Db');
connectDatabase();


const {loginUser,registerUser} = require("./controllers/UserController");
const { AddTask, GetAllTasks, removeTask, updateTask, getTaskById } = require('./controllers/TaskController');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/login', loginUser)
app.post('/signup', registerUser)

app.post('/addTask',AddTask);
app.post('/getAllTasks',GetAllTasks);
app.post('/removeTask',removeTask);
app.post('/updateTask',updateTask);
app.post('/getTaskById',getTaskById)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});