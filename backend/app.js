import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/db.js";
import userRoutes from "./src/routes/user.router.js";
const app = express();
dotenv.config()

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials:true,
    allowedHeaders:['Content-Type','Authorization']
}))

const PORT = process.env.PORT || 3000;
connectDb();

app.use("/api/v1",userRoutes);

app.listen(PORT, () => {
    console.log(`Server is Running: http://localhost:${PORT}`)
});