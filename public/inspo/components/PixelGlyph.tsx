import React from 'react';

export type GlyphPattern =
  | 'logo'
  | 'router'
  | 'retrieve'
  | 'tool'
  | 'verify'
  | 'respond'
  | 'check'
  | 'scripts'
  | 'logs'
  | 'cost'
  | 'alert'
  | 'shield'
  | 'cube'
  | 'cloud'
  | 'trace'
  | 'plug'
  | 'quote'
  | 'lock'
  | 'models'
  | 'bolt'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUpRight';

export const GLYPH_PATTERNS: Record<GlyphPattern, string[]> = {
  logo: [
    '..###..',
    '.#...#.',
    '#..#..#',
    '#.###.#',
    '#..#..#',
    '.#...#.',
    '..###..'
  ],
  router: [
    '#..#..#',
    '.#.#.#.',
    '..###..',
    '#######',
    '..###..',
    '.#.#.#.',
    '#..#..#',
  ],
  retrieve: [
    '.#####.',
    '#.....#',
    '.#####.',
    '#.....#',
    '.#####.',
    '#.....#',
    '.#####.',
  ],
  tool: [
    '..###..',
    '..#.#..',
    '###.###',
    '#.....#',
    '###.###',
    '..#.#..',
    '..###..',
  ],
  verify: [
    '#######',
    '#.....#',
    '##...##',
    '#.#.#.#',
    '#..#..#',
    '#.....#',
    '#######',
  ],
  respond: [
    '...#...',
    '..###..',
    '.#.#.#.',
    '#..#..#',
    '...#...',
    '...#...',
    '...#...',
  ],
  check: [
    '.......',
    '......#',
    '.....#.',
    '#...#..',
    '.#.#...',
    '..#....',
    '.......',
  ],
  scripts: [
    '###....',
    '.......',
    '#####..',
    '.......',
    '##.###.',
    '.......',
    '####.##',
  ],
  logs: [
    '#.#####',
    '.......',
    '#.####.',
    '.......',
    '#.#####',
    '.......',
    '#.###..',
  ],
  cost: [
    '...#...',
    '.#####.',
    '#..#...',
    '.#####.',
    '...#..#',
    '.#####.',
    '...#...',
  ],
  alert: [
    '...#...',
    '..#.#..',
    '..#.#..',
    '.#.#.#.',
    '.#...#.',
    '#..#..#',
    '#######',
  ],
  shield: [
    '#######',
    '#.....#',
    '#..#..#',
    '#.###.#',
    '.#.#.#.',
    '..#.#..',
    '...#...',
  ],
  cube: [
    '..###..',
    '##...##',
    '#.#.#.#',
    '#..#..#',
    '#..#..#',
    '##.#.##',
    '..###..',
  ],
  cloud: [
    '.......',
    '..##...',
    '.#..##.',
    '#.....#',
    '#.....#',
    '.#####.',
    '.......',
  ],
  trace: [
    '###....',
    '.......',
    '.####..',
    '.......',
    '...###.',
    '.......',
    '....###',
  ],
  plug: [
    '.#...#.',
    '.#...#.',
    '#######',
    '#######',
    '.#####.',
    '..###..',
    '...#...',
  ],
  quote: [
    '.......',
    '##..##.',
    '##..##.',
    '.#...#.',
    '#...#..',
    '.......',
    '.......',
  ],
  lock: [
    '..###..',
    '.#...#.',
    '.#...#.',
    '#######',
    '###.###',
    '###.###',
    '#######',
  ],
  models: [
    '###.###',
    '#.#.#.#',
    '###.###',
    '.......',
    '###.###',
    '#.#.#.#',
    '###.###',
  ],
  bolt: [
    '....##.',
    '...##..',
    '..##...',
    '.#####.',
    '...##..',
    '..##...',
    '.##....',
  ],
  arrowLeft: [
    '...#...',
    '..#....',
    '.#.....',
    '#######',
    '.#.....',
    '..#....',
    '...#...',
  ],
  arrowRight: [
    '...#...',
    '....#..',
    '.....#.',
    '#######',
    '.....#.',
    '....#..',
    '...#...',
  ],
  arrowUpRight: [
    '..#####',
    '.....##',
    '....#.#',
    '...#..#',
    '..#...#',
    '.#.....',
    '#......',
  ]
};

export interface PixelGlyphProps {
  pattern?: GlyphPattern;
  color?: string;
  pixel?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PixelGlyph - Signature 7x7 pixel art glyph renderer
 * Direct port of Sigil's Framer component with exact bitmap grids.
 */
export const PixelGlyph: React.FC<PixelGlyphProps> = ({
  pattern = 'logo',
  color = '#111111',
  pixel = 3,
  className = '',
  style,
}) => {
  const rows = GLYPH_PATTERNS[pattern] || GLYPH_PATTERNS.logo;
  const dimension = pixel * 7;

  return (
    <div
      className={`inline-block shrink-0 relative select-none ${className}`}
      style={{
        ...style,
        width: dimension,
        height: dimension,
      }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 7 7"
        shapeRendering="crispEdges"
        role="img"
        aria-label={`${pattern} glyph`}
        style={{ display: 'block' }}
      >
        {rows.map((row, y) =>
          row.split('').map((char, x) =>
            char === '#' ? (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                style={{ fill: color }}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};

export default PixelGlyph;
