import React, { useState, useRef } from 'react';
import './container.css';

const Container = () => {
  const [isClicked, setClicked] = useState(false);
  const [passwordClicked, setPassword] = useState(false);
  const [passwordClickedSup, setPasswordSup] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };
  const handlePassword = () => {
    setPassword(!passwordClicked);
  };
  const handlePasswordSup = () => {
    setPasswordSup(!passwordClickedSup);
  };

  const newUserRef = useRef();
  const newEmailRef = useRef();
  const newPassRef = useRef();
  const loginEmailRef = useRef();
  const loginPassRef = useRef();
  const [gender, setGender] = useState('');
  const [formSubmitted, setSubmit] = useState(false);
  const [login, setLogin] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [logOutClicked, setLogout] = useState(false);
  const [deleteUser, setAcc] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userAlert, setUserAlert] = useState(false);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const newUser = (e) => {
    e.preventDefault();

    const userData = {
      User: newUserRef.current.value,
      Email: newEmailRef.current.value,
      Pass: newPassRef.current.value,
      Gender: gender,
    };

    if (userData.User && userData.Email && userData.Pass && userData.Gender) {
      const existingData = JSON.parse(localStorage.getItem('userData')) || [];

      const userExists = existingData.some((item) => item.Email === userData.Email);

      if (userExists) {
        alert('Email Already Exists !!');
      } else {
        setSubmit(true);
        existingData.push(userData);
        localStorage.setItem('userData', JSON.stringify(existingData));
      }
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setLogin(false);
    setLogout(true);
    setUserAlert(true);

    const userData = {
      Email: loginEmailRef.current.value,
      Pass: loginPassRef.current.value,
    };

    const existingData = JSON.parse(localStorage.getItem('userData'));
    const userExists = existingData.some(
      (item) => item.Email === userData.Email && item.Pass === userData.Pass
    );
    const wrongPass = existingData.some(
      (item) => item.Email === userData.Email && item.Pass !== userData.Pass
    );

    if (userExists) {
      const user = existingData.find(
        (item) => item.Email === userData.Email && item.Pass === userData.Pass
      );
      setLoggedInUser(user);
      setLogout(false);
      setUserAlert(false);
      setLogin(true);
    } else if (wrongPass) {
      setInputError(true);
    } else {
      alert('User Not Exists !!');
    }
  };

  if (deleteUser) {
    const existingData = JSON.parse(localStorage.getItem('userData')) || [];
    const updatedData = existingData.filter(
      (user) => user.Email !== loginEmailRef.current.value
    );

    localStorage.setItem('userData', JSON.stringify(updatedData));
    alert('User account deleted.');
    setLogout(true);
    setLogin(false);
    setAcc(false);
  }

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className={`contBtn ${!login || logOutClicked ? 'displayB' : 'displayN'}`}>
            <button id="logIn" className={`${!isClicked ? 'bgChange' : ''}`} onClick={isClicked ? handleClick : undefined}>Log In</button>
            <button id="signUp" className={`${isClicked ? 'bgChange' : ''}`} onClick={!isClicked ? handleClick : undefined}>Sign Up</button>
          </div>
          <div className={`contForm ${!login || logOutClicked ? 'displayF' : 'displayN'}`}>
            <div className={`logIn ${isClicked ? 'displayN' : ''}`}>
              <form>
                <div className="loginDiv">
                  <input type="text" name="email" placeholder="Your Email" ref={loginEmailRef} />
                  <span><i className="fa-solid fa-envelope"></i></span>
                </div>
                <div className="loginDiv">
                  <input type={`${passwordClicked ? 'text' : 'password'}`} name="password" placeholder="Password" ref={loginPassRef} className={`${inputError ? 'inputError' : ''}`} />
                  <span onClick={handlePassword}><i className={`${passwordClicked ? 'fa-solid fa-unlock' : 'fa-solid fa-lock'}`}></i></span>
                </div>
                <button type="submit" onClick={loginUser}>Submit</button>
              </form>
            </div>
            <div className={`signUp ${isClicked ? 'clicked' : ''}`}>
              <form>
                <div className={`${formSubmitted ? 'supSubmitted' : 'displayN'}`}>
                  <i className="fa-regular fa-circle-xmark" onClick={() => { setSubmit(false); }}></i>
                  <h2>Form Submitted Successfully !!</h2>
                </div>
                <div className="signUpDiv">
                  <input type="text" name="name" placeholder="Your Name" ref={newUserRef} />
                  <span><i className="fa-solid fa-user"></i></span>
                </div>
                <div className="signUpDiv">
                  <input type="text" name="email" placeholder="Email" ref={newEmailRef} />
                  <span><i className="fa-solid fa-envelope"></i></span>
                </div>
                <div className="signUpDiv">
                  <input type={`${passwordClickedSup ? 'text' : 'password'}`} name="password" placeholder="Password" ref={newPassRef} />
                  <span onClick={handlePasswordSup}><i className={`${passwordClickedSup ? 'fa-solid fa-unlock' : 'fa-solid fa-lock'}`}></i></span>
                </div>
                <div className="signUpGender">
                  <label><input type="radio" name="gender" value="male" onChange={handleGenderChange} />Male</label>
                  <label><input type="radio" name="gender" value="female" onChange={handleGenderChange} />Female</label>
                </div>
                <button type="submit" onClick={newUser}>Submit</button>
              </form>
            </div>
          </div>
          <div className={`userPage ${!login || logOutClicked ? 'displayN' : 'displayF'}`}>
            {loggedInUser && (
              <>
                <div className="userTop">
                  <img src={`${loggedInUser.Gender === 'male' ? 'https://i.graphicmama.com/uploads/2019/3/5c822b0ee4340-stylish-man-cartoon-vector-character.png' : 'https://i.pinimg.com/736x/2a/23/f9/2a23f9717ef16b713c1a9d7b4452f1fa.jpg'}`}/>
                  <h4>{loggedInUser.User}</h4>
                </div>
                <div className="userMiddle">
                  <h2>Welcome {loggedInUser.User} 😄, <br /> Nice👌To Meet You! <br /> <span>Enjoy Your Day!! 😁</span></h2>
                </div>
              </>
            )}
            <div className="userBottom">
              <button onClick={() => { setLogout(true)}}>Log Out</button>
              <button onClick={() => { setUserAlert(true) }}><i className="fa-solid fa-trash"></i> Account</button>
            </div>
            <div className={`userAlert ${!userAlert ? "displayN" : "displayF"}`}>
              <i className="fa-regular fa-circle-xmark" onClick={()=>{ setUserAlert(false) }}></i>
              <button onClick={()=>{setUserAlert(false)}}>Cancel</button>
              <button onClick={()=>{setAcc(true)}}>Delete </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
