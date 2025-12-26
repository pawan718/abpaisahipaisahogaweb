import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { createClient } from '@supabase/supabase-js';

// Dummy Supabase keys - replace with your real keys
const supabaseUrl = 'https://bbzjpkynmsxwjvzpidwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiempwa3lubXN4d2p2enBpZHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDYxNDEsImV4cCI6MjA2MzA4MjE0MX0.7QtxPFHHa74ZSabzznjzpmcYnwE76qEJQFI6l-T5PC0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    console.log('Attempting signup:', { email, password: password ? '***' : '' });
    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log('Supabase signup response:', { signUpError, data });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setSuccess('Account created! Please check your email to confirm your account.');
    } catch (err) {
      console.error('Network or unexpected error:', err);
      setError('Network or unexpected error: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Account</h2>
        <div className="input-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
            required
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-error" style={{ color: '#16a34a', background: '#dcfce7' }}>{success}</div>}
        <button className="login-btn" type="submit">Sign Up</button>
        <div className="signup-link" onClick={() => navigate('/login')}>Already have an account? Login</div>
      </form>
    </div>
  );
};

export default SignUp; 