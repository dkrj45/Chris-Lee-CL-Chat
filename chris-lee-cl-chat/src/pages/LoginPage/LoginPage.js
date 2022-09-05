import './LoginPage.scss'
import {Link, useNavigate} from 'react-router-dom'

function LoginPage() {
  return (
    <div className='loginpage'>
        <div className='loginpage__hero'>
            <img className='loginpage__logo' src={require('../../assets/images/cl-chat-logo.jpg')} alt='CL-Chat Logo' />
        </div>
        <div>
            <h1>Login</h1>
            <form className='loginpage__form'>
                <label>
                    Email:
                    <input className='loginpage__form--email' type='email' name='email' placeholder='email@website.com'></input>
                </label>
                <label>
                    Password:
                    <input className='loginpage__form--password' type='text' name='password' placeholder='password'></input>
                </label>
                <button className='loginpage__form--button'>Login</button>
            </form>
            <h2>New to CL Chat? <Link to='/SignupPage'>Sign Up</Link></h2>
        </div>
    </div>
  );
}

export default LoginPage;