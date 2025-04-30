const OnDemandIcon = ({ isLinkActive }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_857_1509)">
        <circle
          cx="10.0001"
          cy="9.99996"
          r="8.33333"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
        />
        <path
          d="M6.25 14.1666C8.19308 12.1314 11.786 12.0356 13.75 14.1666M12.0792 7.91659C12.0792 9.06718 11.1452 9.99992 9.99294 9.99992C8.84071 9.99992 7.90664 9.06718 7.90664 7.91659C7.90664 6.76599 8.84071 5.83325 9.99294 5.83325C11.1452 5.83325 12.0792 6.76599 12.0792 7.91659Z"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_857_1509">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OnDemandIcon;
