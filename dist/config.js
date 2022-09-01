"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MISSING_SETTINGS = "Warning: no value is for enviornment variable";
const config = {
    "PORT": process.env.PORT || MISSING_SETTINGS,
    "SESSION_SECRET": process.env.SESSION_SECRET || MISSING_SETTINGS,
    "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID || MISSING_SETTINGS,
    "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET || MISSING_SETTINGS,
    "GITHUB_CALLBACK_URL": process.env.GITHUB_CALLBACK_URL || MISSING_SETTINGS
};
exports.default = config;
