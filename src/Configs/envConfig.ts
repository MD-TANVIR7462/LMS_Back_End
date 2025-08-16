import dotenv from "dotenv";
dotenv.config();

const bcryptRound = process.env.BCRYPT_SALT;
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreSecret = process.env.JWT_REFRESH_SECRET;
const productionType = process.env.NODE_ENV;
const websiteLink = process.env.WEBSITE_LINK;
const nodeENV = process.env.NODE_ENV;



export const envConfig = {
  bcryptRound,
  accessSecret,
  refreSecret,
  productionType,
  websiteLink,
  nodeENV,


};
