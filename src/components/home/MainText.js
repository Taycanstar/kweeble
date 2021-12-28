import React, { useState } from "react";
import "../../styles/home.css";
import ResultCard from "./ResultCard";

const MainText = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  //   const getUser = async () => {
  //     const res = await axios.get("/auth", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setUser(res.data);
  //   };

  //   useEffect(() => {
  //     getUser();
  //   }, []);

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    fetch(`${process.env.REACT_APP_API_URL}/api`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data);
        } else {
          setResults([]);
        }
        console.log(data);
      });
  };

  const [college, setCollege] = useState([]);

  return (
    <>
      {user === null ? (
        <div className="value-prop">
          <div className="main-title">
            <h1>Experience the college directory </h1>
          </div>
          <div className="secondary-title">
            <h5>
              Connect with students filtering through majors, interests, and
              more...
            </h5>
          </div>
          <div className="main-btns">
            <a href="/register">
              <button className="signup-btn">Sign up for free</button>
            </a>
          </div>
          <a href="/login">
            <p className="login-cta">Already a member? Log in</p>
          </a>
        </div>
      ) : (
        <div className="main-body-dir">
          <h2 className="dir-title">Find students & friends</h2>
          <form className="input-wrapper">
            <input
              className="search-input"
              type="text"
              onChange={onChange}
              value={query}
              placeholder="Search by name, email, major, or interests..."
            />
          </form>
          <div className="colleges">
            <label className="college-label" htmlFor="college">
              College:
            </label>
            <select
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

          {results.length > 0 && (
            <ul className="results">
              {results
                .filter((person) => {
                  if (
                    college === "Eckerd College" ||
                    college === "Polk State College"
                  ) {
                    if (query === "") {
                      return null;
                    } else if (
                      person.name
                        .toLowerCase()
                        .includes(query.toLocaleLowerCase()) &&
                      person.college === college
                    ) {
                      return person;
                    } else if (
                      person.email
                        .toLowerCase()
                        .includes(
                          query.toLowerCase() && person.college === college
                        )
                    ) {
                      return person;
                    }

                    if (person.interests !== undefined) {
                      if (query === "") {
                        return null;
                      } else if (
                        person.interests
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase()) &&
                        person.college === college
                      ) {
                        return person;
                      }
                    }

                    if (person.major !== undefined) {
                      if (query === "") {
                        return null;
                      } else if (
                        person.major
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase()) &&
                        person.college === college
                      ) {
                        return person;
                      }
                    }

                    if (person.email !== undefined) {
                      if (query === "") {
                        return null;
                      } else if (
                        person.email
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase()) &&
                        person.college === college
                      ) {
                        return person;
                      }
                    }

                    if (person.phoneNumber !== undefined) {
                      if (query === "") {
                        return null;
                      } else if (
                        person.phoneNumber
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase()) &&
                        person.college === college
                      ) {
                        return person;
                      }
                    }
                  } else {
                    return null;
                  }
                })
                .map((person) => {
                  return (
                    <li key={person._id}>
                      <ResultCard person={person} />
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default MainText;
