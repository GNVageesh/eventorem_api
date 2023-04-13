import express, { json, urlencoded } from "express";
import cors from "cors";
import router from "./util/api.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Application mainframe running" });
});

app.listen(process.env.PORT || PORT, (error) => {
  if (!error) console.log("Server is running 🚀");
  else console.log("Error occurred, server can't start", error);
});
