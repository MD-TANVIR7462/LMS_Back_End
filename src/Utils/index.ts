import { userRole } from "../Constant";
import { authMiddleware } from "../MiddleWears/authMiddleWare";

const bothUsers = authMiddleware(userRole.user, userRole.admin);
const admin = authMiddleware(userRole.admin);
const user = authMiddleware(userRole.user);

export const permission = {
  bothUsers,
  admin,
  user,
};

export const isPasswordChange = (utcPass: Date, jwtPass: number) => {
  const passwordChangedAt = Math.floor(new Date(utcPass).getTime() / 1000);
  return passwordChangedAt > jwtPass;
};
