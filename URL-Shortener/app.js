import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { shortenerRouter } from "./routes/shortener.routes.js";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", shortenerRouter);
app.set("view engine", "ejs");
app.set("views", "./views");
// app.use("/", shortener.routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
