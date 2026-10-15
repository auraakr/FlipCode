// Palet warna sesuai PPT FlipCode (biru utama + warna status).
// Ubah di sini supaya seluruh aplikasi ikut berubah.

export const colors = {
  primary: '#1F4E9E',
  primaryDark: '#163C78',
  primaryLight: '#E5EDFB',
  accent: '#F7B32B',
  success: '#2E8B57',
  danger: '#D64545',
  warning: '#E0B800',
  textPrimary: '#1A1A1A',
  textSecondary: '#555555',
  textMuted: '#9A9A9A',
  surface: '#FFFFFF',
  background: '#F6F8FC',
  border: '#E3E7EF',
  // Warna status kartu
  cardBaru: '#9A9A9A',
  cardSedang: '#F7B32B',
  cardDikuasai: '#2E8B57',
  // Warna level
  levelMudah: '#2E8B57',
  levelSedang: '#F7B32B',
  levelSulit: '#D64545',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
};

// Nama family Nunito Sans per bobot (dimuat di App.js). Di React Native bobot
// dipilih lewat nama family, bukan fontWeight.
export const fonts = {
  regular: 'NunitoSans_400Regular',
  medium: 'NunitoSans_500Medium',
  semibold: 'NunitoSans_600SemiBold',
  bold: 'NunitoSans_700Bold',
  extrabold: 'NunitoSans_800ExtraBold',
};

export const typography = {
  title: { fontFamily: fonts.bold, fontSize: 24, color: colors.textPrimary },
  heading: { fontFamily: fonts.bold, fontSize: 18, color: colors.textPrimary },
  body: { fontFamily: fonts.regular, fontSize: 15, color: colors.textPrimary, lineHeight: 22 },
  small: { fontFamily: fonts.regular, fontSize: 13, color: colors.textSecondary },
  button: { fontFamily: fonts.semibold, fontSize: 16, color: '#fff' },
};
