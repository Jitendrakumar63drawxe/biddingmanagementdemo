import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";


// =========================
// REGISTER USER
// =========================
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Split name into first and last name
  const nameParts = name.trim().split(" ");

  const firstName = nameParts[0];
  const lastName =
    nameParts.length > 1
      ? nameParts.slice(1).join(" ")
      : "";

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName
    }
  });

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
};


// =========================
// LOGIN USER
// =========================
export const loginUser = async (
  email: string,
  password: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  };
};