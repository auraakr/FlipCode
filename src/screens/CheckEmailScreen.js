import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { CheckIcon } from '../../assets/icons/AppIcons';
import { CheckEmailHeroIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function CheckEmailScreen({ navigation, route }) {
  const targetEmail = route?.params?.email || 'aura@email.com';
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formattedTime = `00:${String(countdown).padStart(2, '0')}`;

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(45);
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <View style={s.container}>
        {/* Center Content (FlipCode - 41 Cek Email) */}
        <View style={s.centerSection}>
          <CheckEmailHeroIllustration />

          {/* Green Status Pill: Link terkirim */}
          <View style={s.statusPill}>
            <View style={s.statusCheckCircle}>
              <CheckIcon size={10} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={s.statusPillText}>Link terkirim</Text>
          </View>

          {/* Title & Description */}
          <Text style={s.title}>Cek email kamu</Text>
          <Text style={s.subtitle}>
            Kami sudah mengirim link ke{' '}
            <Text style={s.emailBold}>{targetEmail}</Text>
            {'.\nBuka link itu untuk membuat password baru.'}
          </Text>
        </View>

        {/* Bottom Action Buttons */}
        <View style={s.footerSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <Text style={s.primaryBtnText}>Kembali ke Masuk</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={countdown === 0 ? 0.75 : 1}
            onPress={handleResend}
            disabled={countdown > 0}
            style={s.resendBtn}
          >
            <Text
              style={[
                s.resendBtnText,
                countdown === 0 && s.resendBtnTextActive,
              ]}
            >
              {countdown > 0
                ? `Kirim ulang (${formattedTime})`
                : 'Kirim ulang sekarang'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F9F0',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6.5,
    marginTop: 28,
    marginBottom: 16,
    gap: 7,
  },
  statusCheckCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPillText: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#15803D',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 23,
    color: '#1F2A44',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  emailBold: {
    fontFamily: fonts.bold,
    color: '#1F2A44',
  },
  footerSection: {
    width: '100%',
    gap: 12,
  },
  primaryBtnOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 16,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  primaryBtnInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  resendBtn: {
    width: '100%',
    backgroundColor: '#EEF2F8',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendBtnText: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
    color: '#64748B',
  },
  resendBtnTextActive: {
    color: '#2554E8',
  },
});

