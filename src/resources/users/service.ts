import dbClient from "../../utils/database";
import { hash } from "bcrypt";
import { User, Role } from "@prisma/client";

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: Role | undefined;
  street: string;
  city: string;
  phoneNumber: string;
};

const createWithHash = async (newUser: User) => {
  // grab user plaintext password
  const plaintext = newUser.password;

  // Hash it using bcrypt. It will return a PROMISE!!!!
  const hashedPassword = await hash(plaintext, 10);

  // Make sure to save the hashed password!
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
};

const userClient = {
  ...dbClient.user,
  createWithHash,
};

export default userClient;
