import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";

export function RegisterSwagger(app: Express) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { persistAuthorization: true }
    }));
}