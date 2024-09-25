import express from "express";
import cors from "cors";
import session from "express-session";
import { configs } from "./configs/index.js";
import SequelizeStore from "connect-session-sequelize";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import dbSequelize from "./configs/index.js";

const app = express();
let api = "/api";
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
app.use(cors()); // Untuk mengizinkan akses dari frontend
app.use(express.json()); // Untuk membaca request body berformat JSON
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
app.use(api, authRoute);
app.use(api, userRoute);
app.use(api, productRoute);

// store.sync();

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server is running on http://localhost:${configs.port}`);
});
