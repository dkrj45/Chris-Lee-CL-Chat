import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import ConversationPage from './pages/ConversationPage/ConversationPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/LoginPage' />}></Route>
          <Route path='/LoginPage' element={<LoginPage />}></Route>
          <Route path='/SignupPage' element={<SignupPage />}></Route>
          <Route path='/RoomsPage' element={<RoomsPage />}></Route>
          <Route path='/ConversationPage' element={<ConversationPage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
