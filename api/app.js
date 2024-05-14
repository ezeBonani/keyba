import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import mailRoute from "./routes/mail.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(cookieParser()); //middleware para las cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
); //middleware para los CORS
app.use(express.json()); //middleware para gestionar data json

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/mail", mailRoute);

//console.log(path.join(__dirname, "/client/dist"));

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.listen(8800, () => {
  console.log("Server is running!");
});
