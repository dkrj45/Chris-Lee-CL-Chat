import './SignupPage.scss'
import {Link, useNavigate} from 'react-router-dom'
import { useRef } from "react";

function SignupPage() {

  let navigate = useNavigate()

  const formRef = useRef()

  const clickHandler = (e) => {
    e.preventDefault()
    const form = formRef.current
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value
    if(name==="" || email==="" || password==="" || confirmPassword===""){
      alert("please fill in all the fields")
    } else if(password!==confirmPassword){
      alert("Passwords do not match. Please try again.")
      document.querySelector(".signuppage__form--confirm-password").classList.add("signuppage__form--confirm-password--error")
    } else{
      document.querySelector(".signuppage__form--confirm-password").classList.remove("signuppage__form--confirm-password--error")
      alert("Your account has been successfully created! Please log in with your new account.")
      navigate('/Loginpage')
    }
  }

  return (
    <div className='signuppage'>
        <div className='signuppage__hero'>
            <img className='signuppage__logo' src={require('../../assets/images/cl-chat-logo.jpg')} alt='CL-Chat Logo' />
        </div>
        <div className='signuppage__container'>
            <h1>Sign Up</h1>
            <form ref={formRef} className='signuppage__form'>
                <label className='signuppage__form--label'>
                    <span>Name:</span>
                    <input className='signuppage__form--name' type='text' name='name' placeholder='name'></input>
                </label>
                <label className='signuppage__form--label'>
                    <span>Email:</span>
                    <input className='signuppage__form--email' type='email' name='email' placeholder='email@website.com'></input>
                </label>
                <label className='signuppage__form--label'>
                    <span>Password:</span>
                    <input className='signuppage__form--password' type='text' name='password' placeholder='password'></input>
                </label>
                <label className='signuppage__form--label'>
                    <span>Confirm Password:</span>
                    <input id="confirmPassword" className='signuppage__form--confirm-password' type='text' name='confirmPassword' placeholder='confirm password'></input>
                </label>
                <button onClick={clickHandler} className='signuppage__form--button'>Create Account</button>
            </form>
            <h2 className='signuppage__link'>Already have an account? <Link to='/LoginPage'>Login</Link></h2>
        </div>
    </div>
  );
}

export default SignupPage;