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

export const typography = {
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  heading: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  body: { fontSize: 15, color: colors.textPrimary, lineHeight: 22 },
  small: { fontSize: 13, color: colors.textSecondary },
  button: { fontSize: 16, fontWeight: '600', color: '#fff' },
};
