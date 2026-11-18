import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { api } from '../api/client';
import {
  MailIcon,
  SendPaperPlaneIcon,
} from '../../assets/icons/AppIcons';
import { LoginHeroIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function ForgotPasswordScreen({ navigation, route }) {
  const initialEmail = route?.params?.email || '';
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendLink = async () => {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Masukkan email yang valid');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: trimmed });
      navigation.navigate('CheckEmail', { email: trimmed });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={s.flex}
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Blue Hero Banner (FlipCode - 40 Lupa Password) */}
          <View style={s.heroBanner}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
              style={s.brandPill}
            >
              <Text style={s.brandCodeIcon}>{'</>'}</Text>
              <Text style={s.brandTitleText}>FlipCode</Text>
            </TouchableOpacity>

            <LoginHeroIllustration />
          </View>

          {/* Form Section */}
          <View style={s.formContainer}>
            <Text style={s.title}>Lupa password?</Text>
            <Text style={s.subtitle}>
              {'Masukkan email akunmu, nanti kami kirim link\nuntuk membuat password baru.'}
            </Text>

            {/* Field: Email */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Email</Text>
              <View
                style={[
                  s.inputBox,
                  error && { borderColor: '#EF4444' },
                ]}
              >
                <MailIcon size={18} color="#94A3B8" />
                <TextInput
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    if (error) setError(null);
                  }}
                  placeholder="Masukkan email kamu"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onSubmitEditing={handleSendLink}
                  style={s.textInput}
                />
              </View>
              {error ? <Text style={s.errorText}>{error}</Text> : null}
            </View>

            {/* Primary CTA Button: Kirim Link */}
            <View style={s.ctaWrapper}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSendLink}
                disabled={loading}
                style={[s.submitBtnOuter, loading && { opacity: 0.6 }]}
              >
                <View style={s.submitBtnInner}>
                  <Text style={s.submitBtnText}>{loading ? 'Mengirim...' : 'Kirim Kode'}</Text>
                  <SendPaperPlaneIcon size={16} color="#FFFFFF" strokeWidth={2.2} />
                </View>
              </TouchableOpacity>
            </View>
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  heroBanner: {
    backgroundColor: '#2554E8',
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 14,
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB8',
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 6,
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  brandCodeIcon: {
    fontFamily: fonts.mono,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#D97706',
  },
  brandTitleText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#1F2A44',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 23,
    color: '#1F2A44',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#1F2A44',
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E6ECF5',
    paddingHorizontal: 14,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: '#1F2A44',
    marginLeft: 10,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#EF4444',
    marginTop: 5,
  },
  ctaWrapper: {
    marginTop: 108,
  },
  submitBtnOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  submitBtnInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 999,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    fontFamily: fonts.bold,
    fontSize: 15.5,
    color: '#FFFFFF',
  },
});

