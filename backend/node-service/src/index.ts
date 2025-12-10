import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World from Node.js with TypeScript and Nodemon! (Hot Reload Verified)' });
});

app.listen(port, () => {
    console.log(`Node service listening at http://localhost:${port}`);
});
