import React, { useState, useEffect, useRef } from 'react';

export interface PixelUnderlineLinkProps {
  label?: string;
  href?: string;
  text?: string;
  rest?: string;
  draw?: string;
  background?: string;
  drawIn?: number;
  drawOut?: number;
  decoration?: 'none' | 'arrow' | 'doc' | 'diagonal' | 'key';
  shortcut?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ARROW_PATTERN = [
  '...#...',
  '....#..',
  '.....#.',
  '#######',
  '.....#.',
  '....#..',
  '...#...',
];

const DIAGONAL_PATTERN = [
  '..#####',
  '.....##',
  '....#.#',
  '...#..#',
  '..#....',
  '.#.....',
  '#......',
];

const DOC_PATTERN = [
  '####...',
  '#..##..',
  '#...##.',
  '#....#.',
  '#.##.#.',
  '#....#.',
  '######.',
];

function RenderGlyph({
  pattern,
  color,
  size = 3,
}: {
  pattern: string[];
  color: string;
  size?: number;
}) {
  const dim = 7 * size;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {pattern.map((row, y) =>
        row.split('').map((char, x) =>
          char === '#' ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              style={{ fill: color, transition: 'fill 200ms' }}
            />
          ) : null
        )
      )}
    </svg>
  );
}

/**
 * PixelUnderlineLink
 * Port of Sigil's secondary navigation / doc link with stepping pixel underline,
 * keyboard shortcut chip ('D'), and sliding pixel arrow.
 */
export const PixelUnderlineLink: React.FC<PixelUnderlineLinkProps> = ({
  label = 'Read the docs',
  href,
  text = '#111111',
  rest = '#CFCFC7',
  draw = '#FF4F00',
  background = '#F4F4F1',
  drawIn = 350,
  drawOut = 250,
  decoration = 'arrow',
  shortcut = 'D',
  className = '',
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [stepCount, setStepCount] = useState(24);
  const containerRef = useRef<HTMLAnchorElement>(null);

  const stepSize = 6;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      setStepCount(Math.max(1, Math.ceil(w / stepSize)));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [stepSize]);

  // Global key listener for keyboard shortcut (e.g. 'D')
  useEffect(() => {
    if (decoration !== 'key' || !shortcut) return;
    const keyTarget = shortcut.trim().toLowerCase();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (e.key.toLowerCase() !== keyTarget) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (href) {
        e.preventDefault();
        setIsKeyPressed(true);
        setTimeout(() => {
          setIsKeyPressed(false);
          window.location.href = href;
        }, 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [decoration, shortcut, href]);

  const active = isHovered || isKeyPressed;
  const gradient = (color: string) =>
    `repeating-linear-gradient(to right, ${color} 0 4px, transparent 4px ${stepSize}px)`;
  const duration = active ? drawIn : drawOut;

  return (
    <div className={`relative inline-flex ${className}`} style={style}>
      <a
        ref={containerRef}
        href={href}
        aria-keyshortcuts={decoration === 'key' ? shortcut : undefined}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="relative inline-flex items-center gap-2.5 h-14 select-none cursor-pointer"
        style={{
          color: text,
          textDecoration: 'none',
        }}
      >
        {/* Doc Glyph */}
        {decoration === 'doc' && (
          <span aria-hidden="true" className="inline-flex shrink-0">
            <RenderGlyph
              pattern={DOC_PATTERN}
              color={active ? draw : text}
              size={3}
            />
          </span>
        )}

        {/* Text Label */}
        <span
          className="font-medium text-base leading-tight whitespace-nowrap"
          style={{ fontFamily: '"Geist", "Inter", system-ui, sans-serif' }}
        >
          {label}
        </span>

        {/* Sliding Pixel Arrow */}
        {decoration === 'arrow' && (
          <span
            aria-hidden="true"
            className="relative w-5 h-5 overflow-hidden shrink-0 inline-flex items-center"
          >
            {/* Outgoing grey arrow */}
            <span
              className="absolute inset-0 transition-all duration-200"
              style={{
                transform: active ? 'translateX(14px)' : 'translateX(0)',
                opacity: active ? 0 : 1,
              }}
            >
              <RenderGlyph pattern={ARROW_PATTERN} color={text} size={3} />
            </span>
            {/* Incoming orange arrow */}
            <span
              className="absolute inset-0 transition-all duration-200"
              style={{
                transform: active ? 'translateX(0)' : 'translateX(-14px)',
                opacity: active ? 1 : 0,
              }}
            >
              <RenderGlyph pattern={ARROW_PATTERN} color={draw} size={3} />
            </span>
          </span>
        )}

        {/* Diagonal Arrow ↗ */}
        {decoration === 'diagonal' && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 -ml-0.5 transition-transform duration-200"
            style={{
              transform: active ? 'translate(2px, -2px)' : 'translate(0, 0)',
            }}
          >
            <RenderGlyph
              pattern={DIAGONAL_PATTERN}
              color={active ? draw : text}
              size={2}
            />
          </span>
        )}

        {/* Keyboard shortcut key chip */}
        {decoration === 'key' && (
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-mono border transition-all"
            style={{
              borderColor: active ? draw : rest,
              backgroundColor: isKeyPressed ? text : background,
              color: isKeyPressed ? background : text,
            }}
          >
            {shortcut}
          </span>
        )}

        {/* Stepped Pixel Underline */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-2.5 h-0.5 pointer-events-none"
        >
          <span
            className="absolute inset-0"
            style={{ backgroundImage: gradient(rest) }}
          />
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: gradient(draw),
              clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: `clip-path ${duration}ms steps(${stepCount}, end)`,
            }}
          />
        </span>
      </a>
    </div>
  );
};

export default PixelUnderlineLink;
