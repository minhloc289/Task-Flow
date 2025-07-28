import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @desc Register a new user
// @route POST /api/auth/register
export const register = async (req: Request, res: Response) => {  
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "90d" });

        res.status(201).json({ user: { name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Login a user
// @route POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "90d" });

    res.json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
