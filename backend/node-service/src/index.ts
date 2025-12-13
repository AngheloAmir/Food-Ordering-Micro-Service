import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import apiRoutes from './routes/api.routes';

const app = express();
const port = process.env.PORT || 5199;

app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World from Node.js with TypeScript and Nodemon! (Hot Reload Verified)' });
});

app.listen(port, () => {
    console.log(`Node service listening at http://localhost:${port}`);
});
