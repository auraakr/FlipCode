import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {};
    if (!nama.trim()) next.nama = 'Nama wajib diisi';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Format email tidak valid';
    if (password.length < 6) next.password = 'Password minimal 6 karakter';
    if (konfirmasi !== password) next.konfirmasi = 'Konfirmasi password tidak sama';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await register(nama, email, password);
      // Sukses: AuthContext berubah, navigator otomatis pindah ke layar utama.
    } catch (e) {
      setErrors(e.status === 409 ? { email: e.message } : { form: e.message });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center">
            <Logo width={100} height={100} />
            <Text className="mt-2 text-3xl font-extrabold text-ink">Buat Akun</Text>
            <Text className="mb-6 mt-1 text-center text-base font-normal text-slate-500">
              Daftar agar progres belajarmu tersimpan.
            </Text>
          </View>

          <TextField
            label="Nama"
            value={nama}
            onChangeText={setNama}
            autoCapitalize="words"
            autoComplete="name"
            placeholder="Nama lengkap"
            error={errors.nama}
          />
          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            placeholder="nama@email.com"
            error={errors.email}
          />
          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            placeholder="Minimal 6 karakter"
            error={errors.password}
          />
          <TextField
            label="Konfirmasi Password"
            value={konfirmasi}
            onChangeText={setKonfirmasi}
            secureTextEntry
            autoComplete="new-password"
            placeholder="Ulangi password"
            error={errors.konfirmasi}
            onSubmitEditing={submit}
          />

          {errors.form ? (
            <Text className="mb-3 text-center text-sm font-semibold text-red-500">{errors.form}</Text>
          ) : null}

          <Button title={loading ? 'Memproses...' : 'Daftar'} onPress={submit} disabled={loading} />

          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm font-normal text-slate-500">Sudah punya akun? </Text>
            <Pressable onPress={() => navigation.navigate('Login')} disabled={loading}>
              <Text className="text-sm font-bold text-brand">Masuk</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
