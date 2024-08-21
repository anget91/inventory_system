import express, { json, urlencoded } from "express";
import { config as configDotenv } from "dotenv";
import { configureDependencies } from "./config/dependencyInjector.js";
import path from "path";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3300;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static('public'));

configureDependencies(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
