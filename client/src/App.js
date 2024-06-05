import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useGlobalContext } from "./Utilities/Context";
import Landing from "./Pages/Landing";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Alljobs from "./Pages/Alljobs";
import Addjob from "./Pages/Addjob";
import Profile from "./Pages/Profile";
import Alert from './Components/Alert/Alert'
import EditJob from "./Pages/EditJob";
function App() {
  return (
    <main>
      <Alert />
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/alljobs' element={<Alljobs />} />
          <Route path='/addjob' element={<Addjob />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/alljobs/:_id' element={<EditJob />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
