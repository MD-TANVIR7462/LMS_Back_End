export type TResistration = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  location?: string;
  phone?: string;
  img: string;
  isActive?: boolean;
  isDeleted?: boolean;
  needPasswordChange?:boolean
  passwordChangeAt?:Date
};
