import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import DealsOfTheDay from './components/DealsOfTheDay.jsx';
import Offers from './components/Offers.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import FinanceBanner from './components/FinanceBanner.jsx';
import FinanceFillFormPage from './components/FinanceFillFormPage.jsx';
import Summary from './components/Summary.jsx';

function HomePage({ isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <FinanceBanner />
        <DealsOfTheDay />
        <Hero />
        <Offers />
        <Features />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/finance-fill-form" element={<FinanceFillFormPage />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/" element={<HomePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 