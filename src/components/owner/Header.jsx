'use client';
import { NotificationBoxIcon, ReloadIcon } from '@/assets/icon';
import { getDate } from '@/utils/getDate';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import GoogleTranslate from '../googleTranslate';
import NotificationMenu from '../shared/NotificationMenu';
import Aside from './Aside';

const Header = () => {
  const [date, setDate] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    setDate(getDate());

    const handleClickOutside = e => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [mobileNav, setMobileNav] = useState(false);

  const mobileNavHandler = () => {
    setMobileNav(!mobileNav); // Toggle the mobileNav state
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 py-4 xl:hidden">
        <div className="bg-primary cursor-pointer rounded-md p-2" onClick={mobileNavHandler}>
          <RxHamburgerMenu color="#fff" fontSize={20} />
        </div>
        <div>
          <Link href="/owner">
            <Image
              src="/images/default/home.png"
              width={35}
              height={35}
              alt="logo"
              className="mx-auto cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-50 block h-full w-full bg-[#00000071] transition-all duration-500 xl:hidden ${
          mobileNav ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
        onClick={() => setMobileNav(false)} // Close when clicking outside
      >
        <div
          onClick={e => e.stopPropagation()}
          className={`absolute top-0 left-0 h-full w-[246px] transition-transform duration-500 ${
            mobileNav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Aside mobileNav={mobileNav} setMobileNav={setMobileNav} /> {/* Your Sidebar component */}
        </div>
      </div>
      <header className="flex h-[74px] items-center justify-between gap-4 rounded-lg bg-white p-4">
        <div>
          <h2 className="text-text-textColor text-xl font-semibold capitalize lg:text-[22px]">
            Owner
          </h2>
          <p className="text-xs text-[#969696]">{date}</p>
        </div>
        <div className="flex items-center gap-[14px]">
          <SwitchButton />
          <div className="relative" ref={notificationRef}>
            <button
              className="cursor-pointer rounded-[5px] p-2"
              style={{ boxShadow: '0px 1px 6px 0px #00000014' }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <NotificationBoxIcon />
            </button>
            <NotificationMenu isNotificationOpen={isNotificationOpen} />
          </div>
          {/* <LanguageSwitch /> */}
          <GoogleTranslate />
        </div>
      </header>
    </div>
  );
};

export default Header;

const SwitchButton = () => (
  <button
    className="text-text-textColor hidden cursor-pointer items-center gap-3 rounded-[5px] px-5 py-2 text-sm font-medium md:flex md:text-base"
    style={{ boxShadow: '0px 1px 6px 0px #00000014' }}
  >
    <ReloadIcon />
    Switch to Tenant
  </button>
);

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState('th');
  const router = useRouter();

  const changeLanguage = lang => {
    if (lang === locale) return;
    localStorage.setItem('lang', lang);
    setLocale(lang);
    router.refresh();
  };
  return (
    <div className="relative">
      <button
        className="hidden cursor-pointer items-center gap-1 rounded-[5px] px-5 py-2 text-xs text-[#969696] md:flex"
        onClick={() => setIsOpen(!isOpen)}
        style={{ boxShadow: '0px 1px 6px 0px #00000014' }}
      >
        <Image
          src={`/images/default/${locale === 'en' ? 'english' : 'thai'}-flag.png`}
          width={20}
          height={13}
          alt="flag"
          className="rounded-[] w-[20px] object-cover"
        />
        {locale === 'en' ? 'English' : 'ไทย'}
        <IoIosArrowDown className="text-base text-[#969696]" />
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 w-[120px] rounded-md bg-white shadow-lg">
          <button
            className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              changeLanguage('en');
              setIsOpen(false);
            }}
          >
            🇬🇧 English
          </button>
          <button
            className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              changeLanguage('th');
              setIsOpen(false);
            }}
          >
            🇹🇭 ไทย
          </button>
        </div>
      )}
    </div>
  );
};
