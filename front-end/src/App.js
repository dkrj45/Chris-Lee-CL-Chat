import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.scss'
import HomePage from './pages/HomePage/HomePage';

function App() {

  //server-side URL
  const URL = process.env.URL || "http://localhost:8080";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/LoginPage' />} />
          <Route path='/LoginPage' element={<LoginPage URL={URL}/>} />
          <Route path='/SignupPage' element={<SignupPage URL={URL}/>} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
