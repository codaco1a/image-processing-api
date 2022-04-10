'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express')); // express packages
const fs = __importStar(require('fs')); // fileSystem packages, node's core modules
const path_1 = __importDefault(require('path')); // path module, core module
const sharp_1 = __importDefault(require('sharp')); // Image processing package, uses lib
// create song object
const song = (0, express_1.default)();
song.get('/', (request, respon) => {
  const w = request.query.width;
  const width = parseInt(w);
  const h = request.query.height; // Type assertion to string, parseInt() accepts string value
  const height = parseInt(h); // To make sure that it is a number
  const way =
    path_1.default.resolve(__dirname, '..', '..', '..') +
    `\\Assets\\thumb\\da-song-thumb${width}x${height}.jpg`;
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
      // else process the image from '.\Assets\full' directory, then send it immediately
    } else {
      console.log({ msg: "Image Doesn't Exist" });
      // Using sharp image processing package to dynamically resize the same image to different sizes
      (0, sharp_1.default)(
        path_1.default.resolve(__dirname, '..', '..', '..') +
          '.\\Assets\\full\\da-song.jpg'
      )
        .resize(width, height)
        .toFile(
          path_1.default.resolve(__dirname, '..', '..', '..') +
            `\\Assets\\thumb\\da-song-thumb${width}x${height}.jpg`
        )
        .then(() => {
          respon.sendFile(way);
          console.log('Image have been created, and sent');
        })
        .catch(() => {
          console.log('failed processing!');
        });
      // I used .then() instead of setTimeout() due to  it's immediate performance
    }
    //  If something went wrong try this
  } catch (err) {
    console.log('Ops, Something Went Wrong!');
  }
});
// export song object to router
exports.default = song;
