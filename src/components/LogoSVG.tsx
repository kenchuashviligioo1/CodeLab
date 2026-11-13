export default function LogoSVG({ className = "h-9" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 190 40"
      role="img"
      aria-label="CODELAB"
      fill="none"
    >
      <defs>
        <linearGradient
          id="clbg"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00E5FF" />
          <stop offset=".5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M14 8 3 20l11 12M26 8l11 12-11 12"
        stroke="url(#clbg)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12v6l-3 3v6M20 18l4 4v5"
        stroke="url(#clbg)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="11" r="2" fill="#00E5FF" />
      <circle cx="17" cy="28" r="1.8" fill="#3B82F6" />
      <circle cx="24" cy="28" r="1.8" fill="#8B5CF6" />
      <text
        x="50"
        y="27"
        fontFamily="'Plus Jakarta Sans',sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="2.5"
        fill="#fff"
      >
        CODELAB
      </text>
    </svg>
  );
}
