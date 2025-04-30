const TenantIcon = ({ isLinkActive }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.08325 9.99967C2.08325 6.26772 2.08325 4.40175 3.24262 3.24238C4.40199 2.08301 6.26797 2.08301 9.99992 2.08301C13.7319 2.08301 15.5978 2.08301 16.7572 3.24238C17.9166 4.40175 17.9166 6.26772 17.9166 9.99967C17.9166 13.7316 17.9166 15.5976 16.7572 16.757C15.5978 17.9163 13.7319 17.9163 9.99992 17.9163C6.26797 17.9163 4.40199 17.9163 3.24262 16.757C2.08325 15.5976 2.08325 13.7316 2.08325 9.99967Z"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5571L8.09067 12.2297C8.58114 12.6221 9.29252 12.5639 9.71271 12.097L14.3 7"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TenantIcon;
