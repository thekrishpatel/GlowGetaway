import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useFirebase } from '../context/firebase';

function LoginPage() {
  const navigate = useNavigate();
  const { loginUserWithEmailAndPassword, signupWithGoogle } = useFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUserWithEmailAndPassword(email, password);
      navigate('/');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signupWithGoogle();
      navigate('/');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <input type="text" id="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input type="password" id="password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label htmlFor="password">Password</label>
        </div>
        <button type='submit' className="btn btn-primary">Login</button>
        <button className="btn btn-google" onClick={handleGoogleLogin}>
          <img src='/images/google.png' alt="Google Logo" /> <span>Sign in with Google</span>
        </button>
        <div className="divider">OR</div>
        <button className="btn btn-signup" onClick={handleSignUpClick}>Sign Up</button>
      </form>
    </div>
  );
}

export default LoginPage;