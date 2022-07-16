import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
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

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [propert, setPropert] = useState("");
  const [userValue, setUserValue] = useState("");

  const getUser = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data.results[0]);
      setLoading(true);
      // console.log(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!loading) {
    return <h1>Loading</h1>;
  }

  const {
    name: { title, first, last },
    location: { street },
    email,
    dob: { age },
    picture: { medium },
    phone,
    login: { password },
  } = data;

  const handleChange = (e) => {
    if (e.target.classList.contains("iconImg")) {
      setPropert(e.target.alt);
      const value = e.target.alt;
      setUserValue(userValue[value]);
    }
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>

      <div className="block">
        <div className="container">
          <img src={medium} alt="random user" className="user-img" />
          <p className="user-title">My {propert || "name"} is</p>
          <p className="user-value">{userValue || userValue.name}</p>
          <div className="values-list" onMouseOver={handleChange}>
            <button className="icon" data-label="name">
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>

          <div className="btn-group">
            <button className="btn" type="button">
              new user
            </button>
            <button className="btn" type="button">
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
              <tr className="body-tr"></tr>
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
