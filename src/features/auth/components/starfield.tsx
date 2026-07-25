import {
  AMBIENT_STARS,
  CONSTELLATION_LINES,
  CONSTELLATION_POINTS,
} from "../constants";

/**
 * The backdrop for the signed-out showcase: a cool wash, Ursa Minor traced in
 * the corner, and a scattering of stars that twinkle out of sync.
 *
 * Purely decorative, so it is hidden from assistive tech and never intercepts
 * clicks meant for the carousel underneath it.
 */
export const Starfield = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 58%, oklch(0.42 0.11 262 / 0.28) 0%, transparent 72%)",
        }}
      />

      {/* Constellation lines. Stretched with the panel — non-scaling-stroke
          keeps them hairline-thin regardless of the aspect ratio. */}
      <svg
        className="absolute inset-0 size-full text-ring"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {CONSTELLATION_LINES.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={CONSTELLATION_POINTS[from].x}
            y1={CONSTELLATION_POINTS[from].y}
            x2={CONSTELLATION_POINTS[to].x}
            y2={CONSTELLATION_POINTS[to].y}
            stroke="currentColor"
            strokeOpacity={0.22}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Constellation stars sit outside the SVG so they stay perfect circles. */}
      {CONSTELLATION_POINTS.map((point, index) => (
        <span
          key={`constellation-${index}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: `${point.r * 2}px`,
            height: `${point.r * 2}px`,
            marginLeft: `${-point.r}px`,
            marginTop: `${-point.r}px`,
            opacity: point.bright ? 0.95 : 0.5,
            boxShadow: point.bright
              ? "0 0 12px 3px oklch(0.6562 0.1826 262.74 / 0.75), 0 0 32px 10px oklch(0.6562 0.1826 262.74 / 0.3)"
              : "0 0 6px 1px oklch(1 0 0 / 0.25)",
          }}
        />
      ))}

      {AMBIENT_STARS.map((star, index) => (
        <span
          key={`star-${index}`}
          className="absolute rounded-full motion-safe:animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            // Brightness lives in the alpha channel, not `opacity` — the pulse
            // keyframes animate `opacity` and would flatten every star to the
            // same value.
            backgroundColor: `rgb(255 255 255 / ${star.opacity})`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
