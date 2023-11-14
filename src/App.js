import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Dashboard from './components/Dashboard';
function App() {

  const info = localStorage.getItem('user');

  const [user,setUser] = useState(JSON.parse(info));


  return (
    <>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/login' element={<Login user={user} setUser={setUser}></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/incomes' element={<Income></Income>}></Route>
        <Route path='/expenses' element={<Expenses></Expenses>}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
