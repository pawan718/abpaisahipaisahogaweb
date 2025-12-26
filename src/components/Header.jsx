import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';

const supabaseUrl = 'https://bbzjpkynmsxwjvzpidwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiempwa3lubXN4d2p2enBpZHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDYxNDEsImV4cCI6MjA2MzA4MjE0MX0.7QtxPFHHa74ZSabzznjzpmcYnwE76qEJQFI6l-T5PC0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getFirstnameInitial = () => {
    if (!user) return '?';
    // Try to get firstname from user_metadata or email
    const firstName = user.user_metadata?.first_name || user.user_metadata?.firstName || user.user_metadata?.name?.split(' ')[0];
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    // Fallback to email first character
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  const getDisplayName = () => {
    if (!user) return 'User';
    const firstName = user.user_metadata?.first_name || user.user_metadata?.firstName || user.user_metadata?.name?.split(' ')[0];
    return firstName || user.email?.split('@')[0] || 'User';
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userId');
      navigate('/');
      setShowLogout(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Ab Paisa Hi Paisa Hoga</h1>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#features" className="nav-link">Features</a></li>
              <li><a href="#offers" className="nav-link">Offers</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
          {/* Only show login button if user is not logged in */}
          {user === null ? (
            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          ) : (
            <div 
              className="user-circle-container"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                setShowLogout(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setShowLogout(false);
                }, 200);
              }}
            >
              <div
                className="user-circle"
                title={getDisplayName()}
              >
                {getFirstnameInitial()}
              </div>
              {showLogout && (
                <div 
                  className="logout-dropdown"
                  onMouseEnter={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                    }
                    setShowLogout(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setShowLogout(false);
                    }, 200);
                  }}
                >
                  <div className="logout-user-info">
                    {getDisplayName()}
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 