import User from "./user.model.js";
import { authService } from "../../auth/auth.service.js";

const register = async (email, password) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new Error("A user with this email address already exists!");
  }

  const hashedPassword = await authService.generateHashedPassword(password);

  const user = await User.create({ email, password: hashedPassword });

  return {
    _id: user._id,
    email: user.email,
    token: authService.generateToken(user._id),
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    const passwordsMatch = await authService.checkPasswords(
      password,
      user.password
    );

    if (passwordsMatch) {
      return {
        _id: user._id,
        email: user.email,
        token: authService.generateToken(user._id),
      };
    }
  }
};

const resetPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (user) {
    const passwordsMatch = await authService.checkPasswords(
      currentPassword,
      user.password
    );

    if (passwordsMatch) {
      user.password = await authService.generateHashedPassword(newPassword);
      return await user.save();
    }

    throw new Error("Wrong password!");
  }
};

export const userService = {
  register,
  login,
  resetPassword,
};
