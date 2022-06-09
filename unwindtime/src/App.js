import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Reset from './Views/Reset';
import Dashboard from './Views/Dashboard';
import Unwinds from './Views/Unwinds';

import Header from './Components/Header';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/unwinds" element={<Unwinds />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
