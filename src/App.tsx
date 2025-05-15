import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PageLoader from './components/PageLoader';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services" }, // Handled by HomePage for scrolling
  { name: "Contact", href: "/contact" },
];

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Header animation (initially transparent, becomes solid on scroll)
    gsap.to('header', {
        backgroundColor: '#1E1E1E',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        duration: 0.3,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: "body", 
            start: 'top top+=-100', 
            end: 'top top+=-101', 
            toggleActions: 'play none none reverse',
            onEnter: () => { 
                gsap.to('header nav a, header .logo-text, header .mobile-menu-icon', { color: '#A7C840', duration: 0.3 });
            },
            onLeaveBack: () => { 
                gsap.to('header nav a, header .logo-text, header .mobile-menu-icon', { color: 'rgba(255, 255, 255, 0.8)', duration: 0.3 });
            }
        }
    });

    // Initial state for header and navigation links
    gsap.set('header', { backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: 'none' });
    gsap.set('header nav a, header .logo-text, header .mobile-menu-icon', { color: 'rgba(255, 255, 255, 0.8)' });

  }, []); 

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Show loader on page change
    setIsLoadingPage(true);

    // Scroll to top immediately
    if (!location.hash || location.pathname !== '/') {
        window.scrollTo(0, 0);
    }

    // Hide loader after a delay
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 1500);

    return () => clearTimeout(timer);

  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' && !location.hash) {
        window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#2F2B2B] font-sans">
      <PageLoader isLoading={isLoadingPage} />
      <header ref={headerRef} className="fixed w-full z-50 top-0 left-0">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center">
            <img src="/images/Qi logo Grn.png" alt="QI Sports Logo" className="h-10 mr-3" /> 
            <div className="text-2xl font-bold logo-text">
               QI SPORTS <span className="text-sm font-light">est. 2011</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href} 
                className="font-medium transition-colors hover:text-[#A7C840]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main content area where routed pages will be rendered */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Optional: Add a 404 Not Found route here */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>

      <footer className="bg-[#1E1E1E] text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-6 md:mb-0 text-[#A7C840]">QI SPORTS</div>
            <div className="text-sm text-gray-300">© {new Date().getFullYear()} QI SPORTS. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
