import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Rect, G, Ellipse } from 'react-native-svg';
import { fonts } from '../../src/constants/theme';

export function WelcomeHeroIllustration() {
  return (
    <View style={s.welcomeHeroWrapper}>
      <Svg width={280} height={190} viewBox="0 0 280 190" fill="none">
        {/* Soft Background Card / Glow */}
        <Rect width="280" height="190" rx="24" fill="#2554E8" />
        <Circle cx="140" cy="95" r="75" fill="rgba(255, 255, 255, 0.08)" />
        <Circle cx="140" cy="95" r="55" fill="rgba(255, 255, 255, 0.12)" />

        {/* Small floating sparkles and dots */}
        <Circle cx="35" cy="40" r="4" fill="#FACC15" />
        <Circle cx="245" cy="35" r="3.5" fill="#4ADE80" />
        <Circle cx="45" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
        <Circle cx="240" cy="140" r="4" fill="#F472B6" />
        <Path
          d="M55 70L57 74L61 76L57 78L55 82L53 78L49 76L53 74L55 70Z"
          fill="#FACC15"
        />

        {/* Floating Code Card Left (`x = ?`) */}
        <G transform="rotate(-10 60 100)">
          <Rect
            x="30"
            y="80"
            width="60"
            height="40"
            rx="10"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={1.2}
          />
          <Rect x="40" y="92" width="22" height="5" rx="2.5" fill="#FACC15" />
          <Rect
            x="40"
            y="102"
            width="40"
            height="4"
            rx="2"
            fill="rgba(255, 255, 255, 0.8)"
          />
        </G>

        {/* Floating Check Card Right */}
        <G transform="rotate(10 220 100)">
          <Rect
            x="190"
            y="75"
            width="55"
            height="45"
            rx="10"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={1.2}
          />
          <Circle cx="217" cy="97" r="11" fill="#2ED47A" />
          <Path
            d="M212.5 97L215.8 100.3L222 94"
            stroke="#FFFFFF"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>

        {/* Robot Antenna */}
        <Rect x="138.5" y="28" width="3" height="12" rx="1.5" fill="#94A3B8" />
        <Circle cx="140" cy="25" r="8" fill="rgba(250, 204, 21, 0.3)" />
        <Circle cx="140" cy="25" r="5.5" fill="#FACC15" />

        {/* Robot Ears */}
        <Circle cx="88" cy="92" r="9" fill="#FFFFFF" />
        <Circle cx="192" cy="92" r="9" fill="#FFFFFF" />

        {/* Robot Body */}
        <Rect x="110" y="112" width="60" height="42" rx="16" fill="#E2E8F0" />
        <Rect x="110" y="108" width="60" height="40" rx="16" fill="#FFFFFF" />
        <Rect x="123" y="122" width="34" height="14" rx="7" fill="#2554E8" />
        <Path
          d="M132 126L129.5 128.5L132 131M148 126L150.5 128.5L148 131M143 125.5L141 131.5"
          stroke="#FFFFFF"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Robot Head Outer */}
        <Rect
          x="94"
          y="42"
          width="92"
          height="70"
          rx="24"
          fill="#FFFFFF"
          stroke="#C7D7FE"
          strokeWidth={2}
        />

        {/* Robot Screen (Dark Face) */}
        <Rect x="104" y="52" width="72" height="50" rx="16" fill="#0F172A" />

        {/* Robot Eyes (Happy cyan eyes) */}
        <Path
          d="M116 74C118 69 126 69 128 74"
          stroke="#38BDF8"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <Path
          d="M152 74C154 69 162 69 164 74"
          stroke="#38BDF8"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* Robot Smile */}
        <Path
          d="M136 86C138 88.5 142 88.5 144 86"
          stroke="#38BDF8"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

// ============================================================================
// 1. PLACEMENT RESULT BANNER ILLUSTRATION (FlipCode - 05)
// ============================================================================
export function ResultBannerIllustration() {
  return (
    <Svg width={260} height={150} viewBox="0 0 260 150" fill="none">
      {/* Background Concentric Rings */}
      <Circle cx="130" cy="82" r="64" fill="rgba(255, 255, 255, 0.08)" />
      <Circle cx="130" cy="82" r="46" fill="rgba(255, 255, 255, 0.12)" />

      {/* Confetti / Floating Dots */}
      <Circle cx="36" cy="36" r="4" fill="#FACC15" />
      <Circle cx="222" cy="30" r="3" fill="#4ADE80" />
      <Circle cx="48" cy="116" r="2.5" fill="rgba(255,255,255,0.5)" />
      <Circle cx="216" cy="112" r="3.5" fill="#F472B6" />

      {/* Small 4-point Sparkle Left */}
      <Path
        d="M64 46L66 51L71 53L66 55L64 60L62 55L57 53L62 51L64 46Z"
        fill="#FACC15"
      />

      {/* Left Floating Card (`x = 5`) */}
      <G transform="rotate(-12 52 84)">
        <Rect
          x="22"
          y="64"
          width="58"
          height="38"
          rx="10"
          fill="rgba(255, 255, 255, 0.18)"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth={1.2}
        />
        <Rect
          x="32"
          y="76"
          width="24"
          height="5"
          rx="2.5"
          fill="#FACC15"
        />
        <Rect
          x="32"
          y="86"
          width="36"
          height="4"
          rx="2"
          fill="rgba(255, 255, 255, 0.7)"
        />
      </G>

      {/* Right Floating Card (Checkmark) */}
      <G transform="rotate(12 208 82)">
        <Rect
          x="182"
          y="60"
          width="52"
          height="42"
          rx="10"
          fill="rgba(255, 255, 255, 0.18)"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth={1.2}
        />
        <Circle cx="208" cy="81" r="11" fill="#2ED47A" />
        <Path
          d="M203.5 81L206.8 84.3L213 78"
          stroke="#FFFFFF"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* Robot Antenna */}
      <Rect x="128.5" y="20" width="3" height="10" rx="1.5" fill="#94A3B8" />
      <Circle cx="130" cy="18" r="7.5" fill="rgba(250, 204, 21, 0.3)" />
      <Circle cx="130" cy="18" r="5" fill="#FACC15" />

      {/* Robot Side Ears / Hands */}
      <Circle cx="84" cy="76" r="8" fill="#FFFFFF" />
      <Circle cx="176" cy="76" r="9" fill="#FACC15" />
      <Path
        d="M173 76C174.5 74 177.5 74 179 76"
        stroke="#CA8A04"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Robot Lower Body */}
      <Rect x="103" y="96" width="54" height="36" rx="14" fill="#E2E8F0" />
      <Rect x="103" y="93" width="54" height="34" rx="14" fill="#FFFFFF" />
      <Rect x="115" y="105" width="30" height="12" rx="6" fill="#2554E8" />
      <Path
        d="M124 109L121.5 111L124 113M136 109L138.5 111L136 113M131 108.5L129 113.5"
        stroke="#FFFFFF"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Robot Head Outer Frame */}
      <Rect
        x="91"
        y="32"
        width="78"
        height="60"
        rx="19"
        fill="#334155"
        stroke="#475569"
        strokeWidth={1.5}
      />
      {/* Robot Face Screen */}
      <Rect x="97" y="38" width="66" height="48" rx="14" fill="#0F172A" />

      {/* Glowing Cyan Left Eye */}
      <Circle cx="116" cy="60" r="10.5" fill="rgba(56, 189, 248, 0.22)" />
      <Circle cx="116" cy="60" r="7.5" fill="#38BDF8" />
      <Circle cx="116" cy="60" r="4.2" fill="#A5F3FC" />

      {/* Glowing Cyan Right Eye */}
      <Circle cx="144" cy="60" r="10.5" fill="rgba(56, 189, 248, 0.22)" />
      <Circle cx="144" cy="60" r="7.5" fill="#38BDF8" />
      <Circle cx="144" cy="60" r="4.2" fill="#A5F3FC" />

      {/* Happy Smile */}
      <Path
        d="M125 73C127 76 133 76 135 73"
        stroke="#38BDF8"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Pink Cheek Blushes */}
      <Circle cx="104" cy="74" r="2.5" fill="#F472B6" opacity={0.85} />
      <Circle cx="156" cy="74" r="2.5" fill="#F472B6" opacity={0.85} />
    </Svg>
  );
}

