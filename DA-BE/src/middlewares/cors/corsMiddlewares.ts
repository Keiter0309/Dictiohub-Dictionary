import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const allowedOrigins = ["https://dictiohub.site", "http://localhost:4173", "http://localhost:5173"];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
    if (allowedOrigins.includes(origin || "")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);