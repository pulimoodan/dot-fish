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

app.get("/admin/*", express.static(resolve("../frontend", "dist")));
app.get("/*", express.static(resolve("../client", "dist")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
