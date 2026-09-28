import { Request, Response } from "express";
import {
  registerUser,
  loginUser
} from "../services/auth.service";


// =========================
// REGISTER
// =========================
export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const user = await registerUser(
      name,
      email,
      password
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error: any) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};


// =========================
// LOGIN
// =========================
export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const result = await loginUser(
      email,
      password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user
    });

  } catch (error: any) {

    console.error(error);

    return res.status(401).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};