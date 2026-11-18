// Daftar kunci penyimpanan AsyncStorage, dikumpulkan di satu tempat
// supaya tidak ada typo di seluruh aplikasi.

export const StorageKeys = Object.freeze({
  PROGRESS: 'flipcode:progress:v1',
  PLACEMENT_DONE: 'flipcode:placement:done:v1',
  SETTINGS: 'flipcode:settings:v1',
  AUTH_TOKEN: 'flipcode_auth_token_v1',
  // Diikuti id user, mis. 'flipcode:profile-photo:v1:12' (foto hanya tersimpan di perangkat).
  PROFILE_PHOTO_PREFIX: 'flipcode:profile-photo:v1:',
});
