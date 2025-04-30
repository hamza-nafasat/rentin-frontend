const DashboardIcon = ({ isLinkActive }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_816_31573)">
        <ellipse
          cx="14.7917"
          cy="5.20835"
          rx="3.54167"
          ry="3.54167"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
        />
        <circle
          cx="5.20817"
          cy="5.20835"
          r="3.54167"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
        />
        <circle
          cx="14.7917"
          cy="14.7917"
          r="3.54167"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
        />
        <ellipse
          cx="5.20817"
          cy="14.7917"
          rx="3.54167"
          ry="3.54167"
          stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_816_31573">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DashboardIcon;
