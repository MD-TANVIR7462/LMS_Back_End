export const isPasswordChange = (utcPass: Date, jwtPass: number) => {
  const passwordChangedAt = Math.floor(new Date(utcPass).getTime() / 1000);
  return passwordChangedAt > jwtPass;
};
