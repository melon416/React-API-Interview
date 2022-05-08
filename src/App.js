import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const dataLists = [
  "name",
  "email",
  "birthday",
  "address",
  "number",
  "password"
];

export default function App() {
  const [personalData, setPersonalData] = useState(undefined);
  const [currentSelInfo, setCurrentSelInfo] = useState("name");

  const handleMouseClick = (label) => {
    setCurrentSelInfo(label);
  };

  const renderUserInfo = React.useMemo(() => {
    if (!personalData) return null;
    const birthDate = new Date(personalData.dob.date);
    const birthString =
      birthDate.getMonth() +
      1 +
      "/" +
      birthDate.getDate() +
      "/" +
      birthDate.getFullYear();
    switch (currentSelInfo) {
      case "name":
        return (
          <>
            <p>My name is:</p>
            <h2>
              {personalData.name.title} {personalData.name.first}{" "}
              {personalData.name.last}
            </h2>
          </>
        );
      case "email":
        return (
          <>
            <p>My email address is:</p>
            <h2>{personalData.email}</h2>
          </>
        );
      case "birthday":
        return (
          <>
            <p>My birthday is:</p>
            <h2>{birthString}</h2>
          </>
        );
      case "address":
        return (
          <>
            <p>My address is:</p>
            <h2>{personalData.location.country}</h2>
          </>
        );
      case "number":
        return (
          <>
            <p>My number is:</p>
            <h2>{personalData.phone}</h2>
          </>
        );
      case "password":
        return (
          <>
            <p>My password is:</p>
            <h2>{personalData.login.password}</h2>
          </>
        );
      default:
        return null;
    }
  }, [currentSelInfo]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api")
      .then((res) => {
        setPersonalData(res.data.results[0]);
      })
      .catch((err) => {
        console.error("Failed to fetch user", err);
      });
  }, []);

  return (
    <div className="App">
      {personalData && (
        <div className="user-card">
          <img src={personalData.picture.medium} alt="user avatar" />
          {renderUserInfo}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {dataLists.map((item) => {
              return (
                <button onClick={() => handleMouseClick(item)}>{item}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
