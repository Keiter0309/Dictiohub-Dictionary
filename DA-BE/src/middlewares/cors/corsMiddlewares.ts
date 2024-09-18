import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const trimTrailingSlash = (url: string): string => url.replace(/\/$/, "");

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigin = trimTrailingSlash(
      process.env.CLIENT_HOST || process.env.SERVER_HOST || ""
    );
    const requestOrigin = trimTrailingSlash(origin || "");

    if (!allowedOrigin) {
      callback(new Error("Allowed origin is not set in environment variables"));
      return;
    }

    if (requestOrigin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
