import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5199;

import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes';
import toolsRoutes from './routes/tools.routes';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';
import employeeRoutes from './routes/employee.routes';
import workdayRoutes from './routes/workday.routes';
import { isAllowedOutsideCookies, allowedOrigins } from './config/authConfig';
import streamRoutes from './routes/stream.routes';

//CORS and allowing apps outside the server to access it
if (isAllowedOutsideCookies) {
    app.use(cors({
        origin: (origin, callback) => {
            // If no origin (like mobile apps or curl), allow it
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Refresh-Token'],
        credentials: true
    }));
}

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
app.use('/api', streamRoutes);

// Serve static files from 'public' directory===============================
app.use(express.static(path.join(__dirname, '../public')));

// Fallback for root to ensure index.html is served=========================
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Node service listening at http://localhost:${port}`);
});
