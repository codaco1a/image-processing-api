"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // express packages
const fs = __importStar(require("fs")); // fileSystem packages, node's core modules
const path_1 = __importDefault(require("path")); // path module, core module
const separateUtilities_1 = __importDefault(require("../../util/separateUtilities"));
// create image object
const images = (0, express_1.default)();
images.get('/', (request, respon) => {
    // Note that imageNameFunc() from utilities is a generic function
    const baseWay = path_1.default.join(__dirname, '..', '..', '..', 'Assets', 'full', `${separateUtilities_1.default.imageNameFunc(request)}.jpg`); // Call a generic function to return type of string
    const way = path_1.default.join(__dirname, '..', '..', '..', 'Assets', 'thumb', `${separateUtilities_1.default.imageNameFunc(request)}-thumb-${separateUtilities_1.default.getWidthFunc(request)}x${separateUtilities_1.default.getHeightFunc(request)}.jpg`);
    // If everything is ok try this
    try {
        // If the file exists, send the file. Using fileSystem readstream
        if (fs.existsSync(way)) {
            // https://nodejs.org/api/fs.html#fsexistssyncpath
            console.log({ msg: 'Image Exists' });
            // All this to get 200 OK, instead of 304 from '.sendFile(way)'
            const status = fs.statSync(way);
            respon.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': status.size,
            });
            const streamRoad = fs.createReadStream(way);
            streamRoad.pipe(respon);
            // respon.sendFile(way); This cause 304 OK
            console.log('Image have been sent');
            // else if information is available, process the image from '.\Assets\full' directory, then send it immediately
        }
        else if (separateUtilities_1.default.imageNameFunc(request) &&
            separateUtilities_1.default.getWidthFunc(request) &&
            separateUtilities_1.default.getHeightFunc(request)) {
            console.log({ msg: "Image Doesn't Exist" });
            // This promise function from utilities folder as required, returns a promise, uses sharp API
            // nested function return width, height as numbers, and filename as string
            separateUtilities_1.default
                .transform(baseWay, separateUtilities_1.default.getWidthFunc(request), separateUtilities_1.default.getHeightFunc(request), way)
                .then(() => {
                respon.sendFile(way);
                console.log('Image have been created, and sent');
            })
                .catch(() => {
                respon.send({ chooseFileFrom: 'smelly-cat, da-song, cafe, poster' });
                console.log('Image failed processing');
            }); // I used .then() instead of setTimeout() due to  it's immediate performance
        }
        else {
            respon.send('choose the right filename!, smelly-cat, da-song, cafe, poster, !!add width and height to the query');
            console.log('choose the right filename: smelly-cat, da-song, cafe, poster, add !!width and height to the query');
        }
        //  If something went wrong try this
    }
    catch (err) {
        respon.send('Ops, Something Went Wrong!');
        console.log('Ops, Something Went Wrong!');
    }
});
// export image object to router
exports.default = images;
