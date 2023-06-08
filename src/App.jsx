import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";
import "./reset.scss"
import "./base.scss";

/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="mainPage" element={<MainPage />} />
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
