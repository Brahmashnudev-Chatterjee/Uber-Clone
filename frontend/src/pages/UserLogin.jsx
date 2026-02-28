import React, { useState } from "react";
import { Link } from "react-router-dom";

export const UserLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = useState({})




  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password

    })
    console.log(userData);
    setEmail("");
    setPassword("");
  }
  return (
    <div className="p-7 flex flex-col items-center justify-between h-screen w-full">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/250px-Uber_logo_2018.svg.png"
          alt="NA"
        />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
              
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?
          <Link to="/usersignup" className="text-blue-500">
            Create an account
          </Link>
        </p>
      </div>

      <div>
        <Link to="/captain-login" className="bg-[#10b461] text-white font-semibold flex items-center justify-center mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
