'use client';
import {
  ArrowIcon,
  DashboardIcon,
  InsightsIcon,
  NotificationIcon,
  OnDemandIcon,
  PaymentsIcon,
  PropertiesIcon,
  Task,
} from '@/assets/icon';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout, MdOutlineKeyboardArrowDown } from 'react-icons/md';

const AdminAside = ({ mobileNav, setMobileNav }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null); // ⭐ New
  useEffect(() => {
    const matchedPage = pages.find(
      page => page.children && page.children.some(child => child.link === pathname)
    );
    if (matchedPage) {
      setOpenMenuId(matchedPage.id);
    }
  }, [pathname]);

  const pages = [
    {
      id: 1,
      title: 'Admin',
      link: '/agent',
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: 'Properties',
      link: '/admin/properties',
      icon: <PropertiesIcon />,
    },
    {
      id: 3,
      title: 'Users',
      icon: <OnDemandIcon />,
      children: [
        { id: 1, title: 'Agent', link: '/admin/users/agent' },
        { id: 2, title: 'Owner', link: '/admin/users/owner' },
        { id: 3, title: 'Tenant', link: '/admin/users/tenant' },
      ],
    },
    {
      id: 4,
      title: 'Request',
      icon: <Task />,
      children: [
        { id: 1, title: 'SignUp Request', link: '/admin/requests/signUp-request' },
        { id: 2, title: 'Building Request', link: '/admin/requests/building-request' },
        { id: 3, title: 'Property Request', link: '/admin/requests/property-request' },
        { id: 4, title: 'Agent Request', link: '/admin/requests/agent-request' },
        { id: 5, title: 'Owner Request', link: '/admin/requests/owner-request' },
        { id: 6, title: 'Tenant Request', link: '/admin/requests/tenant-request' },
        { id: 7, title: 'Certification Request', link: '/admin/requests/certification-request' },
      ],
    },
    {
      id: 5,
      title: 'Payments',
      link: '/admin/payments',
      icon: <PaymentsIcon />,
    },
    {
      id: 6,
      title: 'Insights',
      link: '/admin/insights',
      icon: <InsightsIcon />,
    },
    {
      id: 7,
      title: 'Notification',
      link: '/admin/notification',
      icon: <NotificationIcon />,
    },
  ];

  return (
    <aside
      className={`relative transition-all duration-300 ${mobileNav ? 'block h-full xl:hidden' : 'hidden xl:block'} ${isMenuOpen ? 'w-[84px]' : 'w-[246px]'}`}
    >
      <div
        className={`absolute top-[37px] -right-[10px] z-50 hidden cursor-pointer transition-all duration-300 xl:block ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <ArrowIcon />
      </div>

      <div
        className="relative flex h-full w-full flex-col overflow-x-hidden overflow-y-auto rounded-lg bg-white px-[11px] py-5"
        style={{ boxShadow: '0px 4px 14px 0px #3582E729' }}
      >
        {/* Logo */}
        <Image
          src={isMenuOpen ? '/images/default/home.png' : '/images/default/logo.png'}
          width={isMenuOpen ? 35 : 129}
          height={isMenuOpen ? 35 : 38}
          alt="logo"
          className="mx-auto"
        />

        {/* Menu */}
        <div className="mt-5">
          <h4 className={`text-xs font-bold text-[#545454] ${isMenuOpen ? 'text-center' : 'pl-2'}`}>
            MENU
          </h4>

          <div className="mt-3 flex flex-col gap-2">
            {pages.map(page => (
              <MenuItem
                key={page.id}
                page={page}
                pathname={pathname}
                isMenuOpen={isMenuOpen}
                setMobileNav={setMobileNav}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            ))}
          </div>

          <div className="mt-5 h-[1px] w-full bg-[#EBEBEB] lg:mt-[50px]" />
        </div>

        {/* Profile Section */}
        <div className="mt-5 flex flex-1 items-end">
          <ProfileSec isMenuOpen={isMenuOpen} />
        </div>
      </div>
    </aside>
  );
};

export default AdminAside;

const ProfileSec = ({ isMenuOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <BsThreeDots
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer text-base text-[#141B34]"
          />
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 bottom-full mb-2 w-32 rounded border border-gray-200 bg-white shadow-md"
            >
              <button
                onClick={() => console.log('Settings clicked')}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <p>Settings</p>
                <IoSettingsOutline />
              </button>
              <button
                onClick={() => console.log('Logout clicked')}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <p>Logout</p>
                <MdLogout />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import Link from 'next/link';

const MenuItem = ({ page, pathname, isMenuOpen, setMobileNav, openMenuId, setOpenMenuId }) => {
  const isChildActive = page?.children?.some(child => child.link === pathname);
  const isParentActive = page?.link === pathname;
  const isOpen = openMenuId === page.id;

  const handleParentClick = () => {
    if (!page.children && page.link) {
      setMobileNav(false);
    }
  };

  const toggleSubmenu = () => {
    if (page.children) {
      setOpenMenuId(isOpen ? null : page.id); // ⭐ Close others when open new
    }
  };

  return (
    <div className="flex flex-col">
      {/* Parent Link or Dropdown */}
      {page.children ? (
        <div
          onClick={toggleSubmenu}
          className={`flex cursor-pointer items-center rounded-lg px-[13px] py-[10px] text-sm font-medium transition-all duration-300 ${
            isMenuOpen ? 'justify-center' : 'justify-between'
          } ${isChildActive ? 'text-primary bg-[#E8F2FF]' : 'text-[#1F1F1F]'}`}
        >
          <div className={`flex items-center ${isMenuOpen ? 'justify-center' : 'gap-3'}`}>
            {React.cloneElement(page.icon, { isLinkActive: isChildActive })}
            {!isMenuOpen && <span>{page.title}</span>}
          </div>
          {!isMenuOpen && (
            <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              <MdOutlineKeyboardArrowDown />
            </span>
          )}
        </div>
      ) : (
        <Link
          href={page.link}
          onClick={handleParentClick}
          className={`flex items-center rounded-lg px-[13px] py-[10px] text-sm font-medium transition-all duration-300 ${
            isMenuOpen ? 'justify-center' : 'gap-3'
          } ${isParentActive ? 'text-primary bg-[#E8F2FF]' : 'text-[#1F1F1F]'}`}
        >
          {React.cloneElement(page.icon, { isLinkActive: isParentActive })}
          {!isMenuOpen && <span>{page.title}</span>}
        </Link>
      )}

      {/* Child Items */}
      {isOpen && page.children && !isMenuOpen && (
        <div className="border-primary mt-2 ml-5 flex flex-col gap-2 border-l-2">
          {page.children.map((child, index) => {
            const isActiveChild = pathname === child.link;
            return (
              <Link
                href={child.link}
                key={index}
                onClick={() => setMobileNav(false)}
                className={`ml-2.5 flex items-center rounded-lg px-[13px] py-[10px] text-sm font-medium transition-all duration-300 ${
                  isActiveChild ? 'text-primary bg-[#E8F2FF]' : 'text-[#1F1F1F]'
                }`}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
