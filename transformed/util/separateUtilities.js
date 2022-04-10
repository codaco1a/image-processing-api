"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp")); // import sharp packages in separate utilities folder as required
// async function with typing as required, please notice the PascalCase naming of the word Promise
const transform = (baseWay, width, height, way) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, sharp_1.default)(baseWay).resize(width, height).toFile(way);
});
const imageNameFunc = function (req) {
    const getImageName = req.query.filename;
    return getImageName; // return imageName string
};
const getWidthFunc = function (req) {
    const w = req.query.width;
    const parseWidth = parseInt(w);
    return parseWidth; // return width number
};
const getHeightFunc = function (req) {
    const h = req.query.height; // Type assertion to string, parseInt() accepts string value
    const parseHeight = parseInt(h); // To make sure that it is a number
    return parseHeight; // return height number
};
// export the promise to images object
exports.default = {
    transform,
    getWidthFunc,
    getHeightFunc,
    imageNameFunc,
};
