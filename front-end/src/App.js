import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoutes from "./components/PrivateRoutes";
import UserContext from "./components/AccountContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext>
          <Routes>
            <Route path="/" element={<Navigate to="/LoginPage" />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/HomePage" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </UserContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
