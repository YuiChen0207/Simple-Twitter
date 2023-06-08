import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import './base.scss';
import './reset.scss';

/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="mainPage" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
        {/* 
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="RegistPage" element={<RegistPage />} />
          </Routes>
        </AuthProvider>*/}
      </div>
    </Router>
  );
}

export default App;
