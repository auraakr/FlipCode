import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { api } from '../api/client';
import { CheckIcon } from '../../assets/icons/AppIcons';
import { CheckEmailHeroIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function CheckEmailScreen({ navigation, route }) {
  const targetEmail = route?.params?.email || '';
  const [countdown, setCountdown] = useState(45);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formattedTime = `00:${String(countdown).padStart(2, '0')}`;

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await api.post('/auth/forgot-password', { email: targetEmail });
      setCountdown(45);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleReset = async () => {
    if (code.length !== 6) return setError('Masukkan kode 6 digit dari email');
    if (password.length < 6) return setError('Password baru minimal 6 karakter');
    setError(null);
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email: targetEmail, code, password });
      if (Platform.OS === 'web') {
        window.alert('Password berhasil diganti. Silakan masuk.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Berhasil', 'Password berhasil diganti. Silakan masuk.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        {/* Center Content (FlipCode - 41 Cek Email) */}
        <View style={s.centerSection}>
          <CheckEmailHeroIllustration />

          {/* Green Status Pill: Link terkirim */}
          <View style={s.statusPill}>
            <View style={s.statusCheckCircle}>
              <CheckIcon size={10} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={s.statusPillText}>Kode terkirim</Text>
          </View>

          {/* Title & Description */}
          <Text style={s.title}>Cek email kamu</Text>
          <Text style={s.subtitle}>
            Kami sudah mengirim kode 6 digit ke{' '}
            <Text style={s.emailBold}>{targetEmail}</Text>
            {'.\nMasukkan kode itu dan password barumu.'}
          </Text>

          <TextInput
            value={code}
            onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={6}
            style={[s.input, s.codeInput]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password baru (min 6 karakter)"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            autoCapitalize="none"
            style={s.input}
          />
        </View>

        {/* Bottom Action Buttons */}
        <View style={s.footerSection}>
          {error ? <Text style={s.errorText}>{error}</Text> : null}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleReset}
            disabled={loading}
            style={[s.primaryBtnOuter, loading && { opacity: 0.6 }]}
          >
            <View style={s.primaryBtnInner}>
              <Text style={s.primaryBtnText}>{loading ? 'Menyimpan...' : 'Ganti Password'}</Text>
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
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  container: {
    flexGrow: 1,
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
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#1F2A44',
  },
  codeInput: {
    textAlign: 'center',
    fontFamily: fonts.extrabold,
    fontSize: 22,
    letterSpacing: 8,
    marginTop: 20,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: '#EF4444',
    marginTop: 10,
    textAlign: 'center',
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

