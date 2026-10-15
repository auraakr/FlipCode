import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { Level } from '../constants/enums';

// Ikon per topik (id dari topics.json). Topik lain memakai ikon "variabel".
const STROKE = { stroke: '#365CFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };

function TopicIcon({ topicId }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      {topicId === 'tipe_data' ? (
        <>
          <Path d="M8 4C6 4 5 5 5 7v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3" {...STROKE} />
          <Path d="M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3" {...STROKE} />
        </>
      ) : topicId === 'operator' ? (
        <>
          <Rect x={4} y={3} width={16} height={18} rx={3} {...STROKE} />
          <Path d="M8 8h3M9.5 6.5v3M13.5 8h3M8 15h3M13.5 14.5h3M13.5 17h3" {...STROKE} />
        </>
      ) : (
        <>
          <Rect x={3} y={4} width={18} height={5} rx={1.5} {...STROKE} />
          <Path d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M10 13h4" {...STROKE} />
        </>
      )}
    </Svg>
  );
}

const PILL = {
  [Level.MUDAH]: { wrap: 'bg-[#E3F6EC]', text: 'text-[#1F9D61]' },
  [Level.SEDANG]: { wrap: 'bg-[#FFF2CC]', text: 'text-[#B7791F]' },
  [Level.SULIT]: { wrap: 'bg-[#FDE4E4]', text: 'text-[#D64545]' },
};

// Kartu satu topik: ikon, nama topik, dan label level di kanan.
export default function TopicLevelCard({ topicId, nama, level, className = '' }) {
  const pill = PILL[level];
  return (
    <View className={`rounded-2xl bg-slate-200 ${className}`}>
      <View
        className="flex-row items-center rounded-2xl border border-slate-100 bg-white px-4 py-4"
        style={{ marginBottom: 3 }}
      >
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E8EDFF]">
          <TopicIcon topicId={topicId} />
        </View>
        <Text className="ml-3 flex-1 text-base font-bold text-ink">{nama}</Text>
        {pill ? (
          <View className={`rounded-full px-3 py-1 ${pill.wrap}`}>
            <Text className={`text-xs font-bold ${pill.text}`}>{level}</Text>
          </View>
        ) : (
          <Text className="text-sm font-normal text-slate-400">—</Text>
        )}
      </View>
    </View>
  );
}
