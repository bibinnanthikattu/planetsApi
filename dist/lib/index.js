"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorMiddleware = exports.validate = void 0;
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const validator = new express_json_validator_middleware_1.Validator({});
(0, ajv_formats_1.default)(validator.ajv, ["date-time"])
    .addKeyword("kind")
    .addKeyword("modifier");
exports.validate = validator.validate;
const validationErrorMiddleware = (error, req, res, next) => {
    if (error instanceof express_json_validator_middleware_1.ValidationError) {
        res.status(422).send({
            errors: error.validationErrors
        });
        next();
    }
    else {
        next(error);
    }
};
exports.validationErrorMiddleware = validationErrorMiddleware;
