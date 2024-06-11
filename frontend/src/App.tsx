import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import AddTask from './components/AddTask'

import FullTask from './components/FullTask'

import EditTask from './components/EditTask'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/addTask" element={<AddTask />} />

        <Route path="/:taskid" element={<FullTask />} />

        <Route path="/update/:taskid" element={<EditTask />} />

      </Routes>
    </Router>
  );
};

export default App;
