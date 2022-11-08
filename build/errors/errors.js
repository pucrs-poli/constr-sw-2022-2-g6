"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.APIError = void 0;
class APIError extends Error {
    constructor(statusCode, error) {
        super();
        this.statusCode = statusCode;
        this.error = error;
    }
    getStatusCode() {
        return this.statusCode;
    }
    getError() {
        return this.error;
    }
}
exports.APIError = APIError;
function handleError(res, err) {
    res.status(err.getStatusCode()).json({ error: err.getError() });
}
exports.handleError = handleError;
