import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs/swagger.json";
import { API_PORT } from "./config";
import Router from "./routes/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const SWAGGER_ENDPOINT = `http://localhost:${API_PORT}/api-docs`;

const router = new Router(app);
router.setupRoutes();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/diciplina_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

app.listen(API_PORT, () => {
  console.log(`Backend running on port ${API_PORT}.\n`);
  console.log(`Swagger docs available at ${SWAGGER_ENDPOINT}.\n`);
});
