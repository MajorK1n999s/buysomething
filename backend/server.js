import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
