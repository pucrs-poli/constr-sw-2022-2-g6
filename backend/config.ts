/*
    Keycloak configuration.
*/
export const KEYCLOAK_PORT = 8080;
export const KEYCLOAK_HOST = process.env.KEYCLOAK_HOST || "localhost";
export const REALM_NAME = "constr-sw-2022-2";
export const CLIENT_SECRET = "BzXf20nFQCTPgpkekx3XHt2yOygLXj23";

/*
    API configuration.
*/
export const API_PORT = 3000;
// mongo db
export const MONGO_URL =  "mongodb://localhost:27017/diciplina_db";
