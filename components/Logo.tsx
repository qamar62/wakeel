export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo">
      <path
        d="M16 3C8.8 3 3 8.4 3 15.1c0 3.4 1.5 6.5 4 8.7L6 29l5.6-2.9c1.4.4 2.9.7 4.4.7 7.2 0 13-5.4 13-12.1S23.2 3 16 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="15" r="2" fill="currentColor" />
      <circle cx="16.5" cy="15" r="2" fill="currentColor" />
      <circle cx="22" cy="15" r="2.4" fill="var(--accent)" />
    </svg>
  );
}
