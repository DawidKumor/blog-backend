import "dotenv/config";
import express, { type Express, type Request, type Response } from 'express';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // body middleware
app.use("/api/auth", authRoutes)
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: "ok" });
});
async function start() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

start();

