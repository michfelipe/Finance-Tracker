// eQSnNAopJwKRnFKr
import express, { Express } from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from './routes/financial-records';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const MONGO_DB_URI_USER_PASS = process.env.MONGO_DB_URI_USER_PASS;
const mongoUri: string = `mongodb+srv://${MONGO_DB_URI_USER_PASS}@personalfinancetracker.aeyps.mongodb.net`;

mongoose
    .connect(mongoUri)
    .then(() => console.log('CONNECTED TO MONGODB'))
    .catch((err) => console.error('Failed to connect to MongoDB: ', err));

app.use('/financial-records', financialRecordRouter);

app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`);
});
