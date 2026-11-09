import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProfileDropdown } from './ProfileDropdown';
import { ShieldCheck, Inbox, ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenInbox: () => void;
  isTransitioning?: boolean;
  transitionLabel?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate,
  onOpenInbox,
}) => {
  const { isAuthenticated, unreadCount } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string; number: string; isActive?: (p: Page) => boolean }[] = [
    { id: 'home', label: 'Overview', number: '01' },
    { 
      id: 'products', 
      label: 'Products', 
      number: '02',
      isActive: (p) => p === 'products' || p === 'swarmic' || p === 'aakashavani'
    },
    { id: 'approach', label: 'Approach', number: '03' },
    { id: 'applications', label: 'Applications', number: '04' },
    { id: 'about', label: 'About', number: '05' },
    { id: 'contact', label: 'Contact', number: '06' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F4F1]/95 backdrop-blur-md border-b border-[#E2E2DC] transition-all">
      <div className="max-w-[1120px] mx-auto h-[72px] px-4 sm:px-6 lg:px-8 border-x border-[#E2E2DC] flex items-center justify-between">
        
        {/* Brand: Logo Glyph + Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer text-left focus:outline-none group select-none"
        >
          {/* 7x7 Pixel Glyph matching inspo */}
          <div className="w-[21px] h-[21px] shrink-0">
            <svg 
              width="21" 
              height="21" 
              viewBox="0 0 7 7" 
              shapeRendering="crispEdges" 
              role="img" 
              aria-label="Veiron glyph" 
              className="block group-hover:scale-105 transition-transform"
            >
              <rect x="2" y="0" width="1" height="1" fill="#111111"/>
              <rect x="3" y="0" width="1" height="1" fill="#111111"/>
              <rect x="4" y="0" width="1" height="1" fill="#111111"/>
              <rect x="1" y="1" width="1" height="1" fill="#111111"/>
              <rect x="5" y="1" width="1" height="1" fill="#111111"/>
              <rect x="0" y="2" width="1" height="1" fill="#111111"/>
              <rect x="3" y="2" width="1" height="1" fill="#111111"/>
              <rect x="6" y="2" width="1" height="1" fill="#111111"/>
              <rect x="0" y="3" width="1" height="1" fill="#111111"/>
              <rect x="2" y="3" width="1" height="1" fill="#111111"/>
              <rect x="3" y="3" width="1" height="1" fill="#111111"/>
              <rect x="4" y="3" width="1" height="1" fill="#111111"/>
              <rect x="6" y="3" width="1" height="1" fill="#111111"/>
              <rect x="0" y="4" width="1" height="1" fill="#111111"/>
              <rect x="3" y="4" width="1" height="1" fill="#111111"/>
              <rect x="6" y="4" width="1" height="1" fill="#111111"/>
              <rect x="1" y="5" width="1" height="1" fill="#111111"/>
              <rect x="5" y="5" width="1" height="1" fill="#111111"/>
              <rect x="2" y="6" width="1" height="1" fill="#111111"/>
              <rect x="3" y="6" width="1" height="1" fill="#111111"/>
              <rect x="4" y="6" width="1" height="1" fill="#111111"/>
            </svg>
          </div>
          <span className="font-heading font-medium text-[20px] text-[#111111] tracking-[-0.02em]">
            Veiron
          </span>
        </button>

        {/* Center: Framer Inspo Architectural Tab Group */}
        <nav 
          aria-label="Main Navigation" 
          className="hidden md:flex items-center border border-[#CFCFC7] bg-white/40 backdrop-blur-sm h-10 select-none"
        >
          {navItems.map((item) => {
            const active = item.isActive ? item.isActive(currentPage) : currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`h-full px-4 lg:px-5 flex items-center justify-center relative cursor-pointer text-xs font-sans transition-colors duration-150 ${
                  active 
                    ? 'text-[#111111] font-medium bg-[#F4F4F1]/90' 
                    : 'text-[#66665F] hover:text-[#111111] hover:bg-[#F4F4F1]/50'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Orange/Red Bottom Indicator Bar matching Overview */}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4F00]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: User Controls or Sign In / CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Beta Workspace */}
              <button
                onClick={() => handleNavClick('beta-dashboard')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full border transition-all cursor-pointer ${
                  currentPage === 'beta-dashboard'
                    ? 'bg-[#111110] text-white border-[#111110]'
                    : 'bg-white hover:bg-[#F4F4F1] text-[#111111] border-[#E2E2DC] hover:border-[#111111]'
                }`}
                title="Beta Testing Workspace"
              >
                <ShieldCheck size={13} className="text-[#FF4F00]" />
                <span>Workspace</span>
              </button>

              {/* Inbox Trigger */}
              <button
                onClick={onOpenInbox}
                className="relative p-2 text-[#66665F] hover:text-[#111111] hover:bg-[#E2E2DC]/50 rounded-full transition-colors cursor-pointer"
                title="Open Institutional Inbox"
                aria-label="Open Inbox"
              >
                <Inbox size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#FF4F00] text-white text-[10px] font-mono font-bold flex items-center justify-center rounded-full shadow-sm animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <ProfileDropdown 
                onNavigate={onNavigate} 
                onOpenInbox={onOpenInbox} 
              />
            </>
          ) : (
            <>
              {/* Sign In link */}
              <button
                onClick={() => handleNavClick('auth')}
                className={`hidden sm:inline-block px-3 py-1.5 text-xs font-sans font-medium transition-colors cursor-pointer ${
                  currentPage === 'auth' ? 'text-[#111111] underline' : 'text-[#66665F] hover:text-[#111111]'
                }`}
              >
                Sign In
              </button>

              {/* Request Access Pill Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="px-4 py-2 bg-[#111110] hover:bg-[#2C2C29] text-white text-xs font-sans font-medium rounded-full transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Request access</span>
                <ArrowUpRight size={13} />
              </button>
            </>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-[#66665F] hover:text-[#111111] hover:bg-[#E2E2DC]/40 rounded transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu matching inspo */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E2DC] bg-[#F4F4F1] animate-in slide-in-from-top duration-200">
          <div className="max-w-[1120px] mx-auto px-4 py-4 space-y-1 divide-y divide-[#E2E2DC]">
            <div className="space-y-1 pb-3">
              {navItems.map((item) => {
                const active = item.isActive ? item.isActive(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-2.5 px-3 flex items-center justify-between rounded text-sm transition-colors cursor-pointer ${
                      active ? 'bg-white font-medium text-[#111111]' : 'text-[#66665F] hover:bg-white/50 hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#8F8F87]">{item.number}</span>
                      <span>{item.label}</span>
                    </div>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex items-center justify-between">
              {!isAuthenticated ? (
                <button
                  onClick={() => handleNavClick('auth')}
                  className="text-xs font-mono text-[#66665F] hover:text-[#111111] py-2 px-1"
                >
                  Sign In to Beta
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('beta-dashboard')}
                  className="text-xs font-mono text-[#111111] font-semibold py-2 px-1"
                >
                  Beta Workspace
                </button>
              )}

              <button
                onClick={() => handleNavClick('contact')}
                className="px-4 py-2 bg-[#111110] text-white text-xs font-medium rounded-full cursor-pointer"
              >
                Request access
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};