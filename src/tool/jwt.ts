import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string, email: string) => {
  const payload = {
    id: id,
    email: email,
    date: new Date(),
  };

  const secret = process.env.JWT_SECRET_KEY ?? "";

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY ?? "";

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