// ============================================================================
// 2. HOME SCREEN HERO ROBOT & PATH CONNECTOR (FlipCode - 06 & 24)
// ============================================================================
export function HeroRobotIllustration({ badgeColor = '#2554E8' }) {
  return (
    <Svg width={132} height={134} viewBox="0 0 132 134" fill="none">
      <Circle cx="74" cy="68" r="56" fill="rgba(255, 255, 255, 0.08)" />
      <Circle cx="74" cy="68" r="42" fill="rgba(255, 255, 255, 0.12)" />

      <Circle cx="42" cy="30" r="2" fill="rgba(255, 255, 255, 0.45)" />
      <Circle cx="104" cy="34" r="2.2" fill="rgba(255, 255, 255, 0.35)" />
      <Circle cx="36" cy="96" r="2.5" fill="rgba(255, 255, 255, 0.3)" />
      <Circle cx="110" cy="92" r="2" fill="rgba(255, 255, 255, 0.3)" />

      <Circle cx="72" cy="18" r="7" fill="rgba(250, 204, 21, 0.25)" />
      <Circle cx="72" cy="18" r="4.5" fill="#FACC15" />
      <Rect x="70.8" y="22" width="2.4" height="6" rx="1.2" fill="#94A3B8" />

      <Circle cx="30" cy="66" r="7.5" fill="#FFFFFF" />
      <Circle cx="114" cy="68" r="8.5" fill="#FACC15" />
      <Path
        d="M111 68c1.5-2 3.5-2 5 0"
        stroke="#CA8A04"
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      <Rect x="48" y="83" width="48" height="34" rx="12" fill="#E2E8F0" />
      <Rect x="48" y="80" width="48" height="33" rx="12" fill="#FFFFFF" />
      <Rect x="58" y="92" width="28" height="11" rx="5.5" fill={badgeColor} />
      <Path
        d="M66.5 95.5L64 97.5L66.5 99.5M77.5 95.5L80 97.5L77.5 99.5M73.2 95L70.8 100"
        stroke="#FFFFFF"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Rect
        x="37"
        y="30"
        width="70"
        height="54"
        rx="17"
        fill="#334155"
        stroke="#475569"
        strokeWidth={1.5}
      />
      <Rect x="42" y="35" width="60" height="44" rx="13" fill="#0F172A" />

      <Circle cx="60" cy="56" r="9.5" fill="rgba(56, 189, 248, 0.22)" />
      <Circle cx="60" cy="56" r="6.8" fill="#38BDF8" />
      <Circle cx="60" cy="56" r="4" fill="#A5F3FC" />

      <Circle cx="84" cy="56" r="9.5" fill="rgba(56, 189, 248, 0.22)" />
      <Circle cx="84" cy="56" r="6.8" fill="#38BDF8" />
      <Circle cx="84" cy="56" r="4" fill="#A5F3FC" />

      <Circle cx="48" cy="71" r="2.2" fill="#F472B6" opacity={0.85} />
      <Circle cx="96" cy="71" r="2.2" fill="#F472B6" opacity={0.85} />
    </Svg>
  );
}

