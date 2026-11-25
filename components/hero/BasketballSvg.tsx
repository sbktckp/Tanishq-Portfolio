/** Flat basketball illustration, used when WebGL is unavailable. */
export default function BasketballSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <clipPath id="bb-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#f7931e" />
      <g clipPath="url(#bb-clip)" fill="none" stroke="#3b0d1f" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <path d="M18 6 C 40 30, 40 70, 18 94" />
        <path d="M82 6 C 60 30, 60 70, 82 94" />
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#3b0d1f" strokeWidth="3" />
    </svg>
  );
}
