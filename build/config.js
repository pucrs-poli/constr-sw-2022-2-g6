"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = exports.API_PORT = exports.CLIENT_SECRET = exports.REALM_NAME = exports.KEYCLOAK_HOST = exports.KEYCLOAK_PORT = void 0;
/*
    Keycloak configuration.
*/
exports.KEYCLOAK_PORT = 8080;
exports.KEYCLOAK_HOST = process.env.KEYCLOAK_HOST || "localhost";
exports.REALM_NAME = "constr-sw-2022-2";
exports.CLIENT_SECRET = "BzXf20nFQCTPgpkekx3XHt2yOygLXj23";
/*
    API configuration.
*/
exports.API_PORT = 3000;
// mongo db
exports.MONGO_URL = "mongodb://localhost:27017/diciplina_db";
