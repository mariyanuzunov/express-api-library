import express from "express";
import asyncHandler from "express-async-handler";

import { userService } from "./user.service.js";
import { withAuth } from "../../auth/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

    if (!email || !password || !repeatPassword) {
      res.status(400);
      throw new Error("All fields are required!");
    }

    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Invalid email address!");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("The password must be at least 6 characters long!");
    }

    if (password !== repeatPassword) {
      res.status(400);
      throw new Error("Passwords don't match!");
    }

    let user;

    try {
      user = await userService.register(email, password);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }

    return res.status(201).json(user);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required!");
    }

    let user;
    try {
      user = await userService.login(email, password);
    } catch (error) {
      res.status(500);
      throw new error();
    }

    if (!user) {
      res.status(400);
      throw new Error("Invalid user credentials!");
    }

    return res.status(200).json(user);
  })
);

router.post(
  "/change-password",
  withAuth,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error("All fields are required!");
    }

    if (newPassword.length < 6) {
      res.status(400);
      throw new Error("The password must be at least 6 characters long!");
    }

    let user;
    try {
      user = await userService.resetPassword(
        req.user._id,
        currentPassword,
        newPassword
      );
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }

    if (!user) {
      return res.status(500).end();
    }

    return res.status(200).json({ message: "Password changed successfully!" });
  })
);

export default router;
