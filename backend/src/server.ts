import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import { ConnectDatabase } from './config/db.config';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error-handler.middleware';
import CustomError from './middlewares/error-handler.middleware';

//importing routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import brandRoutes from './routes/brand.routes'
import categoryRoutes from './routes/category.routes'
import productRoutes from './routes/product.routes'
import WishListRoutes  from './routes/wishlist.routes' ;
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI ?? '';

ConnectDatabase(DB_URI);

//using middlewares
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())

//serving uploads as static file
app.use('/api/uploads',express.static("uploads/"))

app.get('/',(req:Request, res:Response) => {

  res.status(200).json({
    message: 'Server is up and running',
  });
});

//using routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product',productRoutes)
app.use('/api/wishList',WishListRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)


app.all('/{*all}',(req: Request, res: Response) => {
  const message = `Cannot ${req.method} @ ${req.originalUrl}`;
  throw new CustomError(message, 404);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//using error handler middleware 
app.use(errorHandler)