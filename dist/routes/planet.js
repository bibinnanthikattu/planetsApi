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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const lib_1 = require("../middleware/lib");
const planetValidationType_1 = require("../middleware/lib/planetValidationType");
const prisma = new client_1.PrismaClient();
const multer_1 = require("../middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const passport_1 = require("../middleware/passport");
const route = (0, express_1.Router)();
// get route api
route.get("/", async (req, res) => {
    const planet = req.body;
    const response = await prisma.planet.findMany();
    res.json(response);
    console.log("success!!");
});
// get a specific item
route.get("/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);
    const response = await prisma.planet.findUnique({
        where: { id: planetId }
    });
    if (!response) {
        res.status(404);
        return next(`can't find item with id of ${planetId}`);
    }
    res.json(response);
});
// post route api
route.post("/", passport_1.checkAuthorization, (0, lib_1.validate)({ body: planetValidationType_1.planetSchema }), async (req, res) => {
    const planet = req.body;
    const response = await prisma.planet.create({
        data: planet,
    });
    res.send(response);
    console.log(response);
});
// update route api
route.put("/:id(\\d+)", passport_1.checkAuthorization, (0, lib_1.validate)({ body: planetValidationType_1.planetSchema }), async (req, res, next) => {
    const planetId = Number(req.params.id);
    const planetData = req.body;
    try {
        const response = await prisma.planet.update({
            where: { id: planetId },
            data: planetData
        });
        res.json(response);
    }
    catch (error) {
        res.status(404);
        next(error);
    }
});
// Delete route api
route.delete("/:id(\\d+)", passport_1.checkAuthorization, async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        const resposne = await prisma.planet.delete({
            where: { id: planetId },
        });
        console.log('deleted successfully');
    }
    catch (error) {
        res.status(422);
        next(error);
    }
});
// File upload route
route.post("/:id(\\d+)/photo", passport_1.checkAuthorization, upload.single("photo"), async (req, res, next) => {
    if (!req.file) {
        res.status(422);
        return next("No file uploaded!");
    }
    const planetId = Number(req.params.id);
    const photoFilename = req.file.filename;
    try {
        await prisma.planet.update({
            where: { id: planetId },
            data: { photoFilename }
        });
        res.status(201).send();
    }
    catch (error) {
        res.status(404);
        next(error);
    }
});
// middleware for displaying image in browser
route.use("planets/photo", express_1.default.static("uploads"));
exports.default = route;
