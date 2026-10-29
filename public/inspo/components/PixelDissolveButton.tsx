import React, { useRef, useEffect, useState } from 'react';

export interface PixelDissolveButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  base?: string;
  text?: string;
  accent?: string;
  hoverText?: string;
  border?: string;
  proximity?: boolean;
  reach?: number;
  haloOpacity?: number;
  magnetic?: boolean;
  strength?: number;
  arrow?: 'pixels' | 'fade';
  inDuration?: number;
  outDuration?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// 8x8 Bayer dithering matrix for ordered pixel dissolve
const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

const ROUTER_ICON = [
  '#..#..#',
  '.#.#.#.',
  '..###..',
  '#######',
  '..###..',
  '.#.#.#.',
  '#..#..#',
];

const ARROW_ICON = [
  '...#...',
  '....#..',
  '.....#.',
  '#######',
  '.....#.',
  '....#..',
  '...#...',
];

const ARROW_COORDS: [number, number][] = [];
for (let y = 0; y < 7; y++) {
  for (let x = 0; x < 7; x++) {
    if (ARROW_ICON[y][x] === '#') {
      ARROW_COORDS.push([x, y]);
    }
  }
}

/**
 * PixelDissolveButton
 * The flagship CTA button from Sigil with canvas Bayer matrix dissolve animation,
 * magnetic cursor tracking, and custom pixel arrow styling.
 */
