import React,{useEffect, useState} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import "../../styles/botbar.css";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../actions/auth";

const Botbar = () => {
  const data = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();

  const [user, setUser] = useState(localStorage.getItem("token"));

    useEffect(() => {
    dispatch(fetchData());
    setInterval(() => {
      dispatch(fetchData());
    }, 1000 * 60); //a sec = 1000, a min = 1000 * 60
  }, []);
  return (
   <div>
   {user && (
        <div className="bot-bar">
      <div className="bot-sticky">
        <div className="container">
          <div className="bot-inner-content">
            <div className="bot-icons">
              <Link to="/">
                <HomeRoundedIcon sx={{fontSize:30}} />
              </Link>
            </div>
            <div className="bot-icons">
              <Link to="/grades">
                <ViewListRoundedIcon sx={{fontSize: 30}} />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
   )}
   </div>
 
  );
};

export default Botbar;
