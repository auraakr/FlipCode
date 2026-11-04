import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TextField from '../components/TextField';
import Logo from '../../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      // Sukses: AuthContext berubah, navigator otomatis pindah ke layar utama.
    } catch (e) {
      setErrors({ form: e.message });
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
            <Logo width={120} height={120} />
            <Text className="mt-2 text-3xl font-extrabold text-ink">Masuk</Text>
            <Text className="mb-6 mt-1 text-center text-base font-normal text-slate-500">
              Lanjutkan belajarmu di FlipCode.
            </Text>
          </View>

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
            autoComplete="password"
            placeholder="Password"
            error={errors.password}
            onSubmitEditing={submit}
          />

          {errors.form ? (
            <Text className="mb-3 text-center text-sm font-semibold text-red-500">{errors.form}</Text>
          ) : null}

          <Button title={loading ? 'Memproses...' : 'Masuk'} onPress={submit} disabled={loading} />

          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm font-normal text-slate-500">Belum punya akun? </Text>
            <Pressable onPress={() => navigation.navigate('Register')} disabled={loading}>
              <Text className="text-sm font-bold text-brand">Daftar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
