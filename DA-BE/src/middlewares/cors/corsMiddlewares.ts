import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");

const corsOptions = {
  origin: (
    origin: string,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigin = trimTrailingSlash(process.env.CLIENT_HOST || "");
    const requestOrigin = trimTrailingSlash(origin || "");

    if (requestOrigin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions as cors.CorsOptions);
