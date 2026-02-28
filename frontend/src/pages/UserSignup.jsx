import React from "react";
import { Link } from "react-router-dom";

export const UserSignup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userData, setUserData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    console.log(userData);
  };

  return (
    <div className="p-7 flex flex-col items-center justify-between h-screen w-full">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/250px-Uber_logo_2018.svg.png"
          alt="NA"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/userlogin" className="text-blue-500">
            Login here.
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[9.5px] text-center leading-tight">
          By proceeding, you consent to get calls, WhatsApp and promotional
          messages included by automated means from Uber and its affiliates to
          the number provided. This number may also be used for verification and
          security purposes. You may opt out of receiving promotional messages
          by changing your notification settings in your account. For more
          details, please review our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
