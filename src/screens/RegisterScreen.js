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
  UserIcon,
  MailIcon,
  GraduationCapIcon,
  SmallGearIcon,
  CheckIcon,
  UnlockedOutlineIcon,
  EyeIcon,
  ArrowRightIcon,
} from '../../assets/icons/AppIcons';
import { RegisterHeroRobot } from '../../assets/illustrations/MascotIllustrations';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jenjang, setJenjang] = useState('SMA');
  const [password, setPassword] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {};
    if (!nama.trim()) next.nama = 'Nama lengkap wajib diisi';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Format email tidak valid';
    if (password.length < 6) next.password = 'Password minimal 6 karakter';
    if (konfirmasi !== password)
      next.konfirmasi = 'Konfirmasi password tidak sama';
    if (!agreeTerms)
      next.form = 'Harap setujui Syarat dan Ketentuan terlebih dahulu';

    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await register(nama, email, password);
      setLoading(false);
      navigation.replace('Welcome');
    } catch (e) {
      setErrors(
        e.status === 409
          ? { email: e.message }
          : { form: e.message || 'Gagal membuat akun.' }
      );
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
          {/* Top Blue Hero Banner (FlipCode - 32) */}
          <View style={s.heroBanner}>
            {/* Top Row: White Brand Pill + Yellow </> Badge */}
            <View style={s.heroTopRow}>
              <View style={s.brandPill}>
                <Text style={s.brandCodeIcon}>{'</>'}</Text>
                <Text style={s.brandTitleText}>FlipCode</Text>
              </View>

              <View style={s.yellowCodeBadge}>
                <Text style={s.yellowCodeBadgeText}>{'</>'}</Text>
              </View>
            </View>

            {/* Bottom Row: Title/Subtitle + Robot Mascot */}
            <View style={s.heroBodyRow}>
              <View style={s.heroLeftCol}>
                <Text style={s.heroTitle}>{'Yuk, gabung\nFlipCode!'}</Text>
                <Text style={s.heroSubtitle}>
                  Buat akun dan mulai belajar pemrograman dengan cara yang lebih
                  seru.
                </Text>
              </View>

              <View style={s.heroRightRobot}>
                <RegisterHeroRobot />
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={s.formContainer}>
            {/* 1. Nama lengkap */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Nama lengkap</Text>
              <View
                style={[s.inputBox, errors.nama && { borderColor: '#EF4444' }]}
              >
                <UserIcon size={17} color="#94A3B8" />
                <TextInput
                  value={nama}
                  onChangeText={(v) => {
                    setNama(v);
                    if (errors.nama) setErrors({ ...errors, nama: null });
                  }}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  autoComplete="name"
                  style={s.textInput}
                />
              </View>
              {errors.nama ? (
                <Text style={s.errorText}>{errors.nama}</Text>
              ) : null}
            </View>

            {/* 2. Email */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Email</Text>
              <View
                style={[
                  s.inputBox,
                  errors.email && { borderColor: '#EF4444' },
                ]}
              >
                <MailIcon size={17} color="#94A3B8" />
                <TextInput
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Masukkan email aktif"
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

            {/* 3. Jenjang sekolah (SMA / SMK) */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Jenjang sekolah</Text>
              <View style={s.jenjangRow}>
                {/* Option SMA */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setJenjang('SMA')}
                  style={[
                    s.jenjangBtn,
                    jenjang === 'SMA' && s.jenjangBtnActive,
                  ]}
                >
                  <GraduationCapIcon size={15} color="#1E293B" filled />
                  <Text
                    style={[
                      s.jenjangText,
                      jenjang === 'SMA' && s.jenjangTextActive,
                    ]}
                  >
                    SMA
                  </Text>
                  {jenjang === 'SMA' && (
                    <View style={{ marginLeft: 4 }}>
                      <CheckIcon size={13} color="#2554E8" strokeWidth={2.5} />
                    </View>
                  )}
                </TouchableOpacity>

                {/* Option SMK */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setJenjang('SMK')}
                  style={[
                    s.jenjangBtn,
                    jenjang === 'SMK' && s.jenjangBtnActive,
                  ]}
                >
                  <SmallGearIcon
                    size={14}
                    color={jenjang === 'SMK' ? '#2554E8' : '#64748B'}
                  />
                  <Text
                    style={[
                      s.jenjangText,
                      jenjang === 'SMK' && s.jenjangTextActive,
                    ]}
                  >
                    SMK
                  </Text>
                  {jenjang === 'SMK' && (
                    <View style={{ marginLeft: 4 }}>
                      <CheckIcon size={13} color="#2554E8" strokeWidth={2.5} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* 4. Password */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Password</Text>
              <View
                style={[
                  s.inputBox,
                  errors.password && { borderColor: '#EF4444' },
                ]}
              >
                <UnlockedOutlineIcon size={17} color="#94A3B8" />
                <TextInput
                  value={password}
                  onChangeText={(v) => {
                    setPassword(v);
                    if (errors.password)
                      setErrors({ ...errors, password: null });
                  }}
                  placeholder="Buat password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  style={s.textInput}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={s.eyeBtn}
                >
                  <EyeIcon size={17} color="#94A3B8" visible={showPassword} />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={s.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* 5. Konfirmasi password */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Konfirmasi password</Text>
              <View
                style={[
                  s.inputBox,
                  errors.konfirmasi && { borderColor: '#EF4444' },
                ]}
              >
                <UnlockedOutlineIcon size={17} color="#94A3B8" />
                <TextInput
                  value={konfirmasi}
                  onChangeText={(v) => {
                    setKonfirmasi(v);
                    if (errors.konfirmasi)
                      setErrors({ ...errors, konfirmasi: null });
                  }}
                  placeholder="Ulangi password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showKonfirmasi}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  onSubmitEditing={submit}
                  style={s.textInput}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowKonfirmasi((prev) => !prev)}
                  style={s.eyeBtn}
                >
                  <EyeIcon size={17} color="#94A3B8" visible={showKonfirmasi} />
                </TouchableOpacity>
              </View>
              {errors.konfirmasi ? (
                <Text style={s.errorText}>{errors.konfirmasi}</Text>
              ) : null}
            </View>

            {/* Terms & Conditions Checkbox */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setAgreeTerms((prev) => !prev)}
              style={s.termsRow}
            >
              <View
                style={[
                  s.checkboxSquare,
                  agreeTerms && s.checkboxSquareChecked,
                ]}
              >
                {agreeTerms && (
                  <CheckIcon size={11} color="#FFFFFF" strokeWidth={3} />
                )}
              </View>
              <Text style={s.termsText}>
                Saya menyetujui{' '}
                <Text
                  style={s.termsLinkText}
                  onPress={() =>
                    Alert.alert(
                      'Syarat dan Ketentuan',
                      'Akun FlipCode digunakan untuk pembelajaran Algoritma & Pemrograman siswa SMA/SMK.'
                    )
                  }
                >
                  Syarat dan Ketentuan.
                </Text>
              </Text>
            </TouchableOpacity>

            {errors.form ? (
              <Text style={s.formErrorText}>{errors.form}</Text>
            ) : null}

            {/* Primary CTA Button: Buat Akun -> */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={submit}
              disabled={loading}
              style={[s.submitBtnOuter, loading && { opacity: 0.7 }]}
            >
              <View style={s.submitBtnInner}>
                <Text style={s.submitBtnText}>
                  {loading ? 'Memproses...' : 'Buat Akun'}
                </Text>
                <ArrowRightIcon size={16} color="#FFFFFF" strokeWidth={2.4} />
              </View>
            </TouchableOpacity>

            {/* Bottom Login Link */}
            <View style={s.bottomFooterRow}>
              <Text style={s.bottomPromptText}>Sudah punya akun? </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={s.bottomLinkText}>Masuk</Text>
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
    paddingBottom: 26,
  },
  heroBanner: {
    backgroundColor: '#2554E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB8',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6.5,
    gap: 6,
  },
  brandCodeIcon: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  brandTitleText: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#1F2A44',
  },
  yellowCodeBadge: {
    backgroundColor: '#F5B82E',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  yellowCodeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    lineHeight: 28,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17.5,
    color: 'rgba(255, 255, 255, 0.88)',
  },
  heroRightRobot: {
    marginRight: -4,
    marginBottom: -6,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#1F2A44',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6ECF5',
    paddingHorizontal: 13,
    height: 46,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
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
    fontSize: 11,
    color: '#EF4444',
    marginTop: 4,
  },
  jenjangRow: {
    flexDirection: 'row',
    gap: 10,
  },
  jenjangBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    gap: 6,
  },
  jenjangBtnActive: {
    backgroundColor: '#EDF2FF',
    borderColor: '#2554E8',
    borderWidth: 1.5,
  },
  jenjangText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#64748B',
  },
  jenjangTextActive: {
    color: '#2554E8',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  checkboxSquare: {
    width: 19,
    height: 19,
    borderRadius: 5.5,
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
  termsText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#64748B',
  },
  termsLinkText: {
    fontFamily: fonts.semibold,
    color: '#2554E8',
  },
  formErrorText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  submitBtnOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.26,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  submitBtnInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 999,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  submitBtnText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  bottomFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 22,
  },
  bottomPromptText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: '#64748B',
  },
  bottomLinkText: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#2554E8',
  },
});
