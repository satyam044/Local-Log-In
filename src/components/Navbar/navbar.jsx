import React, { useEffect, useState } from 'react';
import './navbar.css'

const Navbar = () => {
  const [isToggled, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  useEffect(()=>{
    const root = document.documentElement;

    if (!isToggled) {
      root.style.setProperty('--primary-color', '#01b7c5');
      root.style.setProperty('--secondary-color', 'skyblue');
      root.style.setProperty('--text-color', '#000000');
    } else {
      root.style.setProperty('--primary-color', 'linear-gradient(to right, #051c28,#082e43)');
      root.style.setProperty('--secondary-color', 'linear-gradient(to right,#051c28,#01b7c5)');
      root.style.setProperty('--text-color', '#fff');
    }
  },[isToggled])

  return (
    <div>
      <nav>
        <div className="navLeft">LocalLogIn</div>
        <div className="navRight">
          <div className="navTheme">
            <input type="checkbox" id='darkmode-toggle' onClick={handleToggle} />
            <label htmlFor='darkmode-toggle' className='mode'>
              <i className="fa-regular fa-sun sun"></i>
              <i className="fa-regular fa-moon moon"></i>
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
