import express from "express";
import cors from "cors";
import session from "express-session";
import { configs } from "./configs/index.js";
import SequelizeStore from "connect-session-sequelize";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import dbSequelize from "./configs/index.js";
import cookieParser from "cookie-parser";

const app = express();
const api = "/api";
const sessionStore = SequelizeStore(session.Store); // Session store untuk menyimpan session ke database

const store = new sessionStore({
  // Inisialisasi session store
  db: dbSequelize, // Database Sequelize
});

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
app.use(cors(
  {
    origin: ["http://localhost:3000", "https://frontend-multirole-auth.netlify.app"],
    credentials: true,
  }
));
app.use(express.json()); // Untuk membaca request body berformat JSON
app.use(express.urlencoded({ extended: true })); // Untuk membaca request body dari form URL encoded
app.use(cookieParser())
app.use(
  session({
    secret: configs.secret,
    resave: false,
    saveUninitialized: true,
    store: store, // Store session ke database
    cookie: {
      secure: "auto",
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API Multi Role Authentication",
  });
});
app.use(api, authRoute);
app.use(api, userRoute);
app.use(api, productRoute);

app.listen(configs.port, () => {
  console.log(`🚀 Server is running on http://localhost:${configs.port}`);
});

export default app;
