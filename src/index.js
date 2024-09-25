import express from "express";
import cors from "cors";
import session from "express-session";
import { configs } from "./configs/index.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import dbSequelize from "./configs/index.js";

const app = express();
let api = "/api";

// sync ke database
dbSequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Middlewares
app.use(cors()); // Untuk mengizinkan akses dari frontend
app.use(express.json()); // Untuk membaca request body berformat JSON
app.use(
  session({
    secret: configs.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

// Routes
app.use(api, userRoute);
app.use(api, productRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server is running on http://localhost:${configs.port}`);
});
