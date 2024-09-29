import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

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

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    }
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      usernameRef: usernameRef.current.value,
      passwordRef: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
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
        if (data.message) {
          alert(data.message);
        } else {
          navigate("/");
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
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter password..."
        />

        <button
          className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-500"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
