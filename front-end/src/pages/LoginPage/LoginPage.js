import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../../components/AccountContext";

function LoginPage() {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    const creds = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch(`api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setUser({ ...data });
        if (data.status) {
          setError(data.status);
        } else if (data.loggedIn) {
          localStorage.setItem("token", data.token);
          navigate("/HomePage");
        }
      });
  };

  return (
    <div className="loginpage">
      <div className="loginpage__hero">
        <img
          className="loginpage__logo"
          src={require("../../assets/images/cl-chat-logo.jpg")}
          alt="CL-Chat Logo"
        />
      </div>
      <div className="loginpage__container">
        <h1>LOGIN</h1>
        <h2 className="loginpage__error">{error}</h2>
        <form onSubmit={clickHandler} className="loginpage__form">
          <label className="loginpage__form--label">
            <span>Email:</span>
            <input
              className="loginpage__form--email"
              type="email"
              name="email"
              placeholder="email@website.com"
            ></input>
          </label>
          <label className="loginpage__form--label">
            <span>Password:</span>
            <input
              className="loginpage__form--password"
              type="password"
              name="password"
              placeholder="password"
            ></input>
          </label>
          <button className="loginpage__form--button">Sign In</button>
          <h2 className="loginpage__link">
            New to CL Chat? <Link to="/SignupPage">Sign Up</Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
