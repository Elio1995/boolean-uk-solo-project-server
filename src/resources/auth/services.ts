import prisma from "../../utils/database";
import { User } from ".prisma/client";
import { compare } from "bcrypt";

export const findUserWithValidation = async (userData: User) => {
  const foundUser = await prisma.user.findFirst({
    where: { email: userData.email },
  });

  if (!foundUser) throw new Error("Username/Password incorrect");

  const isPasswordValid = await compare(userData.password, foundUser.password);
  if (!isPasswordValid) throw new Error("Username/Password incorrect");

  return foundUser;
};

// export const createdWithHash = async (newUser: User) => {
//   const plainText = newUser.password;

//   const hashedPassword = await hash(plainText, 15);
//   const savedUser = prisma.user.create({
//     data: { ...newUser, password: hashedPassword },
//   });
//   return savedUser;
// };
