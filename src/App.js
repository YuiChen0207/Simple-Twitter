import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";
import "./styles/base.scss"
import "./styles/reset.scss";

/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="mainPage" element={<MainPage />} />
        </Routes>
        {/* <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="RegistPage" element={<RegistPage />} />
          </Routes>
        </AuthProvider>
  </BrowserRouter> */}
      </div>
    </Router>
  );
}

export default App;
