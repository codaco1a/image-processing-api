"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // express packages
const images_1 = __importDefault(require("./processing/images")); // importing image object
const router = express_1.default.Router(); // make a router object
// endpoint level middlware, using Request and Response
router.get('/', (request, respon) => {
    respon.sendStatus(200);
});
router.use('/images', images_1.default); // router uses image object
// exporting router to the application
exports.default = router;
