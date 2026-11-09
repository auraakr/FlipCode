import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// ============================================================================
// NAVIGATION & DIRECTIONAL ICONS
// ============================================================================
export function ArrowLeftIcon({ size = 18, color = '#1F2A44', strokeWidth = 2.3 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 18, color = '#FFFFFF', strokeWidth = 2.4 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowDownIcon({ size = 15, color = '#FFFFFF', strokeWidth = 2.5 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M6 13l6 6 6-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowUpRightIcon({ size = 16, color = 'rgba(255,255,255,0.65)' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function UndoCornerLeftIcon({ size = 20, color = '#1F2A44' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 14L4 9l5-5"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 20v-7a4 4 0 00-4-4H4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 18, color = '#FFFFFF', strokeWidth = 2.4 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 16, color = '#94A3B8', strokeWidth = 2.2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CloseIcon({ size = 16, color = '#1F2A44', strokeWidth = 2.3 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ============================================================================
// STATUS & FEEDBACK ICONS
// ============================================================================
export function CheckIcon({ size = 14, color = '#FFFFFF', strokeWidth = 2.8 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DoubleCheckIcon({ size = 15, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L7 17l-5-5M22 10l-7.5 7.5L13 16"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({
  size = 20,
  color = '#94A3B8',
  filled = false,
  keyholeColor,
}) {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="5" y="11" width="14" height="10" rx="2.5" fill={color} />
        <Path
          d="M8 11V7a4 4 0 018 0v4"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2.5"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M8 11V7a4 4 0 018 0v4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {keyholeColor !== null && (
        <Circle cx="12" cy="16" r="1.2" fill={keyholeColor || color} />
      )}
    </Svg>
  );
}

export function UnlockedIcon({ size = 12, color = '#EA580C' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2.5"
        fill={color}
        opacity={0.85}
      />
      <Path
        d="M8 11V7a4 4 0 017.5-1.8"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function UnlockedOutlineIcon({ size = 17, color = '#94A3B8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2.5"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M8 11V7a4 4 0 017.5-1.8"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LightningBoltIcon({ size = 10, color = '#FACC15' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color} />
    </Svg>
  );
}

export function CalculatorSheetIcon({ size = 18, color = '#94A3B8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="3"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M8 8.5h3M9.5 7v3M13.5 8.5h3M8 15h8"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SparkleStarIcon({ size = 16, color = '#FACC15' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
        fill={color}
      />
    </Svg>
  );
}

export function FourPointSparkleIcon({ size = 15, color = '#10B981' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z"
        fill={color}
      />
    </Svg>
  );
}

export function ClockIcon({ size = 14, color = '#64748B' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      <Path
        d="M12 7v5l3 2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function RefreshCwIcon({ size = 15, color = '#1F2A44' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 4v6h6M23 20v-6h-6"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function RotateCcwIcon({ size = 18, color = '#E11D48' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 3v5h5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ============================================================================
// CODE, TOPIC & LEARNING ICONS
// ============================================================================
export function CodeBracketsIcon({ size = 16, color = '#2554E8', strokeWidth = 2.2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 7l-5 5 5 5M16 7l5 5-5 5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CodeSlashIcon({ size = 13, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 8L4 12L8 16M16 8L20 12L16 16M13.5 6L10.5 18"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LevelBarsIcon({
  size = 12,
  activeBars = 2,
  activeColor = '#FACC15',
  inactiveColor = 'rgba(255,255,255,0.35)',
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Rect
        x="2"
        y="9"
        width="2.5"
        height="5"
        rx="1"
        fill={activeBars >= 1 ? activeColor : inactiveColor}
      />
      <Rect
        x="6.5"
        y="6"
        width="2.5"
        height="8"
        rx="1"
        fill={activeBars >= 2 ? activeColor : inactiveColor}
      />
      <Rect
        x="11"
        y="3"
        width="2.5"
        height="11"
        rx="1"
        fill={activeBars >= 3 ? activeColor : inactiveColor}
      />
    </Svg>
  );
}

export function FlipArrowsIcon({ size = 16, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 2l4 4-4 4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 13v2a4 4 0 01-4 4H3"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SwapHorizontalIcon({ size = 20, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 10h11l-3-3M17 14H6l3 3"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FlashcardDeckIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="2.5"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M9 9h6M9 13h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function QuizClipboardIcon({ size = 20, color = '#7C3AED' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2.5"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M9 4.5h6M9 10h6M9 14h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ClipboardCheckIcon({ size = 16, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2.5"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M9 4h6v2.5a1 1 0 01-1 1h-4a1 1 0 01-1-1V4z"
        fill={color}
      />
      <Path
        d="M9.5 13l2 2 3.5-3.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LayersIcon({ size = 20, color = '#2554E8', filledTop = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4L3 9l9 5 9-5-9-5z"
        fill={filledTop ? color : 'none'}
        stroke={color}
        strokeWidth={filledTop ? 0 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 14l9 5 9-5"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!filledTop && (
        <Path
          d="M3 18l9 4.5 9-4.5"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

export function FlameIcon({ size = 20, color = '#EA580C' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5c1.5 3.2 5.5 5.2 5.5 10.2A5.5 5.5 0 0112 18.2a5.5 5.5 0 01-5.5-5.5c0-2.4 1.3-4.6 2.8-6.2.4 1.5 1.5 2.3 2.7 2.3 0-2.4.6-4.5 0-6.3z"
        fill={color}
      />
      <Path
        d="M12 13c1 1.1 1.8 2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1.2.8-2.1 1.8-3.2z"
        fill="#FED7AA"
      />
    </Svg>
  );
}

export function TrophyIcon({ size = 14, color = '#10B981' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArchiveBoxIcon({ size = 20, color = '#2ED47A' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="5" width="16" height="4.5" rx="1.5" fill={color} />
      <Path
        d="M5.5 9.5v8A2.5 2.5 0 008 20h8a2.5 2.5 0 002.5-2.5v-8"
        fill={color}
      />
      <Path
        d="M10 14h4"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function FolderIcon({ size = 14, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CubeOutlineIcon({ size = 20, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SlidersIcon({ size = 20, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx="15" cy="7" r="2" fill={color} />
      <Circle cx="9" cy="12" r="2" fill={color} />
      <Circle cx="17" cy="17" r="2" fill={color} />
    </Svg>
  );
}

export function BulletListIcon({ size = 20, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="6" cy="7" r="1.5" fill={color} />
      <Circle cx="6" cy="12" r="1.5" fill={color} />
      <Circle cx="6" cy="17" r="1.5" fill={color} />
      <Path
        d="M10 7h9M10 12h9M10 17h9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function WavingHandIcon({ size = 15, color = '#1F2A44' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 11.5V6.5a1.5 1.5 0 013 0v4M10.5 5.5a1.5 1.5 0 013 0v5M13.5 6.5a1.5 1.5 0 013 0v5.5M16.5 9.5a1.5 1.5 0 013 0v4.5a6 6 0 01-6 6h-2a6 6 0 01-5.2-3l-2.1-3.6a1.5 1.5 0 012.6-1.5l.7 1.1"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 5.5c.5-1.2 1.5-2 2.8-2.3M19.5 4.2c1.1.5 1.9 1.5 2.2 2.7"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MiniRobotNodeIcon({ size = 24, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx="12" cy="2.5" r="1.5" fill={color} />
      <Rect
        x="4"
        y="6"
        width="16"
        height="13"
        rx="4"
        stroke={color}
        strokeWidth={2}
      />
      <Circle cx="9" cy="11.5" r="1.5" fill={color} />
      <Circle cx="15" cy="11.5" r="1.5" fill={color} />
      <Path
        d="M9.5 15.5h5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M2 11v3M22 11v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function TrendUpIcon({ size = 14, color = '#7C3AED' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17l6-6 4 4 8-8M14 7h7v7"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FlashcardTileIcon({ size = 15, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="14" rx="3" fill={color} />
      <Path
        d="M7 10h10M7 14h6"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function RepeatCycleIcon({ size = 14, color = '#D97706' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 2l4 4-4 4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 13v2a4 4 0 01-4 4H3"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CardPlusBadgeIcon({ size = 16, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="14" rx="3" fill={color} />
      <Path
        d="M12 9v6M9 12h6"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ChartBarBadgeIcon({ size = 16, color = '#7C3AED' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="4" fill={color} />
      <Path
        d="M8 16v-4M12 16V8M16 16v-6"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function DocumentLinesIcon({ size = 18, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6M9 13h6M9 17h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ============================================================================
// AUTH, PROFILE & SETTINGS ICONS
// ============================================================================
export function UserIcon({ size = 17, color = '#94A3B8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.8} />
      <Path
        d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MailIcon({ size = 17, color = '#94A3B8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M3.5 7l8.5 6 8.5-6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function EyeIcon({ size = 18, color = '#94A3B8', visible = false }) {
  if (visible) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.8} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0112 20c-6.4 0-10-8-10-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c6.4 0 10 8 10 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1l22 22"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function GraduationCapIcon({
  size = 18,
  color = '#7C3AED',
  filled = false,
}) {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 3L2 8l10 5 10-5-10-5z" fill={color} />
        <Path
          d="M6 10.5v4.5c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.5"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4L2 9l10 5 10-5-10-5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 11.5v4.5c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.5M22 9v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoCircleIcon({ size = 18, color = '#D97706' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      <Path
        d="M12 16v-4M12 8h.01"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SmartphoneIcon({ size = 18, color = '#10B981' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="7"
        y="3"
        width="10"
        height="18"
        rx="2.5"
        stroke={color}
        strokeWidth={2}
      />
      <Circle cx="12" cy="17.5" r="1" fill={color} />
    </Svg>
  );
}

export function SmallGearIcon({ size = 14, color = '#64748B' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
      <Path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SmallBookIcon({ size = 13, color = '#92400E' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 21.5v-16z"
        fill="#CBD5E1"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

export function OpenBookOutlineIcon({ size = 13, color = '#60A5FA' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.5C12 5.4 10.9 4.5 9.5 4.5H4C2.9 4.5 2 5.4 2 6.5V16C2 17.1 2.9 18 4 18H10.5C11.3 18 12 18.7 12 19.5M12 6.5C12 5.4 13.1 4.5 14.5 4.5H20C21.1 4.5 22 5.4 22 6.5V16C22 17.1 21.1 18 20 18H13.5C12.7 18 12 18.7 12 19.5M12 6.5V19.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BookmarkFilledIcon({ size = 12, color = '#2554E8' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
        fill={color}
      />
    </Svg>
  );
}

export function LightbulbIcon({ size = 15, color = '#D97706', style }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M9 18h6M10 21h4M12 3a6 6 0 00-3.8 10.6c.5.4.8 1 .8 1.7V16h6v-.7c0-.7.3-1.3.8-1.7A6 6 0 0012 3z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LinkChainIcon({ size = 12, color = '#E11D48' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TargetBullseyeIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={2} />
      <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={2} />
      <Circle cx="12" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

export function StarOutlineIcon({ size = 16, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FaceEmojiIcon({ type, selected }) {
  if (type === 'sulit') {
    return (
      <View
        style={[
          emojiStyles.outerCircle,
          {
            backgroundColor: selected
              ? 'rgba(255,255,255,0.22)'
              : '#FFE4E6',
          },
        ]}
      >
        <View style={[emojiStyles.innerCircle, { backgroundColor: '#FDA4AF' }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="9" cy="10" r="1.5" fill="#9F1239" />
            <Circle cx="15" cy="10" r="1.5" fill="#9F1239" />
            <Path
              d="M8.5 16c1-1.5 2.2-2.2 3.5-2.2s2.5.7 3.5 2.2"
              stroke="#9F1239"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>
    );
  }

  if (type === 'sedang') {
    return (
      <View
        style={[
          emojiStyles.outerCircle,
          {
            backgroundColor: selected
              ? 'rgba(255,255,255,0.22)'
              : '#FEF3C7',
          },
        ]}
      >
        <View style={[emojiStyles.innerCircle, { backgroundColor: '#FDE68A' }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="9" cy="10" r="1.5" fill="#92400E" />
            <Circle cx="15" cy="10" r="1.5" fill="#92400E" />
            <Path
              d="M9 15h6"
              stroke="#92400E"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        emojiStyles.outerCircle,
        {
          backgroundColor: selected
            ? 'rgba(255,255,255,0.22)'
            : '#D1FAE5',
        },
      ]}
    >
      <View style={[emojiStyles.innerCircle, { backgroundColor: '#A7F3D0' }]}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Circle cx="9" cy="10" r="1.5" fill="#065F46" />
          <Circle cx="15" cy="10" r="1.5" fill="#065F46" />
          <Path
            d="M8.5 13.8c.9 1.6 2.1 2.4 3.5 2.4s2.6-.8 3.5-2.4"
            stroke="#065F46"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
}

const emojiStyles = StyleSheet.create({
  outerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  innerCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ============================================================================
// BOTTOM TAB BAR ICONS (Belajar, Progres, Pengaturan)
// ============================================================================
export function BelajarTabIcon({ focused }) {
  const color = focused ? '#2554E8' : '#7C8BA1';
  if (focused) {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2 6.5C2 5.4 2.9 4.5 4 4.5H9.5C10.9 4.5 12 5.6 12 7V19.5C12 18.7 11.3 18 10.5 18H4C2.9 18 2 17.1 2 16V6.5Z"
          fill={color}
        />
        <Path
          d="M22 6.5C22 5.4 21.1 4.5 20 4.5H14.5C13.1 4.5 12 5.6 12 7V19.5C12 18.7 12.7 18 13.5 18H20C21.1 18 22 17.1 22 16V6.5Z"
          stroke={color}
          strokeWidth={1.8}
          fill="#DCE7FF"
        />
      </Svg>
    );
  }
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 6.5C2 5.4 2.9 4.5 4 4.5H9.5C10.9 4.5 12 5.6 12 7V19.5C12 18.7 11.3 18 10.5 18H4C2.9 18 2 17.1 2 16V6.5Z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M22 6.5C22 5.4 21.1 4.5 20 4.5H14.5C13.1 4.5 12 5.6 12 7V19.5C12 18.7 12.7 18 13.5 18H20C21.1 18 22 17.1 22 16V6.5Z"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

export function ProgresTabIcon({ focused }) {
  const color = focused ? '#2554E8' : '#7C8BA1';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="12" width="3.5" height="7" rx="1.5" fill={color} />
      <Rect x="10.25" y="6" width="3.5" height="13" rx="1.5" fill={color} />
      <Rect x="16.5" y="14" width="3.5" height="5" rx="1.5" fill={color} />
    </Svg>
  );
}

export function PengaturanTabIcon({ focused }) {
  const color = focused ? '#2554E8' : '#7C8BA1';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.8} />
      <Path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
