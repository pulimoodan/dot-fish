import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  CategoryRoute,
  CustomerRoute,
  OrderRoute,
  ProductRoute,
  SettingRoute,
} from "./routes/index.js";
import { resolve } from "path";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", ProductRoute);
app.use("/api/customers", CustomerRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/settings", SettingRoute);
app.use("/api/categories", CategoryRoute);

// admin
app.use(
  "/admin",
  express.static(resolve("./admin", "dist"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);
app.get("/admin/*", (req, res) => {
  res.sendFile(resolve("./admin/dist", "index.html"));
});

// client
app.use(
  "/",
  express.static(resolve("./client", "dist"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);
app.get("/*", (req, res) => {
  res.sendFile(resolve("./client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
