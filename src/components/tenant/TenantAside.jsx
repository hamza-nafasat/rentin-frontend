'use client';
import {
  ArrowIcon,
  BrowseProperties,
  DashboardIcon,
  FavoriteIcon,
  MessagesIcon,
  NotificationIcon,
  ProposalsIcon,
} from '@/assets/icon';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { useLogoutMutation } from '@/features/auth/authApi';

const TenantAside = ({ mobileNav, setMobileNav }) => {
  const { id } = useParams();
  const params = useParams();
  const tenantId = params.tenantId;
  const agentid = params.agentid;
  const pages = [
    {
      id: 1,
      title: 'Dashboard',
      link: ['/tenant'],
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: 'Browse Properties',
      link: ['/tenant/browser-property'],
      icon: <BrowseProperties />,
    },
    {
      id: 3,
      title: 'Booking Summary',
      link: ['/tenant/booking-summary'],
      icon: <NotificationIcon />,
    },
    {
      id: 4,
      title: 'Proposals',
      link: ['/tenant/proposals'],
      icon: <ProposalsIcon />,
    },
    {
      id: 5,
      title: 'Notification',
      link: ['/tenant/notification'],
      icon: <NotificationIcon />,
    },
    {
      id: 6,
      title: 'Messages',
      link: ['/tenant/messages'],
      icon: <MessagesIcon />,
    },
    {
      id: 7,
      title: 'Favorite',
      link: ['/tenant/favorite'],
      icon: <FavoriteIcon />,
    },
    {
      id: 8,
      title: 'Booking Details',
      link: ['/tenant/booking-details'],
      icon: <FavoriteIcon />,
    },
    {
      id: 9,
      title: 'Payment Details',
      link: ['/tenant/payment-details'],
      icon: <FavoriteIcon />,
    },
    {
      id: 10,
      title: 'All Modals',
      link: ['/tenant/all-modals'],
      icon: <FavoriteIcon />,
    },
  ];

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <aside
      className={`relative transition-all duration-300 ${
        mobileNav ? 'block h-full xl:hidden' : 'hidden xl:block'
      } ${isMenuOpen ? 'w-[84px]' : 'w-[246px]'}`}
    >
      {/* Arrow icon */}
      <div
        className={`absolute top-[37px] -right-[10px] z-50 hidden cursor-pointer transition-all duration-300 xl:block ${
          isMenuOpen ? 'rotate-180' : 'rotate-0'
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <ArrowIcon />
      </div>
      <div
        className="scroll-0 relative flex h-full w-full flex-col overflow-x-hidden overflow-y-auto rounded-lg bg-white px-[11px] py-5"
        style={{ boxShadow: '0px 4px 14px 0px #3582E729' }}
      >
        <Image
          src={isMenuOpen ? '/images/default/home.png' : '/images/default/logo.png'}
          width={isMenuOpen ? 35 : 129}
          height={isMenuOpen ? 35 : 38}
          alt="logo"
          className="mx-auto"
        />
        <div className="mt-5">
          <h4 className={`text-xs font-bold text-[#545454] ${isMenuOpen ? 'text-center' : 'pl-2'}`}>MENU</h4>
          <div className="mt-3 flex flex-col gap-2">
            {pages.map((page, i) => (
              <LinkItem key={i} page={page} pathname={pathname} isMenuOpen={isMenuOpen} setMobileNav={setMobileNav} />
            ))}
          </div>
          <div className="mt-5 h-[1px] w-full bg-[#EBEBEB] lg:mt-[50px]"></div>
        </div>
        <div className="mt-5 flex flex-1 items-end">
          <ProfileSec isMenuOpen={isMenuOpen} />
        </div>
      </div>
    </aside>
  );
};

export default TenantAside;

const LinkItem = ({ page, pathname, isMenuOpen, setMobileNav }) => {
  const isLinkActive = page?.link.some(item => item === pathname);
  return (
    <Link
      onClick={() => setMobileNav(false)} // Close when clicking outside
      href={page?.link[0]}
      className={`flex items-center rounded-lg px-[13px] py-[10px] text-sm font-medium transition-all duration-300 ${
        isMenuOpen ? 'justify-center gap-0' : 'gap-3'
      } ${isLinkActive ? 'text-primary bg-[#E8F2FF]' : 'text-[#1F1F1F]'}`}
    >
      {React.cloneElement(page?.icon, { isLinkActive })}
      <span
        className={`text-nowrap transition-all duration-300 ${
          isMenuOpen ? 'h-0 w-0 scale-x-0 opacity-0' : 'h-auto w-auto scale-x-100 opacity-100'
        }`}
      >
        {page?.title}
      </span>
      {!isMenuOpen && (page?.title === 'Notification' || page?.title === 'Messages') && (
        <span className="flex flex-1 justify-end">
          <div className="grid h-[18px] w-[27px] place-items-center rounded-[31px] bg-[#FF2F00] text-[10px] font-semibold text-white">
            {page?.title === 'Notification' && '21'}
            {page?.title === 'Messages' && '3'}
          </div>
        </span>
      )}
    </Link>
  );
};

const ProfileSec = ({ isMenuOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const menuRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // First call the logout API to clear server-side session
      await logout().unwrap();

      // Clear Redux store
      dispatch(deleteUser());

      // Clear all auth-related localStorage
      if (typeof window !== 'undefined') {
        // Clear specific auth items
        localStorage.removeItem('auth');
        // Clear any other auth-related items
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Clear all cookies
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }

      // Show success message
      toast.success('Logged out successfully');

      // Force a full page reload to clear all state
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);

      // Even if API fails, clear all local state
      dispatch(deleteUser());

      // Clear all auth-related localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Clear all cookies
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }

      toast.error('Logged out locally due to server error');

      // Force a full page reload to clear all state
      window.location.replace('/login');
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 border-t border-[#EBEBEB] px-3 pt-4">
      <div className="flex items-center gap-2">
        <Image
          src="/images/default/profile.png"
          width={32}
          height={32}
          alt="profile"
          className="size-[32px] rounded-full object-cover"
        />
        <div
          className={`transition-opacity duration-300 ${
            isMenuOpen ? 'w-0 scale-x-0 opacity-0' : 'w-auto scale-x-100 opacity-100'
          }`}
        >
          <h6 className="text-xs leading-none text-[#1F1F1F] md:text-sm">Alexander</h6>
          <p className="mt-1 text-[10px] leading-none text-[#545454]">alex@zemlya.com</p>
        </div>
      </div>
      {!isMenuOpen && (
        <div className="relative inline-block">
          {/* Three dots icon - click to toggle the menu */}
          <BsThreeDots onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer text-base text-[#141B34]" />

          {/* Dropdown Menu positioned above the icon */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="shadow-card absolute right-0 bottom-full mb-2 w-32 rounded border border-gray-200 bg-white"
            >
              <Link
                href="/tenant/settings"
                onClick={() => console.log('Settings clicked')}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <p>Settings</p>
                <IoSettingsOutline />
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <p>{isLoggingOut ? 'Logging out...' : 'Logout'}</p>
                <MdLogout />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
