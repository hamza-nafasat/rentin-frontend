const PropertiesIcon = ({ isLinkActive }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.83325 14.1666L5.83325 10.8333"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 14.1666L10 5.83331"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.1665 14.1666L14.1665 9.16663"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.08325 9.99998C2.08325 6.26803 2.08325 4.40205 3.24262 3.24268C4.40199 2.08331 6.26797 2.08331 9.99992 2.08331C13.7319 2.08331 15.5978 2.08331 16.7572 3.24268C17.9166 4.40205 17.9166 6.26803 17.9166 9.99998C17.9166 13.7319 17.9166 15.5979 16.7572 16.7573C15.5978 17.9166 13.7319 17.9166 9.99992 17.9166C6.26797 17.9166 4.40199 17.9166 3.24262 16.7573C2.08325 15.5979 2.08325 13.7319 2.08325 9.99998Z"
        stroke={isLinkActive ? '#0245A5' : '#1F1F1F'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PropertiesIcon;
