import jwt from "jsonwebtoken";

export const generateEmailToken = (email) => {
  return jwt.sign({ email, task: "registration" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyEmailToken = (token) => {
  try {
    const { email, task } = jwt.verify(token, process.env.JWT_SECRET);
    if (task !== "registration") throw "Invalid Token";
    return { email };
  } catch (error) {
    return { email: null };
  }
};

export const generatePasswordToken = (email) => {
  return jwt.sign({ email, task: "resetPassword" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyPasswordToken = (token) => {
  try {
    const { email, task } = jwt.verify(token, process.env.JWT_SECRET);
    if (task !== "resetPassword") throw "Invalid Token";
    return { email };
  } catch (error) {
    return { email: null };
  }
};
