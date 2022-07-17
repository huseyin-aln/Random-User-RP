import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
// import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const url = "https://randomuser.me/api/";
  // const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    phone: "",
    password: "",
    picture: "",
  });
  const [title, setTitle] = useState("");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [userList, setUserList] = useState([]);

  const getUser = async () => {
    try {
      await axios.get(url).then((res) => {
        console.log(res);

        const personImage = res.data.results[0].picture.medium;
        const personName =
          res.data.results[0].name.title +
          " " +
          res.data.results[0].name.first +
          " " +
          res.data.results[0].name.last;
        const personEmail = res.data.results[0].email;
        const personPhone = res.data.results[0].phone;
        const personLocation =
          res.data.results[0].location.street.number +
          " " +
          res.data.results[0].location.street.name;
        const personPassword = res.data.results[0].login.password;
        const personAge = res.data.results[0].dob.age;

        setUserInfo({
          picture: personImage,
          name: personName,
          email: personEmail,
          age: personAge,
          location: personLocation,
          phone: personPhone,
          password: personPassword,
        });

        setGender(res.data.results[0].gender);
      });

      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // setTitle("name");
    // setValues(userInfo.name);
  }, []);

  const handleChange = (e) => {
    if (e.target.alt === "user") {
      setTitle("name");
      setValues(userInfo.name);
    } else if (e.target.alt === "mail") {
      setTitle("email");
      setValues(userInfo.email);
    } else if (e.target.alt === "age") {
      setTitle("age");
      setValues(userInfo.age);
    } else if (e.target.alt === "map") {
      setTitle("location");
      setValues(userInfo.location);
    } else if (e.target.alt === "phone") {
      setTitle("phone");
      setValues(userInfo.phone);
    } else if (e.target.alt === "lock") {
      setTitle("password");
      setValues(userInfo.password);
    }
  };

  const handleClick = () => {
    getUser();
    setTitle("name");
    setValues(userInfo.name);
  };

  const handleAddUser = () => {
    setUserList([userInfo]);
  };

  if (!loading) {
    return <h1>Loading</h1>;
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>

      <div className="block">
        <div className="container">
          <img src={userInfo.picture} alt="random user" className="user-img" />
          <p className="user-title">My {title || "name"} is </p>
          <p className="user-value">{values || userInfo.name}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>

            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>

            <button className="icon" data-label="age">
              <img
                src={womanAgeSvg}
                alt="age"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>

            <button className="icon" data-label="street">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>

            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>

            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseOver={handleChange}
              />
            </button>
          </div>

          <div className="btn-group">
            <button className="btn" type="button" onClick={handleClick}>
              {loading ? "new user" : "loading"}
            </button>

            <button className="btn" type="button" onClick={handleAddUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user, index) => {
                return (
                  <tr className="body-tr" key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
