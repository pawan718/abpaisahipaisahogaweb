import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { createClient } from '@supabase/supabase-js';

// Dummy Supabase keys - replace with your real keys
const supabaseUrl = 'https://bbzjpkynmsxwjvzpidwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiempwa3lubXN4d2p2enBpZHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDYxNDEsImV4cCI6MjA2MzA4MjE0MX0.7QtxPFHHa74ZSabzznjzpmcYnwE76qEJQFI6l-T5PC0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    console.log('Attempting login:', { email, password: password ? '***' : '' });
    try {
      const { error: loginError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Supabase login response:', { loginError, data });
      if (loginError) {
        setError(loginError.message);
        return;
      }

      // Persist user id for later submissions
      const authUserId = data?.user?.id || data?.session?.user?.id;
      if (authUserId) {
        localStorage.setItem('userId', authUserId);
      }

      // Redirect back to the intended page if set
      const redirectPath = localStorage.getItem('postLoginRedirect') || '/';
      localStorage.removeItem('postLoginRedirect');
      navigate(redirectPath);
    } catch (err) {
      console.error('Network or unexpected error:', err);
      setError('Network or unexpected error: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign In</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-btn" type="submit">Login</button>
        <div className="signup-link" onClick={() => navigate('/signup')}>Don't have an account? Create one</div>
      </form>
    </div>
  );
};

export default Login; 