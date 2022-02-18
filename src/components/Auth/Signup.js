import React, { useState } from "react";
import "../../styles/auth.css";
import logo from "../../images/logo3.jpg";
import { Link } from "react-router-dom";
import axios from "../../api/index";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    error: null,
    
  });
  const invalidChars = "!@#$%^&*()+=[]\\';,/{}|\":<>?€£¥";
  const upd = invalidChars.split('')
 if(upd > 0){
   upd.push(" ")
 }

  const [specialCharError, setSpecialCharError] = useState(false)

  const { error, name, email, password, username, } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };



   const usernameChange = (e) => {
     if (e.currentTarget.value.includes(" ")) {
       e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
     }
     if (upd.some((char) => e.target.value.includes(char))) {
       setSpecialCharError(true);
       
       
     } else {
       setSpecialCharError(false);
       
     }
     setData({ ...data, [e.target.name]: e.target.value });
   };


  const onSubmit = async (e) => {
    e.preventDefault();

    if(specialCharError === false) {
            try {
              setData({ ...data, error: null });
              setCollege({ ...college });
              setGender({ ...gender });
              setBirthDay({ ...birthDay });
              setBirthMonth({ ...birthMonth });
              setBirthYear({ ...birthYear });

              await axios.post(
                "/auth/register",
                {
                  name,
                  email,
                  password,
                  college,
                  gender,
                  birthDay,
                  birthMonth,
                  birthYear,
                  username,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              props.history.push("/login");
            } catch (error) {
              setData({ ...data, error: error.response.data.error });
              console.log(error);
            }
            
    } 


  };

  const [college, setCollege] = useState([]);
  const [gender, setGender] = useState([]);
  const [birthDay, setBirthDay] = useState([]);
  const [birthMonth, setBirthMonth] = useState([]);
  const [birthYear, setBirthYear] = useState([]);


  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };

  return (
    <div className="signup-content">
      <div className="signup-card">
        <img className="form-logo" src={logo} alt="logo" />
        <form onSubmit={onSubmit} className="signup-form">
          <input
            className="signup-input"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={name}
          />

          <input
            className="signup-input"
            type="email"
            name="email"
            placeholder="Your school email"
            // pattern={
            //   college === "Eckerd College"
            //     ? "[a-z.]*[@]eckerd.edu"
            //     : "[a-z.]*[@]my.polk.edu"
            // }
            onChange={handleChange}
            value={email}
          />

          <input
            id="username"
            className={specialCharError ? "error-input" : "signup-input"}
            type="text"
            name="username"
            placeholder="Username"
            onChange={usernameChange}
            value={username}
          />
          {specialCharError && (
            <p
              style={{ paddingBottom: "8px" }}
              id="username-error"
              className="text-danger"
            >
              Your username can only contain letters, numbers,  ' . ' , ' - ' and '_'
            </p>
          )}
          <div className="pass-vision">
            <input
              className="signup-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              maxLength="38"
            />

            {!showPassword ? (
              <div className="vision">
                <div className="vision-in">
                  <IconButton onClick={handleShowPassword}>
                    <Visibility />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="vision">
                <IconButton onClick={handleShowPassword}>
                  <VisibilityOff />
                </IconButton>
              </div>
            )}
          </div>

          <label className="birthday-label" htmlFor="birthday">
            Date of birth
          </label>
          <div className="birthday-wrapper">
            <div className="birthday">
              <select
                className="signup-select"
                name="birthDay"
                id="birth_day"
                onChange={(e) => setBirthDay(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Day
                </option>
                <option value="null">null</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>

              <select
                className="signup-select"
                name="birthMonth"
                id="birth_month"
                onChange={(e) => setBirthMonth(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Month
                </option>
                <option value="null">null</option>
                <option value="January">Jan</option>
                <option value="February">Feb</option>
                <option value="March">Mar</option>
                <option value="April">Apr</option>
                <option value="May">May</option>
                <option value="June">Jun</option>
                <option value="July">Jul</option>
                <option value="August">Aug</option>
                <option value="September">Sep</option>
                <option value="October">Oct</option>
                <option value="November">Nov</option>
                <option value="December">Dec</option>
              </select>

              <select
                className="signup-select"
                name="birthYear"
                id="birth_year"
                onChange={(e) => setBirthYear(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Year
                </option>
                <option value="null">null</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
                <option value="1949">1949</option>
                <option value="1948">1948</option>
                <option value="1947">1947</option>
                <option value="1946">1946</option>
                <option value="1945">1945</option>
                <option value="1944">1944</option>
                <option value="1943">1943</option>
                <option value="1942">1942</option>
                <option value="1941">1941</option>
                <option value="1940">1940</option>
                <option value="1939">1939</option>
                <option value="1938">1938</option>
                <option value="1937">1937</option>
                <option value="1936">1936</option>
                <option value="1935">1935</option>
                <option value="1934">1934</option>
                <option value="1933">1933</option>
                <option value="1932">1932</option>
                <option value="1931">1931</option>
                <option value="1930">1930</option>
                <option value="1929">1929</option>
                <option value="1928">1928</option>
                <option value="1927">1927</option>
                <option value="1926">1926</option>
                <option value="1925">1925</option>
                <option value="1924">1924</option>
                <option value="1923">1923</option>
                <option value="1922">1922</option>
                <option value="1921">1921</option>
                <option value="1920">1920</option>
                <option value="1919">1919</option>
                <option value="1918">1918</option>
                <option value="1917">1917</option>
                <option value="1916">1916</option>
                <option value="1915">1915</option>
                <option value="1914">1914</option>
                <option value="1913">1913</option>
                <option value="1912">1912</option>
                <option value="1911">1911</option>
                <option value="1910">1910</option>
                <option value="1909">1909</option>
                <option value="1908">1908</option>
                <option value="1907">1907</option>
                <option value="1906">1906</option>
                <option value="1905">1905</option>
              </select>
            </div>
          </div>
          {/* <label className="gender-label" htmlFor="gender">
            Gender
          </label>
          <div className="gender">
            <select
              className="signup-select"
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              
            </select> */}
          {/* </div> */}
          <label className="college-label" htmlFor="college">
            College
          </label>
          <div className="colleges">
            <select
              className="signup-select"
              name="college"
              id="college"
              onChange={(e) => setCollege(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="Eckerd College">Eckerd College</option>
              {/* <option value="Polk State College">Polk State College</option> */}
            </select>
          </div>

          {error ? <p className="text-danger"> {error}</p> : null}

          {/* {signUpError === true ? (
            <p className="text-danger"> Invalid data</p>
          ) : null} */}

          <button className="signup-form-btn" type="submit">
            Sign up
          </button>

          <p className="policy-form">
            By creating an account, agreeing to our
            <Link to="/privacy-policy">
              {" "}
              Terms of Service and User Agreement
            </Link>
          </p>

          <p className="bottom-text">Already a member?</p>
          <Link to="/login">
            <p className="login-bottom">Log in</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
