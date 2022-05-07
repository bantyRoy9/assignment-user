import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { NavLink, useNavigate } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

// const URL = 'http://localhost:8000'
const URL = ''

const Signup = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    const changehandler = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }
    const submithandler= async(e)=>{
        e.preventDefault();
        try{

            const data = await axios.post(`${URL}/user/signUp`, user);
            // console.log(data.data.data.user._id);
            if(data.status === 201){

                alert('welcome! please fill all basic information')
                localStorage.setItem('id', data.data.data.user._id)
                navigate('/info')
            }else{

                alert('user login successfull')
            }

        }catch(err){
            alert('error',err)
        }
    }
    const responseFacebook = (response) => {
        // console.log(response);
    }
    
    
    const responseGoogle = (response) => {
        // console.log(response);
    }
    return (
        <>
            <div className="container">
                <div className="signup_container">
                    <div className="left">
                        <div className="content">
                            <article>A few clicks away
                                from Joining with us
                                as a Psychologist/
                                Psychotherapist</article>
                            <img src="/assests/a.png" alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="login-title">
                            <strong>Login</strong>
                            <p>Get Start at Innvoi</p>
                            <div className="login-link">
                                <GoogleLogin
                                    clientId='65589525964-872d15t76gg7146l4qv299hn9rivhb1d.apps.googleusercontent.com'
                                    buttonText="Sign In with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    style={{ label: 'pay', tagLine: false, size: 'medium', shape: 'pill', color: 'black' }}

                                />
                                <div className='gap'></div>
                                <FacebookLogin
                                    appId="1088597931155576"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    // onClick={componentClicked}
                                    callback={responseFacebook}
                                />
                            </div>

                            <hr style={{ marginTop: '40px', color: '#8c8c8c' }} />
                            <p className='sign-title'>Sign in with Email</p>
                            <div className="form-login">
                                <form onSubmit={submithandler}>
                                    <label htmlFor="email">Email Id</label>
                                    <input type="email" name="email" onChange={changehandler} placeholder='Enter your Email' required />
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" onChange={changehandler} placeholder='Enter your Password' required />
                                    <div className="signup">
                                        <NavLink to={'/'}>forget password</NavLink><span style={{position:'relative',left:'180px',top:'5px'}}> / </span>
                                        <NavLink to={'/info'}>SignUp</NavLink>
                                    </div>
                                    {/* <a href="/">Forget password?</a> */}
                                    <button className='btn' type="submit" >Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup