const BUBBLE_COUNT = 24;

/**
 * CSS-only hero ambiance: morphing gradient blob + rising bubbles.
 * Animations live in `globals.css` (`.hero-fluid*`); no GSAP / runtime JS.
 */
export function HeroFluidBackdrop() {
  return (
    <div
      className="hero-fluid pointer-events-none absolute inset-0"
      aria-hidden
    >
      <div className="hero-fluid__blob" />
      <div className="hero-fluid__bubbles">
        {Array.from({ length: BUBBLE_COUNT }, (_, index) => (
          <span key={index} className="hero-fluid__bubble" />
        ))}
      </div>
    </div>
  );
}