export function CurvedConnector({ fromRight = false, active = false }) {
  const color = active ? '#2ED47A' : '#CBD5E1';
  const d = fromRight
    ? 'M 235 2 C 235 24, 95 16, 95 40'
    : 'M 95 2 C 95 24, 235 16, 235 40';

  return (
    <View style={s.connectorWrap} pointerEvents="none">
      <Svg width="100%" height={42} viewBox="0 0 330 42" fill="none">
        <Path
          d={d}
          stroke={color}
          strokeWidth={2.4}
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

// ============================================================================
// 3. TOPIC DETAIL CIRCULAR PROGRESS RING (FlipCode - 07 & 23)
// ============================================================================
export function CircularProgress({ percentage = 30 }) {
  const size = 54;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={s.ringContainer}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {percentage > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2554E8"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}
      </Svg>
      <Text style={s.ringText}>{percentage}%</Text>
    </View>
  );
}

// ============================================================================
// 4. FLASHCARD REVIEW & SESSION COMPLETED ILLUSTRATIONS (FlipCode - 11 & 12)
// ============================================================================
export function ReviewBannerRobot() {
  return (
    <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <Ellipse cx="38" cy="65" rx="18" ry="3.5" fill="rgba(30, 41, 59, 0.18)" />
      <Rect x="36.5" y="6" width="3" height="6" rx="1.5" fill="#3B82F6" />
      <Path
        d="M21 38C15 35 14 29 17 26"
        stroke="#2563EB"
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <Path
        d="M54 40C59 42 61 46 59 49"
        stroke="#2563EB"
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <Rect x="25" y="38" width="26" height="23" rx="12" fill="#2563EB" />
      <Ellipse cx="38" cy="46" rx="8" ry="6" fill="#60A5FA" opacity={0.45} />
      <Rect x="19" y="11" width="38" height="28" rx="11" fill="#3B82F6" />
      <Rect x="15" y="18" width="5" height="13" rx="2.5" fill="#E2E8F0" />
      <Rect x="56" y="18" width="5" height="13" rx="2.5" fill="#E2E8F0" />
      <Rect x="23" y="15" width="30" height="20" rx="7" fill="#0F172A" />
      <Circle cx="32" cy="24" r="3.5" fill="#38BDF8" />
      <Circle cx="44" cy="24" r="3.5" fill="#38BDF8" />
      <Path
        d="M35.5 29c1 1.2 4 1.2 5 0"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CompletedHeroIllustration() {
  return (
    <Svg width={260} height={190} viewBox="0 0 260 190" fill="none">
      <Rect
        x="26"
        y="36"
        width="12"
        height="5"
        rx="2.5"
        transform="rotate(-35 26 36)"
        fill="#10B981"
      />
      <Circle cx="232" cy="46" r="3.5" fill="#EC4899" />

      <G transform="rotate(-16 68 88)">
        <Rect
          x="36"
          y="38"
          width="64"
          height="94"
          rx="12"
          fill="#7C3AED"
          opacity={0.9}
        />
        <Circle cx="68" cy="85" r="14" fill="rgba(255, 255, 255, 0.22)" />
      </G>

      <G transform="rotate(16 192 88)">
        <Rect x="160" y="38" width="64" height="94" rx="12" fill="#F5B82E" />
        <Path
          d="M184 85l5.5 5.5L201 79"
          stroke="#FFFFFF"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      <G transform="translate(0, 6)">
        <Ellipse cx="130" cy="162" rx="34" ry="7" fill="rgba(15, 23, 42, 0.28)" />
        <Rect x="127.5" y="18" width="5" height="12" rx="2.5" fill="#FACC15" />
        <Circle cx="130" cy="16" r="5" fill="#FACC15" />
        <Rect x="102" y="106" width="56" height="50" rx="20" fill="#1D4ED8" />
        <Rect x="106" y="106" width="48" height="44" rx="18" fill="#3B82F6" />
        <Rect
          x="86"
          y="30"
          width="88"
          height="76"
          rx="24"
          fill="#3B82F6"
          stroke="#60A5FA"
          strokeWidth={2}
        />
        <Rect x="77" y="50" width="11" height="36" rx="5.5" fill="#F1F5F9" />
        <Rect x="172" y="50" width="11" height="36" rx="5.5" fill="#F1F5F9" />
        <Rect x="96" y="42" width="68" height="52" rx="16" fill="#0F172A" />
        <Path
          d="M110 65c2.5-4 7.5-4 10 0"
          stroke="#38BDF8"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <Path
          d="M140 65c2.5-4 7.5-4 10 0"
          stroke="#38BDF8"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <Path
          d="M124 77c2 3 10 3 12 0"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <G transform="rotate(-32 90 106)">
          <Rect
            x="72"
            y="84"
            width="18"
            height="38"
            rx="9"
            fill="#3B82F6"
            stroke="#60A5FA"
            strokeWidth={2}
          />
        </G>
        <G transform="rotate(32 170 106)">
          <Rect
            x="170"
            y="84"
            width="18"
            height="38"
            rx="9"
            fill="#3B82F6"
            stroke="#60A5FA"
            strokeWidth={2}
          />
        </G>
      </G>
    </Svg>
  );
}

// ============================================================================
// 5. QUIZ SCREEN ROBOTS & RESULT MASCOT (FlipCode - 13 to 20)
// ============================================================================
export function QuizBannerRobot() {
  return (
    <Svg width={86} height={86} viewBox="0 0 86 86" fill="none">
      <Rect x="41.5" y="10" width="3" height="8" fill="#FACC15" />
      <Circle cx="43" cy="8" r="4.5" fill="#FACC15" />
      <Rect x="10" y="34" width="9" height="22" rx="4.5" fill="#F59E0B" />
      <Rect x="67" y="34" width="9" height="22" rx="4.5" fill="#F59E0B" />
      <Rect x="16" y="18" width="54" height="50" rx="16" fill="#2554E8" />
      <Rect x="23" y="27" width="40" height="30" rx="10" fill="#0F172A" />
      <Circle cx="35" cy="42" r="5" fill="#38BDF8" />
      <Circle cx="35" cy="42" r="2.5" fill="#A5F3FC" />
      <Circle cx="51" cy="42" r="5" fill="#38BDF8" />
      <Circle cx="51" cy="42" r="2.5" fill="#A5F3FC" />
      <Circle cx="27" cy="51" r="2" fill="#F43F5E" opacity={0.8} />
      <Circle cx="59" cy="51" r="2" fill="#F43F5E" opacity={0.8} />
      <Circle cx="26" cy="73" r="7.5" fill="#2554E8" />
      <Circle cx="60" cy="73" r="7.5" fill="#2554E8" />
    </Svg>
  );
}

export function MiniFeedbackRobot({ happy = true }) {
  return (
    <Svg width={44} height={44} viewBox="0 0 48 48" fill="none">
      <Rect x="22.5" y="4" width="3" height="6" fill="#FACC15" />
      <Circle cx="24" cy="4" r="3" fill="#FACC15" />
      <Path
        d={happy ? 'M8 26c-3-2-4-6-2-8' : 'M8 26c-3 2-4 5-2 7'}
        stroke="#2554E8"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d={happy ? 'M40 26c3-2 4-6 2-8' : 'M40 26c3 2 4 5 2 7'}
        stroke="#2554E8"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Rect x="14" y="31" width="20" height="13" rx="6" fill="#1D4ED8" />
      <Rect x="10" y="10" width="28" height="23" rx="8" fill="#2554E8" />
      <Rect x="14" y="14" width="20" height="15" rx="5" fill="#0F172A" />
      <Circle cx="20" cy="21" r="2.2" fill="#38BDF8" />
      <Circle cx="28" cy="21" r="2.2" fill="#38BDF8" />
      <Path
        d={happy ? 'M21 25.5c1.2 1.2 4.8 1.2 6 0' : 'M21 26h6'}
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function QuizResultMascot({ mode = 'up' }) {
  return (
    <Svg width={150} height={155} viewBox="0 0 150 155" fill="none">
      <Ellipse
        cx="75"
        cy="138"
        rx="32"
        ry="10"
        fill={
          mode === 'up'
            ? 'rgba(15, 23, 42, 0.24)'
            : 'rgba(99, 102, 241, 0.22)'
        }
      />
      <Rect x="73.5" y="14" width="3" height="10" fill="#94A3B8" />
      <Circle
        cx="75"
        cy="12"
        r="5.5"
        fill="#FACC15"
        stroke={mode === 'up' ? '#FFFFFF' : '#EAB308'}
        strokeWidth={1.8}
      />
      <Path
        d="M42 72C31 66 26 55 30 48"
        stroke="#2563EB"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <Circle
        cx="29"
        cy="47"
        r="5.5"
        fill="#3B82F6"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <Path
        d="M108 72C119 66 124 55 120 48"
        stroke="#2563EB"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <Circle
        cx="121"
        cy="47"
        r="5.5"
        fill="#3B82F6"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <Ellipse cx="61" cy="126" rx="10" ry="6" fill="#1E40AF" />
      <Ellipse cx="89" cy="126" rx="10" ry="6" fill="#1E40AF" />
      <Rect x="52" y="86" width="46" height="38" rx="18" fill="#1D4ED8" />
      <Circle
        cx="75"
        cy="104"
        r="6"
        fill="#10B981"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <Rect
        x="38"
        y="25"
        width="74"
        height="64"
        rx="22"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth={1.8}
      />
      <Rect x="47" y="34" width="56" height="44" rx="14" fill="#0F172A" />
      <Path
        d="M57 52c2.5-4.5 7.5-4.5 10 0"
        stroke="#38BDF8"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M83 52c2.5-4.5 7.5-4.5 10 0"
        stroke="#38BDF8"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M71 62c1.5 2.5 6.5 2.5 8 0"
        stroke="#FB7185"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <Circle cx="54" cy="63" r="2.5" fill="#FB7185" opacity={0.85} />
      <Circle cx="96" cy="63" r="2.5" fill="#FB7185" opacity={0.85} />
    </Svg>
  );
}

export function ScoreBadgeRing({ score, total = 5, mode, onPress }) {
  const size = 66;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = mode === 'down' ? 100 : (score / total) * 100;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const ringColor =
    mode === 'up' ? '#10B981' : mode === 'same' ? '#F59E0B' : '#EF4444';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={s.scoreBadgeOuter}
      accessibilityLabel="Ketuk untuk melihat variasi hasil kuis"
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
          fill="#FFFFFF"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={s.scoreBadgeTextWrap}>
        <Text style={[s.scoreBadgeMainText, { color: ringColor }]}>
          {score}/{total}
        </Text>
        <Text style={s.scoreBadgeSubText}>BENAR</Text>
      </View>
    </TouchableOpacity>
  );
}

// ============================================================================
// 6. TOPIC COMPLETED & UPDATED LEARNING PATH (FlipCode - 21 & 22)
// ============================================================================
export function TopicCompletedIllustration() {
  return (
    <Svg width={270} height={195} viewBox="0 0 270 195" fill="none">
      <Path
        d="M225 14l-7 7 7 7"
        stroke="#FACC15"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="246" cy="28" r="3.5" fill="#FFFFFF" />
      <Path
        d="M230 50l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L230 50z"
        fill="#FACC15"
      />
      <Path
        d="M46 144l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L46 144z"
        fill="rgba(255, 255, 255, 0.55)"
      />

      <G transform="rotate(-16 74 94)">
        <Rect
          x="42"
          y="44"
          width="64"
          height="94"
          rx="12"
          fill="#7C3AED"
          opacity={0.92}
        />
        <Circle cx="74" cy="91" r="14" fill="rgba(255, 255, 255, 0.22)" />
      </G>

      <G transform="rotate(16 196 94)">
        <Rect x="164" y="44" width="64" height="94" rx="12" fill="#F5B82E" />
        <Path
          d="M188 91l5.5 5.5L205 85"
          stroke="#FFFFFF"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      <G transform="translate(5, 10)">
        <Ellipse
          cx="130"
          cy="162"
          rx="34"
          ry="7"
          fill="rgba(15, 23, 42, 0.28)"
        />
        <Rect x="127.5" y="18" width="5" height="12" rx="2.5" fill="#FACC15" />
        <Circle cx="130" cy="16" r="5" fill="#FACC15" />
        <Rect x="102" y="106" width="56" height="50" rx="20" fill="#1D4ED8" />
        <Rect x="106" y="106" width="48" height="44" rx="18" fill="#3B82F6" />
        <Rect
          x="86"
          y="30"
          width="88"
          height="76"
          rx="24"
          fill="#3B82F6"
          stroke="#60A5FA"
          strokeWidth={2}
        />
        <Rect x="77" y="50" width="11" height="36" rx="5.5" fill="#F1F5F9" />
        <Rect x="172" y="50" width="11" height="36" rx="5.5" fill="#F1F5F9" />
        <Rect x="96" y="42" width="68" height="52" rx="16" fill="#0F172A" />
        <Path
          d="M110 65c2.5-4 7.5-4 10 0"
          stroke="#38BDF8"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <Path
          d="M140 65c2.5-4 7.5-4 10 0"
          stroke="#38BDF8"
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        <Path
          d="M124 77c2 3 10 3 12 0"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <G transform="rotate(-32 90 106)">
          <Rect
            x="72"
            y="84"
            width="18"
            height="38"
            rx="9"
            fill="#3B82F6"
            stroke="#60A5FA"
            strokeWidth={2}
          />
        </G>
        <G transform="rotate(32 170 106)">
          <Rect
            x="170"
            y="84"
            width="18"
            height="38"
            rx="9"
            fill="#3B82F6"
            stroke="#60A5FA"
            strokeWidth={2}
          />
        </G>
      </G>
    </Svg>
  );
}

export function FlipGuideAvatar() {
  return (
    <View style={s.guideWrapper}>
      <View style={s.speechBubble}>
        <Text style={s.speechBubbleText}>✨ Ayo gas!</Text>
        <View style={s.speechBubbleTail} />
      </View>

      <View style={s.guideOuterRing}>
        <View style={s.guideInnerCircle}>
          <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
            <Rect x="26.8" y="5" width="2.4" height="6" fill="#FACC15" />
            <Circle cx="28" cy="4.5" r="3" fill="#FACC15" />
            <Rect
              x="10"
              y="12"
              width="36"
              height="28"
              rx="10"
              fill="#1E293B"
              stroke="#334155"
              strokeWidth={1.5}
            />
            <Circle cx="21" cy="25" r="4.8" fill="#38BDF8" />
            <Circle cx="21" cy="25" r="2.2" fill="#A5F3FC" />
            <Circle cx="35" cy="25" r="4.8" fill="#38BDF8" />
            <Circle cx="35" cy="25" r="2.2" fill="#A5F3FC" />
            <Path
              d="M25.5 32c1 1.2 4 1.2 5 0"
              stroke="#F472B6"
              strokeWidth={1.8}
              strokeLinecap="round"
            />
            <Rect x="18" y="41" width="20" height="12" rx="6" fill="#60A5FA" />
          </Svg>
        </View>
      </View>

      <Text style={s.guideName}>Flip</Text>
      <Text style={s.guideRole}>Pemandumu</Text>
    </View>
  );
}

export function LearningPathCurveDownRight() {
  return (
    <Svg width={240} height={46} viewBox="0 0 240 46" fill="none">
      <Path
        d="M 110 2 C 110 26, 165 20, 165 44"
        stroke="#2ED47A"
        strokeWidth={2.8}
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LearningPathTrailingCurve() {
  return (
    <Svg width={200} height={85} viewBox="0 0 200 85" fill="none">
      <Path
        d="M 135 4 C 135 40, 65 45, 60 82"
        stroke="#DCE6FF"
        strokeWidth={2.6}
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ============================================================================
// 7. PROGRESS SCREEN CHARTS & ROBOTS (FlipCode - 25 & 26)
// ============================================================================
export function DashboardRobotMascot() {
  return (
    <Svg width={98} height={96} viewBox="0 0 98 96" fill="none">
      <Circle cx="54" cy="52" r="38" fill="rgba(59, 130, 246, 0.16)" />
      <Rect x="52.5" y="10" width="3" height="9" rx="1.5" fill="#FACC15" />
      <Circle cx="54" cy="8.5" r="4.5" fill="#FACC15" />
      <Rect x="21" y="34" width="6" height="16" rx="3" fill="#60A5FA" />
      <Rect x="81" y="34" width="6" height="16" rx="3" fill="#60A5FA" />
      <Rect x="35" y="64" width="38" height="28" rx="13" fill="#2563EB" />
      <Rect
        x="43"
        y="70"
        width="22"
        height="14"
        rx="6"
        fill="rgba(255, 255, 255, 0.22)"
      />
      <Rect x="24" y="65" width="9" height="20" rx="4.5" fill="#3B82F6" />
      <Rect x="75" y="65" width="9" height="20" rx="4.5" fill="#3B82F6" />
      <Rect
        x="26"
        y="19"
        width="56"
        height="45"
        rx="16"
        fill="#3B82F6"
        stroke="#60A5FA"
        strokeWidth={1.5}
      />
      <Rect x="32" y="25" width="44" height="32" rx="11" fill="#0F172A" />
      <Circle cx="45" cy="39" r="5" fill="#38BDF8" />
      <Circle cx="43.5" cy="37.5" r="1.8" fill="#E0F2FE" />
      <Circle cx="63" cy="39" r="5" fill="#38BDF8" />
      <Circle cx="61.5" cy="37.5" r="1.8" fill="#E0F2FE" />
      <Path
        d="M50 48c1.5 2 6.5 2 8 0"
        stroke="#F472B6"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MiniTopicRing({ pct = 75, color = '#2554E8' }) {
  const size = 48;
  const strokeWidth = 4.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <View style={s.miniRingWrap}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={s.miniRingText}>{pct}%</Text>
    </View>
  );
}

export function MultiSegmentDonut({ totalPct = 47 }) {
  const size = 114;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const blueLen = circumference * 0.38;
  const amberLen = circumference * 0.14;

  return (
    <View style={s.donutWrap}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E6ECF5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          strokeDasharray={`${amberLen} ${circumference}`}
          strokeDashoffset={-blueLen}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2554E8"
          strokeWidth={strokeWidth}
          strokeDasharray={`${blueLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      <View style={s.donutCenter}>
        <Text style={s.donutBigPct}>{totalPct}%</Text>
        <Text style={s.donutSubLabel}>total</Text>
      </View>
    </View>
  );
}

export function IsometricBoxIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Path d="M20 6L34 13.5L20 21L6 13.5L20 6Z" fill="#D9A066" />
      <Path d="M6 13.5L20 21V35L6 27.5V13.5Z" fill="#B87D4B" />
      <Path d="M34 13.5L20 21V35L34 27.5V13.5Z" fill="#8F5B30" />
      <Path
        d="M13 9.7L27 17.2V22L24 23.5V18.8L10 11.2L13 9.7Z"
        fill="#FDE68A"
        opacity={0.85}
      />
    </Svg>
  );
}

// ============================================================================
// 8. SETTINGS, RESET & ABOUT ILLUSTRATIONS (FlipCode - 27 to 31)
// ============================================================================
export function SettingsHeroRobot() {
  return (
    <Svg width={92} height={92} viewBox="0 0 92 92" fill="none">
      <Circle cx="50" cy="52" r="34" fill="rgba(255, 255, 255, 0.1)" />
      <Rect x="48.5" y="10" width="3" height="9" rx="1.5" fill="#FACC15" />
      <Circle cx="50" cy="8.5" r="4.5" fill="#FACC15" />
      <Rect x="22" y="31" width="6" height="16" rx="3" fill="#E2E8F0" />
      <Rect x="72" y="31" width="6" height="16" rx="3" fill="#E2E8F0" />
      <Rect x="33" y="60" width="34" height="26" rx="12" fill="#1D4ED8" />
      <Rect x="36" y="60" width="28" height="22" rx="10" fill="#3B82F6" />
      <Circle cx="50" cy="71" r="3.5" fill="#93C5FD" />
      <Rect x="23" y="61" width="8" height="18" rx="4" fill="#3B82F6" />
      <Path
        d="M68 64c5-2 8-6 7-10"
        stroke="#3B82F6"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Rect
        x="26"
        y="19"
        width="48"
        height="41"
        rx="14"
        fill="#3B82F6"
        stroke="#60A5FA"
        strokeWidth={1.5}
      />
      <Rect x="31" y="24" width="38" height="29" rx="10" fill="#0F172A" />
      <Circle cx="42" cy="37" r="4.2" fill="#38BDF8" />
      <Circle cx="40.8" cy="35.8" r="1.5" fill="#E0F2FE" />
      <Circle cx="58" cy="37" r="4.2" fill="#38BDF8" />
      <Circle cx="56.8" cy="35.8" r="1.5" fill="#E0F2FE" />
      <Path
        d="M46.5 45c1.5 2 5.5 2 7 0"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ModalMascotRobot() {
  return (
    <Svg width={94} height={96} viewBox="0 0 94 96" fill="none">
      <Ellipse
        cx="47"
        cy="89"
        rx="24"
        ry="5"
        fill="rgba(37, 84, 232, 0.16)"
      />
      <Rect x="45.5" y="7" width="3" height="9" rx="1.5" fill="#FACC15" />
      <Circle cx="47" cy="6" r="4.8" fill="#FACC15" />
      <Rect x="16" y="29" width="6.5" height="17" rx="3.2" fill="#F1F5F9" />
      <Rect x="71.5" y="29" width="6.5" height="17" rx="3.2" fill="#F1F5F9" />
      <Rect x="29" y="59" width="36" height="28" rx="13" fill="#1D4ED8" />
      <Rect x="32" y="59" width="30" height="24" rx="11" fill="#2563EB" />
      <Rect x="21" y="61" width="9" height="19" rx="4.5" fill="#3B82F6" />
      <Rect x="64" y="61" width="9" height="19" rx="4.5" fill="#3B82F6" />
      <Ellipse cx="47" cy="60" rx="15" ry="4" fill="#93C5FD" />
      <Rect
        x="20"
        y="16"
        width="54"
        height="44"
        rx="16"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth={1.6}
      />
      <Rect x="26" y="22" width="42" height="31" rx="11" fill="#0F172A" />
      <Path
        d="M34 36c2-3.5 6-3.5 8 0"
        stroke="#38BDF8"
        strokeWidth={2.8}
        strokeLinecap="round"
      />
      <Path
        d="M52 36c2-3.5 6-3.5 8 0"
        stroke="#38BDF8"
        strokeWidth={2.8}
        strokeLinecap="round"
      />
      <Path
        d="M44 44c1.2 1.8 4.8 1.8 6 0"
        stroke="#38BDF8"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ResetModalMascotRobot() {
  return (
    <Svg width={98} height={96} viewBox="0 0 98 96" fill="none">
      <Rect x="45.5" y="9" width="3" height="9" rx="1.5" fill="#D97706" />
      <Circle
        cx="47"
        cy="7.5"
        r="5"
        fill="#FACC15"
        stroke="#D97706"
        strokeWidth={1.4}
      />
      <Rect x="16" y="34" width="6.5" height="17" rx="3.2" fill="#3B82F6" />
      <Rect x="71.5" y="34" width="6.5" height="17" rx="3.2" fill="#3B82F6" />
      <Rect x="32" y="61" width="11" height="13" rx="5.5" fill="#2563EB" />
      <Rect x="51" y="61" width="11" height="13" rx="5.5" fill="#2563EB" />
      <Rect
        x="20"
        y="20"
        width="54"
        height="45"
        rx="16"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth={1.6}
      />
      <Rect x="26" y="26" width="42" height="32" rx="11" fill="#0F172A" />
      <Circle cx="38" cy="40" r="4.5" fill="#38BDF8" />
      <Circle cx="36.8" cy="38.8" r="1.5" fill="#E0F2FE" />
      <Circle cx="56" cy="40" r="4.5" fill="#38BDF8" />
      <Circle cx="54.8" cy="38.8" r="1.5" fill="#E0F2FE" />
      <Path
        d="M44 49c1.2 1.5 4.8 1.5 6 0"
        stroke="#38BDF8"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle
        cx="65"
        cy="72"
        r="12"
        fill="#F26B50"
        stroke="#FFFFFF"
        strokeWidth={2.5}
      />
      <Path
        d="M65 65.5L70.5 75H59.5L65 65.5Z"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M65 69.5v2.5M65 73.6h.01"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ResetCompletedHeroIllustration() {
  return (
    <View style={s.resetIllustContainer}>
      <View style={s.resetBigCircleBg}>
        <Svg width={210} height={210} viewBox="0 0 210 210" fill="none">
          <Circle cx="105" cy="108" r="76" fill="rgba(255, 255, 255, 0.35)" />
          <Path
            d="M158 32l2.2 5.3 5.3 2.2-5.3 2.2-2.2 5.3-2.2-5.3-5.3-2.2 5.3-2.2L158 32z"
            fill="#F59E0B"
          />
          <Path
            d="M175 148v7M171.5 151.5h7"
            stroke="#F43F5E"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Ellipse
            cx="105"
            cy="170"
            rx="28"
            ry="6"
            fill="rgba(37, 84, 232, 0.14)"
          />
          <Rect x="103.5" y="45" width="3" height="10" rx="1.5" fill="#D97706" />
          <Circle
            cx="105"
            cy="43"
            r="5.5"
            fill="#FACC15"
            stroke="#D97706"
            strokeWidth={1.5}
          />
          <Rect x="62" y="75" width="7" height="20" rx="3.5" fill="#93C5FD" />
          <Rect x="141" y="75" width="7" height="20" rx="3.5" fill="#93C5FD" />
          <G transform="rotate(22 72 126)">
            <Rect x="58" y="118" width="14" height="28" rx="7" fill="#2563EB" />
          </G>
          <G transform="rotate(-22 138 126)">
            <Rect x="138" y="118" width="14" height="28" rx="7" fill="#2563EB" />
          </G>
          <Rect x="84" y="148" width="14" height="16" rx="7" fill="#1D4ED8" />
          <Rect x="112" y="148" width="14" height="16" rx="7" fill="#1D4ED8" />
          <Rect
            x="76"
            y="113"
            width="58"
            height="42"
            rx="16"
            fill="#2563EB"
            stroke="#60A5FA"
            strokeWidth={1.5}
          />
          <Circle
            cx="105"
            cy="133"
            r="6"
            fill="#38BDF8"
            stroke="#E0F2FE"
            strokeWidth={2}
          />
          <Rect
            x="67"
            y="56"
            width="76"
            height="58"
            rx="20"
            fill="#2563EB"
            stroke="#60A5FA"
            strokeWidth={1.8}
          />
          <Rect x="75" y="64" width="60" height="42" rx="14" fill="#0F172A" />
          <Circle cx="92" cy="83" r="6.5" fill="#38BDF8" />
          <Circle cx="90" cy="81" r="2.2" fill="#E0F2FE" />
          <Circle cx="118" cy="83" r="6.5" fill="#38BDF8" />
          <Circle cx="116" cy="81" r="2.2" fill="#E0F2FE" />
          <Path
            d="M100 94c2 2.5 8 2.5 10 0"
            stroke="#38BDF8"
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </Svg>
      </View>

      <View style={s.pillMulai}>
        <Text style={s.pillMulaiText}>mulai()</Text>
      </View>

      <View style={s.pillLevel}>
        <Text style={s.pillLevelText}>level = 0</Text>
      </View>

      <View style={s.pillTrue}>
        <Text style={s.pillTrueText}>True</Text>
      </View>
    </View>
  );
}

export function AboutHeroRobotIllustration() {
  return (
    <Svg width={116} height={122} viewBox="0 0 116 122" fill="none">
      <Ellipse
        cx="62"
        cy="112"
        rx="28"
        ry="5.5"
        fill="rgba(15, 23, 42, 0.25)"
      />
      <Rect x="60.5" y="12" width="3" height="10" rx="1.5" fill="#D97706" />
      <Circle
        cx="62"
        cy="10"
        r="5.5"
        fill="#FACC15"
        stroke="#D97706"
        strokeWidth={1.5}
      />
      <Rect x="23" y="42" width="7" height="19" rx="3.5" fill="#3B82F6" />
      <Rect x="94" y="42" width="7" height="19" rx="3.5" fill="#3B82F6" />
      <Rect
        x="38"
        y="76"
        width="48"
        height="34"
        rx="14"
        fill="#1D4ED8"
        stroke="#3B82F6"
        strokeWidth={1.5}
      />
      <Circle cx="62" cy="91" r="4.5" fill="#38BDF8" />
      <Rect x="29" y="78" width="10" height="22" rx="5" fill="#2563EB" />
      <Path
        d="M86 84c7-3 10-10 8-17"
        stroke="#3B82F6"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <Rect
        x="28"
        y="24"
        width="68"
        height="54"
        rx="19"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth={1.8}
      />
      <Rect x="36" y="32" width="52" height="38" rx="13" fill="#0F172A" />
      <Circle cx="50" cy="49" r="6" fill="#38BDF8" />
      <Circle cx="48.2" cy="47.2" r="2" fill="#E0F2FE" />
      <Circle cx="74" cy="49" r="6" fill="#38BDF8" />
      <Circle cx="72.2" cy="47.2" r="2" fill="#E0F2FE" />
      <Path
        d="M57 59c2 2.4 8 2.4 10 0"
        stroke="#38BDF8"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ============================================================================
// 9. AUTHENTICATION HERO ILLUSTRATIONS (FlipCode - 32 & 33)
// ============================================================================
export function RegisterHeroRobot() {
  return (
    <Svg width={100} height={106} viewBox="0 0 100 106" fill="none">
      <Circle cx="52" cy="56" r="40" fill="rgba(255, 255, 255, 0.1)" />
      <Ellipse
        cx="52"
        cy="96"
        rx="24"
        ry="5"
        fill="rgba(15, 23, 42, 0.24)"
      />
      <Rect x="50.5" y="13" width="3" height="9" rx="1.5" fill="#D97706" />
      <Circle
        cx="52"
        cy="11"
        r="5"
        fill="#FACC15"
        stroke="#D97706"
        strokeWidth={1.4}
      />
      <Rect x="20" y="39" width="6" height="16" rx="3" fill="#60A5FA" />
      <Rect x="78" y="39" width="6" height="16" rx="3" fill="#60A5FA" />
      <Rect
        x="33"
        y="68"
        width="38"
        height="26"
        rx="12"
        fill="#1D4ED8"
        stroke="#3B82F6"
        strokeWidth={1.4}
      />
      <Rect x="24" y="69" width="9" height="18" rx="4.5" fill="#2563EB" />
      <Circle cx="82" cy="63" r="4.5" fill="#FFFFFF" />
      <Rect
        x="24"
        y="24"
        width="56"
        height="45"
        rx="16"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth={1.6}
      />
      <Rect x="30" y="30" width="44" height="33" rx="11" fill="#0F172A" />
      <Circle cx="42" cy="44" r="5" fill="#38BDF8" />
      <Circle cx="40.5" cy="42.5" r="1.6" fill="#E0F2FE" />
      <Circle cx="62" cy="44" r="5" fill="#38BDF8" />
      <Circle cx="60.5" cy="42.5" r="1.6" fill="#E0F2FE" />
      <Path
        d="M48 53c1.5 2 6.5 2 8 0"
        stroke="#38BDF8"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LoginHeroIllustration() {
  return (
    <View style={s.loginHeroIllustWrap}>
      <View style={s.loginFloatingLeftCol}>
        <View style={s.loginPillBraces}>
          <Text style={s.loginPillBracesText}>{'{ }'}</Text>
        </View>

        <View style={s.loginStarWrap}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
              fill="#FACC15"
            />
          </Svg>
        </View>

        <View style={s.loginPillYellow}>
          <Text style={s.loginPillYellowText}>login()</Text>
        </View>

        <View style={s.loginPillGreen}>
          <Text style={s.loginPillGreenText}>true</Text>
        </View>
      </View>

      <View style={s.loginRobotRightWrap}>
        <Svg width={180} height={195} viewBox="0 0 180 195" fill="none">
          <Circle cx="100" cy="108" r="68" fill="rgba(96, 165, 250, 0.16)" />
          <Rect x="96" y="18" width="4" height="14" rx="2" fill="#93C5FD" />
          <Circle cx="98" cy="14" r="6.5" fill="#FACC15" />
          <Rect x="28" y="64" width="10" height="28" rx="5" fill="#60A5FA" />
          <Rect x="158" y="64" width="10" height="28" rx="5" fill="#60A5FA" />
          <Rect
            x="55"
            y="124"
            width="86"
            height="68"
            rx="22"
            fill="#2563EB"
            stroke="#60A5FA"
            strokeWidth={1.5}
          />
          <Rect x="83" y="144" width="30" height="24" rx="8" fill="#1E3A8A" />
          <Circle cx="98" cy="156" r="6" fill="#38BDF8" />
          <G transform="rotate(18 52 140)">
            <Rect
              x="34"
              y="122"
              width="24"
              height="48"
              rx="12"
              fill="#3B82F6"
              stroke="#93C5FD"
              strokeWidth={1.2}
            />
          </G>
          <G transform="rotate(-18 142 136)">
            <Rect
              x="136"
              y="112"
              width="24"
              height="48"
              rx="12"
              fill="#3B82F6"
              stroke="#93C5FD"
              strokeWidth={1.2}
            />
            <Circle cx="148" cy="116" r="9" fill="#93C5FD" opacity={0.55} />
          </G>
          <Rect x="36" y="32" width="124" height="90" rx="28" fill="#60A5FA" />
          <Rect x="40" y="35" width="116" height="84" rx="25" fill="#3B82F6" />
          <Rect x="50" y="45" width="96" height="64" rx="18" fill="#09152B" />
          <Rect x="73" y="65" width="14" height="22" rx="7" fill="#38BDF8" />
          <Rect x="101" y="65" width="14" height="22" rx="7" fill="#38BDF8" />
        </Svg>
      </View>
    </View>
  );
}

export function DashedLearningPathSvg({ width, height, d }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        zIndex: 0,
      }}
      pointerEvents="none"
    >
      <Path
        d={d}
        stroke="#C2DCF9"
        strokeWidth={4.5}
        strokeDasharray={[8, 8]}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

const s = StyleSheet.create({
  connectorWrap: {
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -2,
  },
  ringContainer: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    position: 'absolute',
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#1F2A44',
  },
  scoreBadgeOuter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  scoreBadgeTextWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBadgeMainText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    lineHeight: 18,
  },
  scoreBadgeSubText: {
    fontFamily: fonts.bold,
    fontSize: 8.5,
    color: '#64748B',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  guideWrapper: {
    alignItems: 'center',
    width: 112,
  },
  speechBubble: {
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginBottom: 8,
    position: 'relative',
  },
  speechBubbleText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#2554E8',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    backgroundColor: '#EDF2FF',
    transform: [{ rotate: '45deg' }],
  },
  guideOuterRing: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: '#C7D7FE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F8FF',
    marginBottom: 8,
  },
  guideInnerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  guideName: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#1F2A44',
  },
  guideRole: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  miniRingWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  miniRingText: {
    position: 'absolute',
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#1F2A44',
  },
  donutWrap: {
    width: 114,
    height: 114,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutBigPct: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
    lineHeight: 26,
  },
  donutSubLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  resetIllustContainer: {
    width: 260,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  resetBigCircleBg: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#E1ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillMulai: {
    position: 'absolute',
    top: 36,
    left: 4,
    backgroundColor: '#2554E8',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
    transform: [{ rotate: '-10deg' }],
    shadowColor: '#2554E8',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillMulaiText: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pillLevel: {
    position: 'absolute',
    top: 48,
    right: -2,
    backgroundColor: '#F7C32E',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    transform: [{ rotate: '8deg' }],
    shadowColor: '#D97706',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillLevelText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#451A03',
  },
  pillTrue: {
    position: 'absolute',
    bottom: 34,
    left: 8,
    backgroundColor: '#2ED47A',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 5,
    transform: [{ rotate: '-8deg' }],
    shadowColor: '#16A34A',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillTrueText: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginHeroIllustWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  loginFloatingLeftCol: {
    flex: 1,
    height: 175,
    position: 'relative',
    justifyContent: 'center',
  },
  loginPillBraces: {
    position: 'absolute',
    top: 12,
    left: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  loginPillBracesText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    color: '#2554E8',
  },
  loginStarWrap: {
    position: 'absolute',
    top: 38,
    left: 82,
  },
  loginPillYellow: {
    position: 'absolute',
    top: 72,
    left: 28,
    backgroundColor: '#F5B82E',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  loginPillYellowText: {
    fontFamily: fonts.mono,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  loginPillGreen: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 6.5,
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  loginPillGreenText: {
    fontFamily: fonts.mono,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginRobotRightWrap: {
    marginRight: -10,
    marginBottom: -14,
  },
  welcomeHeroWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#2554E8',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
