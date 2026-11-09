// Komponen Flashcard dua sisi.
// Tap kartu -> balik. Prop onPaham dan onUlangi dipakai di layar.
// Catatan: animasi membalik dibuat sederhana memakai Animated bawaan.
// Nanti bisa ditingkatkan dengan react-native-reanimated kalau mau efek 3D.

import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  Easing,
} from 'react-native';
import s from '../styles/Flashcard.styles';

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: flipped ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  const scaleY = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 1] });

  const sisi = flipped ? 'belakang' : 'depan';

  return (
    <Pressable onPress={toggle} style={s.wrap}>
      <Animated.View style={[s.card, { transform: [{ scaleY }] }]}>
        {sisi === 'depan' ? (
          <View style={s.inner}>
            <Text style={s.hint}>Pertanyaan / Istilah</Text>
            <Text style={s.depan}>{card.depan || '(isi kartu kosong — isi di flashcards.json)'}</Text>
            <Text style={s.tap}>Ketuk untuk membalik</Text>
          </View>
        ) : (
          <View style={s.inner}>
            <Text style={s.hint}>Penjelasan</Text>
            <Text style={typography.body}>{card.belakang?.penjelasan || '-'}</Text>
            {!!card.belakang?.contohKode && (
              <View style={s.code}>
                <Text style={s.codeText}>{card.belakang.contohKode}</Text>
              </View>
            )}
            {!!card.belakang?.analogi && (
              <Text style={[typography.small, { marginTop: spacing.sm, fontStyle: 'italic' }]}>
                Analogi: {card.belakang.analogi}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}
