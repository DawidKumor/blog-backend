import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();
async function start() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}




const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: "ok" })
});
start();