export const PixelDissolveButton: React.FC<PixelDissolveButtonProps> = ({
  label = 'Start free trial',
  href,
  onClick,
  base = '#111111',
  text = '#FFFFFF',
  accent = '#FF4F00',
  hoverText = '#111111',
  border = '#111111',
  proximity = false,
  reach = 150,
  haloOpacity = 0.15,
  magnetic = false,
  strength = 0.3,
  arrow = 'pixels',
  inDuration = 350,
  outDuration = 250,
  fill = false,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const arrowSpansRef = useRef<(SVGElement | null)[]>([]);

  const isHovered = useRef(false);
  const [isClientHover, setIsClientHover] = useState(false);

  useEffect(() => {
    const el = linkRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    let width = 0;
    let height = 0;
    let animProgress = 0; // 0 to maxTime
    let lastTime = performance.now();
    let animId = 0;
    let cells: { x0: number; y0: number; w: number; h: number; threshold: number }[] = [];
    const pixelSize = 4;
    const transitionSpread = 120;
    const maxTime = Math.max(121, inDuration) - transitionSpread;

    function buildCells() {
      if (!el || !canvas) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === width && h === height && cells.length > 0) return;

      width = w;
      height = h;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const cols = Math.max(1, Math.round(w / pixelSize));
      const rows = Math.max(1, Math.round(h / pixelSize));
      const colWidth = w / cols;
      const rowHeight = h / rows;

      const originX = 34.5;
      const originY = h / 2;
      const maxDist = Math.hypot(Math.max(originX, w - originX), h / 2);

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = Math.floor(c * colWidth);
          const x1 = Math.floor((c + 1) * colWidth);
          const y0 = Math.floor(r * rowHeight);
          const y1 = Math.floor((r + 1) * rowHeight);

          const cx = (c + 0.5) * colWidth;
          const cy = (r + 0.5) * rowHeight;
          const dist = Math.hypot(cx - originX, cy - originY);
          const bayerVal = BAYER_8X8[r % 8][c % 8] / 64;

          const threshold = (0.7 * (dist / maxDist) + 0.3 * bayerVal) * maxTime;

          cells.push({
            x0,
            y0,
            w: x1 - x0,
            h: y1 - y0,
            threshold,
          });
        }
      }
    }

    function renderCanvas() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (animProgress <= 0) return;

      ctx.fillStyle = accent;
      for (const cell of cells) {
        const localT = (animProgress - cell.threshold) / transitionSpread;
        const clamped = Math.max(0, Math.min(1, localT));
        const alpha = 1 - Math.pow(1 - clamped, 3); // ease out cubic

        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          ctx.fillRect(cell.x0, cell.y0, cell.w, cell.h);
        }
      }
      ctx.globalAlpha = 1;
    }

    function updateColors() {
      if (!el) return;
      const tNorm = Math.max(0, Math.min(1, animProgress / (transitionSpread * 1.5)));
      const glyphMix = Math.round(tNorm * 100);

      el.style.setProperty(
        '--sb-glyph',
        `color-mix(in srgb, ${hoverText} ${glyphMix}%, ${accent})`
      );
      el.style.setProperty(
        '--sb-fg',
        `color-mix(in srgb, ${hoverText} ${glyphMix}%, ${text})`
      );
      el.style.setProperty(
        '--sb-border',
        `color-mix(in srgb, ${accent} ${glyphMix}%, ${border})`
      );

      // Pixel arrow animation
      if (arrow === 'pixels') {
        const delayBase = 0.4 * maxTime;
        arrowSpansRef.current.forEach((pixelEl, idx) => {
          if (pixelEl) {
            const pt = (animProgress - delayBase - idx * 8) / transitionSpread;
            const pClamp = Math.max(0, Math.min(1, pt));
            const pAlpha = 1 - Math.pow(1 - pClamp, 3);
            pixelEl.style.opacity = String(pAlpha);
          }
        });
      }
    }

    function loop(now: number) {
      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      const totalTarget = maxTime + transitionSpread;
      if (isHovered.current) {
        animProgress = Math.min(totalTarget, animProgress + dt);
      } else {
        const speed = totalTarget / Math.max(1, outDuration);
        animProgress = Math.max(0, animProgress - speed * dt);
      }

      renderCanvas();
      updateColors();

      const isFinished = isHovered.current
        ? animProgress >= totalTarget
        : animProgress <= 0;

      if (!isFinished) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = 0;
      }
    }

    function startAnimation() {
      buildCells();
      if (!animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    }

    buildCells();

    const onEnter = () => {
      isHovered.current = true;
      setIsClientHover(true);
      startAnimation();
    };

    const onLeave = () => {
      isHovered.current = false;
      setIsClientHover(false);
      startAnimation();
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focus', onEnter);
    el.addEventListener('blur', onLeave);

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focus', onEnter);
      el.removeEventListener('blur', onLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [accent, hoverText, text, border, inDuration, outDuration, arrow]);

  const cornerBorder = `1px solid ${accent}`;

  return (
    <div
      ref={containerRef}
      className={`relative ${fill ? 'flex w-full' : 'inline-flex'} ${className}`}
      style={style}
    >
      {/* Optional Proximity Halo */}
      {proximity && (
        <>
          <div
            ref={haloRef}
            aria-hidden="true"
            className="absolute -inset-6 blur-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: accent,
              opacity: isClientHover ? haloOpacity : 0,
            }}
          />
          <div
            ref={cornersRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{ opacity: isClientHover ? 1 : 0 }}
          >
            <span
              className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5"
              style={{ borderTop: cornerBorder, borderLeft: cornerBorder }}
            />
            <span
              className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5"
              style={{ borderTop: cornerBorder, borderRight: cornerBorder }}
            />
            <span
              className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5"
              style={{ borderBottom: cornerBorder, borderLeft: cornerBorder }}
            />
            <span
              className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5"
              style={{ borderBottom: cornerBorder, borderRight: cornerBorder }}
            />
          </div>
        </>
      )}

      {/* The Button / Anchor Element */}
      <a
        ref={linkRef}
        href={href}
        onClick={onClick}
        aria-label={label}
        className={`relative inline-flex items-center h-14 px-6 overflow-hidden select-none cursor-pointer border transition-colors ${
          fill ? 'w-full justify-between' : ''
        }`}
        style={{
          backgroundColor: base,
          borderColor: 'var(--sb-border, #111111)',
          color: 'var(--sb-fg, #FFFFFF)',
          textDecoration: 'none',
        }}
      >
        {/* Canvas for pixel dissolve effect */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content wrapper */}
        <span
          ref={textSpanRef}
          className="relative inline-flex items-center gap-3 w-full z-10"
        >
          {/* Router Glyphs */}
          <svg
            width={21}
            height={21}
            viewBox="0 0 7 7"
            shapeRendering="crispEdges"
            aria-hidden="true"
            className="block shrink-0"
          >
            {ROUTER_ICON.map((row, y) =>
              row.split('').map((char, x) =>
                char === '#' ? (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width={1}
                    height={1}
                    style={{ fill: 'var(--sb-glyph, #FF4F00)' }}
                  />
                ) : null
              )
            )}
          </svg>

          {/* Button Label */}
          <span
            ref={labelRef}
            className="font-medium text-base leading-tight tracking-tight whitespace-nowrap"
            style={{
              fontFamily: '"Geist", "Inter", system-ui, sans-serif',
              marginLeft: fill ? 'auto' : undefined,
            }}
          >
            {label}
          </span>

          {/* Pixel Arrow Icon */}
          <span className="inline-flex shrink-0 ml-auto">
            <svg
              width={21}
              height={21}
              viewBox="0 0 7 7"
              shapeRendering="crispEdges"
              aria-hidden="true"
              className="block shrink-0"
            >
              {ARROW_COORDS.map(([x, y], idx) => (
                <rect
                  key={`${x}-${y}`}
                  ref={(el) => {
                    arrowSpansRef.current[idx] = el;
                  }}
                  x={x}
                  y={y}
                  width={1}
                  height={1}
                  style={{
                    fill: 'var(--sb-fg, #FFFFFF)',
                    opacity: arrow === 'pixels' ? 0 : 1,
                  }}
                />
              ))}
            </svg>
          </span>
        </span>
      </a>
    </div>
  );
};

export default PixelDissolveButton;
