import express, { Request, Response } from 'express';
// Port configuration updated
import dotenv from 'dotenv';
dotenv.config();

import apiRoutes from './routes/api';

const app = express();
const port = process.env.PORT || 5199;

import path from 'path';

//Define routes here
app.use('/api', apiRoutes);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Fallback for root to ensure index.html is served
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Node service listening at http://localhost:${port}`);
});
