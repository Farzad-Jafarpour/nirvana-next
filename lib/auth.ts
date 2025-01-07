import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const signToken = (user: {
  id: number;
  username: string;
  isAdmin?: boolean;
}) => {
  return jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
