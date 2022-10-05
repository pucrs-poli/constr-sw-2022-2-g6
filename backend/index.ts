import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import { API_PORT } from "./config";
import Router from "./routes/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const SWAGGER_ENDPOINT = `http://localhost:${API_PORT}/api-docs`;

const router = new Router(app);
router.setupRoutes();

app.listen(API_PORT, () => {
  console.log(`Backend running on port ${API_PORT}.\n`);
  console.log(`Swagger docs available at ${SWAGGER_ENDPOINT}.\n`);
});




// import express from "express";
// import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "swagger.json";
// import { API_PORT } from "config";
// import Router from "./routes/routes";

// const express = require("express")
// const cors = require("cors")
// const morgan = require("morgan")


// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const SWAGGER_ENDPOINT = `http://localhost:${API_PORT}/api-docs`;

// const router = new Router(app);
// router.setupRoutes();

// app.listen(API_PORT, () => {
//   console.log(`Backend running on port ${API_PORT}.\n`);
//   console.log(`Swagger docs available at ${SWAGGER_ENDPOINT}.\n`);
// });




// import express from "express";
// import routes from "./routes/routes";

// import cors from "cors";
// import { serve, setup } from "swagger-ui-express";
// import { load } from "yamljs";
// const swaggerDocument = load("./docs/swagger.json");

// const port = 3000;
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(routes);
// app.use("/api/docs", serve, setup(swaggerDocument));

// app.listen(port, () => console.log(`\nApp listening on port ${port}!`));

