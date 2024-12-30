import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import corsMiddlewares from "./middlewares/cors/corsMiddlewares";
import { authRoute } from "./routes/auth/auth";
import { wordsRoute } from "./routes/words/word";
import { adminRoute } from "./routes/admin/admin";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { audioRoute } from "./routes/audio/audio";

const app = express();
const port = process.env.PORT || 3000;

// app.use(corsMiddlewares);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/audio", express.static(path.join(__dirname, "..", "audio")));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Typescript Express");
});

app.use(authRoute);
app.use(wordsRoute);
app.use(adminRoute);
app.use(audioRoute);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
