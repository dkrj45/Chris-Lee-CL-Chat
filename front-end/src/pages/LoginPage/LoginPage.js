import './LoginPage.scss'
import {Link, useNavigate} from 'react-router-dom'

function LoginPage( {URL}) {

    let navigate = useNavigate()

    const clickHandler = (e) => {
      e.preventDefault();
        const creds = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        
        console.log(creds)
        fetch(`${URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(creds)
          }).catch(err => {
            return;
          }).then(res => {
            if(!res||!res.ok||res.status>=400){
              return;
            }
            return res.json()
          }).then(data => {
            if(!data) return;
            console.log(data)
            navigate('/HomePage');
            console.log("successfully logged in")
          })
    }

    return (
        <div className='loginpage'>
            <div className='loginpage__hero'>
                <img className='loginpage__logo' src={require('../../assets/images/cl-chat-logo.jpg')} alt='CL-Chat Logo' />
            </div>
            <div className='loginpage__container'>
                <h1>LOGIN</h1>
                <form onSubmit={clickHandler} className='loginpage__form'>
                    <label className='loginpage__form--label'>
                        <span>Email:</span>
                        <input className='loginpage__form--email' type='email' name='email' placeholder='email@website.com'></input>
                    </label>
                    <label className='loginpage__form--label'>
                        <span>Password:</span>
                        <input className='loginpage__form--password' type='password' name='password' placeholder='password'></input>
                    </label>
                    <button className='loginpage__form--button'>Sign In</button>
                    <h2 className='loginpage__link'>New to CL Chat? <Link to='/SignupPage'>Sign Up</Link></h2>
                </form>
                <h2 className='loginpage__or'><span>OR</span></h2>
                <div className='loginpage__other-options'>
                    <button className='loginpage__guest'>Sign in as a Guest</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;