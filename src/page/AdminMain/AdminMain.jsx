import Navbar from "../../component/navbar/Navbar";
import PageTag from "../../component/pageTag/PageTag";
import AdminTweetList from "../../component/adminTweetList/AdminTweetList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getTweetsByAdmin } from "../../api/admin";
import "./AdminMain.scss";

const AdminMain = () => {
  const [allTweets, setAllTweets] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getAllTweets = async () => {
      const list = await getTweetsByAdmin();
      setAllTweets(list);
    };
    getAllTweets();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login_admin");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="adminMainContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="subContainer">
        <PageTag title="Tweet list" />
        <div className="listContainer">
          <AdminTweetList tweets={allTweets} setList={setAllTweets} />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
