import express from "express";
import routes from "./routes/routes";

import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import { load } from "yamljs";
const swaggerDocument = load("./swagger.yml");

const port = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/api/docs", serve, setup(swaggerDocument));

app.listen(port, () => console.log(`\nApp listening on port ${port}!`));


// const app = require('express')()
// const http = require('http')
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('./swagger_output.json')
// http.createServer(app).listen(3000)
// console.log("Listening at:// port:%s (HTTP)", 3000)
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// require('./endpoints')(app)