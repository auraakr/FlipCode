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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  CheckIcon,
  ArrowRightIcon,
} from '../../assets/icons/AppIcons';
import { LoginHeroIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {};
    if (!email.trim()) next.email = 'Email wajib diisi';
    if (!password) next.password = 'Password wajib diisi';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      setErrors({ form: e.message || 'Gagal masuk. Periksa kembali akunmu.' });
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Lupa Password?',
      'Silakan hubungi guru atau administrator FlipCode sekolahmu untuk mereset password akun.'
    );
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
          {/* Top Blue Hero Banner (FlipCode - 33) */}
          <View style={s.heroBanner}>
            <View style={s.brandPill}>
              <Text style={s.brandCodeIcon}>{'</>'}</Text>
              <Text style={s.brandTitleText}>FlipCode</Text>
            </View>

            <LoginHeroIllustration />
          </View>

          {/* Form Section */}
          <View style={s.formContainer}>
            <Text style={s.welcomeTitle}>Senang melihatmu lagi!</Text>
            <Text style={s.welcomeSubtitle}>
              Masuk dan lanjutkan perjalanan coding-mu.
            </Text>

            {/* Field 1: Email */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Email</Text>
              <View
                style={[
                  s.inputBox,
                  errors.email && { borderColor: '#EF4444' },
                ]}
              >
                <MailIcon size={18} color="#94A3B8" />
                <TextInput
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Masukkan email kamu"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  style={s.textInput}
                />
              </View>
              {errors.email ? (
                <Text style={s.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Field 2: Password */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Password</Text>
              <View
                style={[
                  s.inputBox,
                  errors.password && { borderColor: '#EF4444' },
                ]}
              >
                <LockIcon size={18} color="#94A3B8" filled />
                <TextInput
                  value={password}
                  onChangeText={(v) => {
                    setPassword(v);
                    if (errors.password)
                      setErrors({ ...errors, password: null });
                  }}
                  placeholder="Masukkan password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  onSubmitEditing={submit}
                  style={s.textInput}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={s.eyeBtn}
                >
                  <EyeIcon size={18} color="#94A3B8" visible={showPassword} />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={s.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Options Row: Ingat saya & Lupa password? */}
            <View style={s.optionsRow}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => setRememberMe((prev) => !prev)}
                style={s.rememberRow}
              >
                <View
                  style={[
                    s.checkboxSquare,
                    rememberMe && s.checkboxSquareChecked,
                  ]}
                >
                  {rememberMe && (
                    <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
                <Text style={s.rememberText}>Ingat saya</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleForgotPassword}
              >
                <Text style={s.forgotText}>Lupa password?</Text>
              </TouchableOpacity>
            </View>

            {errors.form ? (
              <Text style={s.formErrorText}>{errors.form}</Text>
            ) : null}

            {/* Primary CTA Button: Masuk -> */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={submit}
              disabled={loading}
              style={[s.submitBtnOuter, loading && { opacity: 0.7 }]}
            >
              <View style={s.submitBtnInner}>
                <Text style={s.submitBtnText}>
                  {loading ? 'Memproses...' : 'Masuk'}
                </Text>
                <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.4} />
              </View>
            </TouchableOpacity>

            {/* Bottom Register Link */}
            <View style={s.bottomFooterRow}>
              <Text style={s.bottomPromptText}>Belum punya akun? </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={s.bottomLinkText}>Daftar</Text>
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
    paddingBottom: 28,
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
    paddingTop: 26,
  },
  welcomeTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 23,
    color: '#1F2A44',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: '#64748B',
    marginBottom: 22,
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
  eyeBtn: {
    padding: 4,
    marginLeft: 6,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#EF4444',
    marginTop: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 22,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  checkboxSquareChecked: {
    backgroundColor: '#2554E8',
    borderColor: '#2554E8',
  },
  rememberText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#1F2A44',
  },
  forgotText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#2554E8',
  },
  formErrorText: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 14,
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
  bottomFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 32,
  },
  bottomPromptText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: '#64748B',
  },
  bottomLinkText: {
    fontFamily: fonts.extrabold,
    fontSize: 13,
    color: '#2554E8',
  },
});
