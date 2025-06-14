// App.jsx 
import React, { useState, lazy, Suspense } from 'react';
import Topbar from './components/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import PageSkeleton from './components/LoadingSkeleton/PageSkeleton';
import Home from './pages/Home';  // Import Home eagerly
import Forms from './pages/Forms';
import Csr from './pages/Csr';

// Lazy load all other page components


const People = lazy(() => import('./pages/People'));
const Funding = lazy(() => import('./pages/Funding_statistics'));
const Office= lazy(() => import('./pages/Office_statistics'));
const Documents = lazy(() => import('./pages/Documents'));
const Searchresults = lazy(() => import('./pages/searchresults'));



function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Fixed top bar */}
      <Topbar toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      {/* Mobile menu overlay */}
      <div 
        className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex flex-grow relative" style={{ paddingTop: '70px' }}>
        {/* Sidebar navigation */}
        <div 
          className={`fixed top-[70px] left-0 bottom-0 w-[280px] sm:w-[220px] lg:w-[250px] z-40 
            bg-white shadow-md transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
        >
          <Navbar closeMenu={() => setIsMobileMenuOpen(false)} />
        </div>
        
        {/* Main content - explicit margin to avoid sidebar overlap */}
        <div className="w-full sm:pl-[220px] lg:pl-[250px] flex flex-col min-h-full">
          <div className="max-w-full overflow-x-hidden flex-grow">
            <Routes>
              {/* Home page loaded eagerly */}
              <Route path="/" element={<Home />} />
              
              {/* Each lazy-loaded page wrapped in its own Suspense */}
              
              <Route path="/people" element={
                <Suspense fallback={<PageSkeleton />}>
                  <People />
                </Suspense>
              } />
              
              <Route path="/forms" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Forms />
                </Suspense>
              } />

              <Route path="/FundingStatistics" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Funding />
                </Suspense>
              } />
              <Route path="/documents" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Documents />
                </Suspense>
              } />



              <Route path="/csr" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Csr />
                </Suspense>
              } />
              
              <Route path="/search" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Searchresults />
                </Suspense>
              } />

              
              <Route path="/OfficeStatistics" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Office />
                </Suspense>
              } />


            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
