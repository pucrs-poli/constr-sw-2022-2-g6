"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./docs/swagger.json"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const SWAGGER_ENDPOINT = `http://localhost:${config_1.API_PORT}/api-docs`;
const router = new routes_1.default(app);
router.setupRoutes();
mongoose_1.default.connect("mongodb://localhost:27017/diciplina_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
app.listen(config_1.API_PORT, () => {
    console.log(`Backend running on port ${config_1.API_PORT}.\n`);
    console.log(`Swagger docs available at ${SWAGGER_ENDPOINT}.\n`);
});
