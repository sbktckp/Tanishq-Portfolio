/** Hand-drawn "TK" monogram: a long slanted bar, a stem, and a K made of a "<" and a swoop. */
export const LOGO_PATHS = [
  "M450 348 C 520 330 640 322 760 312 C 880 302 980 280 1055 270",
  "M703 318 C 708 330 711 345 712 375 C 718 560 730 760 741 958",
  "M1075 452 C 960 510 840 580 760 636 C 720 662 692 676 690 681 C 690 686 700 688 716 698 C 780 740 860 810 930 860 C 985 898 1050 915 1203 900",
];

export default function Logo({
  className = "",
  color = "currentColor",
  strokeWidth = 30,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="420 240 810 750" className={className} fill="none" aria-hidden>
      {LOGO_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
