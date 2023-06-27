import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IdProvider } from "./contexts/IdContext";
import { UserIdProvider } from "./contexts/UserIdContext";
import MainPage from "./page/MainPage/MainPage";
import UserSelf from "./page/UserSelfPage/UserSelf";
import UserOtherPage from "./page/UserOtherPage/UserOtherPage";
import LoginPage from "./page/LoginPage/LoginPage";
import RegistPage from "./page/RegistPage/RegistPage";
import LoginAdmin from "./page/LoginAdmin/LoginAdmin";
import SettingPage from "./page/SettingPage/SettingPage";
import UsersDashboard from "./page/UsersDashboard/UsersDashboard";
import AdminMain from "./page/AdminMain/AdminMain";
import HomePage from "./page/HomePage/HomePage";
import ReplyList from "./page/ReplyList/ReplyList";
import FollowAndFollower from "./page/FollowAndFollower/FollowAndFollower";
import "./base.scss";
import "./reset.scss";
import { TweetsProvider } from "./contexts/TweetsContext";

const basename = process.env.PUBLIC_URL;
/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router basename={basename}>
      <div className="app">
        <AuthProvider>
          <UserIdProvider>
            <IdProvider>
              <TweetsProvider>
                <Routes>
                  <Route path="*" element={<HomePage />} />
                  <Route path="/mainPage" element={<MainPage />} />
                  <Route path="/user/self" element={<UserSelf />} />
                  <Route path="/user/:username" element={<UserOtherPage />} />
                  <Route path="/follow" element={<FollowAndFollower />} />
                  <Route path="/follower" element={<FollowAndFollower />} />
                  <Route path="/login_admin" element={<LoginAdmin />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<RegistPage />} />
                  <Route path="/settings" element={<SettingPage />} />
                  <Route path="/admin_main" element={<AdminMain />} />
                  <Route path="/admin_users" element={<UsersDashboard />} />
                  <Route path="/reply_list" element={<ReplyList />} />
                </Routes>
              </TweetsProvider>
            </IdProvider>
          </UserIdProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
