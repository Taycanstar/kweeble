// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../images/header-logo.jpg";
import "../../styles/bootystrap.css";
import "../../styles/header.css";
import "../../../src/App.css";
import axios from "../../api/index";
import { createBrowserHistory } from "history";
import Avatar from "@material-ui/core/Avatar";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { fetchData } from "../../actions/auth";

const Header = (props) => {
  const data = useSelector((state) => state.auth.authData);

  const historyOP = createBrowserHistory({ forceRefresh: true });
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState(localStorage.getItem("token"));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
    setUser(null);
  };

  const refresh = () => {
    historyOP.push("/");
    history.push("/");
  };

  useEffect(() => {
    dispatch(fetchData());
    setInterval(() => {
      dispatch(fetchData());
    }, 1000 * 60); //a sec = 1000, a min = 1000 * 60
  }, []);

  return (
    <header className="sticky">
      <div className="container">
        <div className="inner-content">
          <div className="divisible-content">
            <div className="brand" onClick={refresh}>
              <img src={logo} alt="logo" />
            </div>
            {/* <div className="header-icons">
              <ul>
                <li className="contact-us">
                  <Link to="/contact-us">
                    <h3>Contact Us</h3>
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="user-content">
            <ul>
              {user ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {/* <div className="drop-data"> */}
                        <Avatar src={data?.photo || "default.png"} />
                        {/* <h4 className="log-nav">{data?.name}</h4> */}
                      {/* </div> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/settings">
                          <div className="drop-item">
                            <SettingsIcon />
                            <h4 className="drop-label">Settings</h4>
                          </div>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/profile">
                          <div className="drop-item">
                            <PersonIcon />
                            <h4 className="drop-label">View my profile</h4>
                          </div>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout} href="/">
                        <div className="drop-item">
                          <ExitToAppIcon />
                          <h4 className="drop-label">Logout</h4>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <li>
                    <a
                      className="profile"
                      href={`/profile/${user?._id}`}
                      title="Edit profile"
                    >
                      <Avatar src={user2?.imageUrl} />
                    </a>
                  </li>

                  <li onClick={logout}>
                    <Link to="/">
                      <h4 className="log-nav">Logout</h4>
                    </Link>
                  </li> */}
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <h4 className="login-button">Log In</h4>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
