import { Admin, DataSource } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { User } from "../entities/user/user.entity";
import { EnvConfiguration } from "../config/env.config";
import bcrypt from "bcrypt";
import { AuthType, UserRole } from "../constants/enums/auth.enum";

AppDataSource.initialize()
  .then(() => {
    adminSeeders();
  })
  .catch((error) => {
    console.log(error);
  });

const adminSeeders = async () => {
  const admin = new User();
  (admin.fullName = "Ticket Sathi Admin"),
    (admin.email = EnvConfiguration.ADMIN_EMAIL ?? "");
  const hashPassword = await bcrypt.hash(
    EnvConfiguration.ADMIN_PASSWORD ?? "",
    10
  );

  admin.password = hashPassword;
  admin.phone = "+9779821238476";
  admin.role = UserRole.ADMIN;
  admin.authType = AuthType.TRADITIONAL;
  admin.isVerified = true;
  try {
    await admin.save();
    console.log("sucessfully seeded 🎉🎉🎉🎉🎉🎉🎉");
    process.exit(1);
  } catch (error: any) {
    console.log("error occurs ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️");
  }
};
