import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import s from '../styles/RegisterScreen.styles';

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
