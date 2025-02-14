import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function validatePassword(pw) {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 3;
  }
  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
    }
    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    }
    if (passwordRef.current.value != rePasswordRef.current.value) {
      alert("Password is not suitable");
    }
    return true;
  }

  function handleRegister(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      usernameRef: usernameRef.current.value,
      emailRef: emailRef.current.value,
      passwordRef: passwordRef.current.value,
      rePasswordRef: rePasswordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.message == "User registered successfully!") {
          navigate("/login");
        }
        if (
          data.message == "Failed! Username is already in use!" ||
          data.message == "Failed! Email is already in use!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <form className=" w-1/3 flex flex-col p-5 gap-4 mt-4 mx-auto border rounded-lg">
        <input
          className="border rounded-lg p-3 "
          ref={usernameRef}
          type="text"
          placeholder="Enter username..."
        />
        <input
          className="border rounded-lg p-3 "
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Enter email..."
        />
        <input
          className="border rounded-lg p-3 "
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter password..."
        />
        <input
          className="border rounded-lg p-3 "
          ref={rePasswordRef}
          type="password"
          placeholder="Re-Enter password..."
        />
        <button
          className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-500"
          onClick={handleRegister}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default Register;
