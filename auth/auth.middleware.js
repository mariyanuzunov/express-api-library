import asyncHandler from "express-async-handler";

import { authService } from "./auth.service.js";
import User from "../resources/user/user.model.js";

export const withAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const payload = await authService.verifyToken(token);

      req.user = await User.findById(payload.id)
        .select("-password")
        .lean()
        .exec();

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized!");
  }
});
