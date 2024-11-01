import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import corsMiddlewares from './middlewares/cors/corsMiddlewares';
import { authRoute } from './routes/auth/auth';
import { wordsRoute } from './routes/words/word';
import { adminRoute } from './routes/admin/admin';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(corsMiddlewares);
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Typescript Express');
});

app.use(authRoute);
app.use(wordsRoute);
app.use(adminRoute);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});