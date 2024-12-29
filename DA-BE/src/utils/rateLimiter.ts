import rateLimit from "express-rate-limit";

export const rateLimiter = (
  numberOfMinutes: number = 1,
  numberOfSeconds: number = 60,
  numberOfMiliSeconds: number = 1000,
  maxReq: number = 10,
  message: string
) => {
  return rateLimit({
    windowMs: numberOfMinutes * numberOfSeconds * numberOfMiliSeconds,
    max: maxReq,
    message: message,
  });
};
