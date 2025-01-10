import { rateLimiter } from "../../utils/rateLimiter";

export class RateLimiter {
  public static loginLimiter() {
    return rateLimiter(
      15,
      60,
      1000,
      10,
      "Too many requests. Please try again later!"
    );
  }

  public static registerLimiter() {
    return rateLimiter(
      15,
      60,
      1000,
      5,
      "Too many requests. Please try again later!"
    );
  }
  public static rateLimiter() {
    return rateLimiter(
      5,
      60,
      1000,
      5,
      "Too many requests. Please try again later"
    );
  }
}
