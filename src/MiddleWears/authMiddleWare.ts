import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



import { envConfig } from "../Configs/envConfig";
import { isPasswordChange } from "../Utils";
import { TUserRole } from "../Constant";
import { RegistrationModel } from "../Modules/Auth/Registration/auth.model";



export const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const accessToken = req.headers.authorization;

      // 🔐 Missing token
      if (!accessToken) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: No access token provided.",
        });
        return;
      }
      

      jwt.verify(accessToken, envConfig.accessSecret as string, async function (err, decoded) {
        // ❌ Invalid or expired token
        if (err) {
          res.status(403).json({
            success: false,
            message: "Forbidden: Invalid or expired access token.",
          });
          return;
        }

        const userEmail = (decoded as JwtPayload).email;
        const isUserExist = await RegistrationModel.findOne({ email: userEmail });

        // 🚫 User not found
        if (!isUserExist) {
          res.status(404).json({
            success: false,
            message: "User not found with the provided token.",
          });
          return;
        }

        // 🔒 Account is inactive (blocked or suspended)
        if (!isUserExist.isActive) {
          res.status(403).json({
            success: false,
            message: "Account is blocked or inactive.",
          });
          return;
        }

        // 🔄 Password was changed after the token was issued
        if (isUserExist.passwordChangeAt) {
          const result = isPasswordChange(isUserExist.passwordChangeAt, (decoded as JwtPayload).iat as number);
          if (result) {
            res.status(401).json({
              success: false,
              message: "Session expired due to password change. Please login again.",
            });
            return;
          }
        }

        // 🚫 Role not authorized
        if (requiredRoles.length && !requiredRoles.includes((decoded as JwtPayload).role)) {
          res.status(403).json({
            success: false,
            message: "Forbidden: You don't have permission to access this route.",
          });
          return;
        }

        req.user = decoded as JwtPayload;
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};
