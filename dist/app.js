"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const index_1 = require("./middleware/lib/index");
const planet_1 = __importDefault(require("./routes/planet"));
const passport_1 = require("./middleware/passport");
const session_1 = require("./middleware/session");
const auth_1 = __importDefault(require("./routes/auth"));
// middleware
// authentification middleware
app.use((0, session_1.initSessionMiddleware)());
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// planet routes
app.use("/planets", planet_1.default);
// authentication routes
app.use("/auth", auth_1.default);
// validationError middleware
app.use(index_1.validationErrorMiddleware);
exports.default = app;
