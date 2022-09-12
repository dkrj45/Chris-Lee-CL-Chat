import './LoginPage.scss'
import {Link, useNavigate} from 'react-router-dom'

function LoginPage() {

    let navigate = useNavigate()

    const clickHandler = () => {
        navigate('/RoomsPage')
    }

    return (
        <div className='loginpage'>
            <div className='loginpage__hero'>
                <img className='loginpage__logo' src={require('../../assets/images/cl-chat-logo.jpg')} alt='CL-Chat Logo' />
            </div>
            <div className='loginpage__container'>
                <h1>LOGIN</h1>
                <form className='loginpage__form'>
                    <label className='loginpage__form--label'>
                        <span>Email:</span>
                        <input className='loginpage__form--email' type='email' name='email' placeholder='email@website.com'></input>
                    </label>
                    <label className='loginpage__form--label'>
                        <span>Password:</span>
                        <input className='loginpage__form--password' type='text' name='password' placeholder='password'></input>
                    </label>
                    <button onClick={clickHandler} className='loginpage__form--button'>Sign In</button>
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