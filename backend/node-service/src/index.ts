import express, { Request, Response } from 'express';
// Port configuration updated - triggering restart for env vars
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 5199;

import path from 'path';

import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes';
import toolsRoutes from './routes/tools.routes';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';
import employeeRoutes from './routes/employee.routes';
import workdayRoutes from './routes/workday.routes';

app.use(express.json());
app.use(cookieParser());

//Define routes here========================================================
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', toolsRoutes);
app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);
app.use('/api', employeeRoutes);
app.use('/api', workdayRoutes);

// Serve static files from 'public' directory===============================
app.use(express.static(path.join(__dirname, '../public')));

// Fallback for root to ensure index.html is served=========================
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Node service listening at http://localhost:${port}`);
});
