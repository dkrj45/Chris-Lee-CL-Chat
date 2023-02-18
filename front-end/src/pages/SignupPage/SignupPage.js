import "./SignupPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../../components/AccountContext";

function SignupPage() {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  let [emailWarning, setEmailWarning] = useState(false);
  let [passwordWarning, setPasswordWarning] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    const creds = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("please fill in all the fields.");
    }
    if (
      !(
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) &&
      (email.includes("@") === false || email.includes(".") === false)
    ) {
      setEmailWarning(true);
    }
    if (
      !(
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) &&
      confirmPassword !== password
    ) {
      setPasswordWarning(true);
    }
    if (email.includes("@") === true && email.includes(".") === true) {
      setEmailWarning(false);
    }
    if (
      !(
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) &&
      confirmPassword === password
    ) {
      setPasswordWarning(false);
    }
    if (
      !(
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) &&
      confirmPassword === password &&
      email.includes("@") === true &&
      email.includes(".") === true
    ) {
      fetch(`api/auth/signup`, {
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
          } else if (data.signedUp) {
            alert(
              "You have successfully registered the account. Please log-in using the account you created."
            );
            navigate("/LoginPage");
          }
        });
    }
  };

  return (
    <div className="signuppage">
      <div className="signuppage__hero">
        <img
          className="signuppage__logo"
          src={require("../../assets/images/cl-chat-logo.jpg")}
          alt="CL-Chat Logo"
        />
      </div>
      <div className="signuppage__container">
        <h1>SIGN UP</h1>
        <h2 className="signuppage__error">{error}</h2>
        <form onSubmit={clickHandler} className="signuppage__form">
          <label className="signuppage__form--label">
            <span>Name:</span>
            <input
              className="signuppage__form--name"
              type="text"
              name="name"
              placeholder="name"
            ></input>
          </label>
          <label id="label__email" className="signuppage__form--label">
            <span>Email:</span>
            <input
              className="signuppage__form--email"
              type="text"
              name="email"
              placeholder="email@website.com"
            ></input>
            {emailWarning ? (
              <h3 className="signuppage__error-message--email">
                Please enter a valid email address.
              </h3>
            ) : (
              ""
            )}
          </label>
          <label className="signuppage__form--label">
            <span>Password:</span>
            <input
              className="signuppage__form--password"
              type="password"
              name="password"
              placeholder="password"
            ></input>
          </label>
          <label
            id="label__confirm-password"
            className="signuppage__form--label"
          >
            <span>Confirm Password:</span>
            <input
              id="confirmPassword"
              className="signuppage__form--confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
            ></input>
            {passwordWarning ? (
              <h3 className="signuppage__error-message--confirm-password">
                Your passwords are not matching.
              </h3>
            ) : (
              ""
            )}
          </label>
          <button className="signuppage__form--button">Create Account</button>
          <h2 className="signuppage__link">
            Already have an account? <Link to="/LoginPage">Login</Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
