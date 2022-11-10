"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const keycloak = __importStar(require("../external/keycloak"));
const config_1 = require("../config");
class GlobalToken {
    static getAccessToken() {
        return this.accessToken;
    }
    static getRefreshToken() {
        return this.refreshToken;
    }
    static update(token) {
        this.clientId = token.clientId;
        this.accessToken = token.accessToken;
        this.expiresIn = token.expiresIn;
        this.refreshToken = token.refreshToken;
        this.startUpdateTokenTimer();
    }
    static startUpdateTokenTimer() {
        if (this.currentTimer) {
            clearTimeout(this.currentTimer);
        }
        const milliseconds = this.expiresIn * 1000;
        this.currentTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const tokenBody = {
                client_id: this.clientId,
                client_secret: config_1.CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: this.refreshToken,
            };
            try {
                const tokenInfo = yield keycloak.refreshToken(tokenBody);
                this.update({
                    clientId: this.clientId,
                    accessToken: `Bearer ${tokenInfo.access_token}`,
                    expiresIn: tokenInfo.expires_in,
                    refreshToken: tokenInfo.refresh_token,
                });
                console.log("=> Token refreshed");
            }
            catch (error) {
                console.error("Error auto-refreshing token:", error);
            }
        }), milliseconds);
    }
}
exports.default = GlobalToken;
GlobalToken.clientId = "";
GlobalToken.accessToken = "";
GlobalToken.expiresIn = 0;
GlobalToken.refreshToken = "";
GlobalToken.currentTimer = null;
