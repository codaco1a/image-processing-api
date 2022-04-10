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
const smellyCatApp_1 = __importDefault(require("../smellyCatApp")); // importing the app from it source
const supertest_1 = __importDefault(require("supertest")); // importing supertest packages
const separateUtilities_1 = __importDefault(require("../util/separateUtilities"));
const path_1 = __importDefault(require("path"));
const baseWay = path_1.default.join(__dirname, '..', '..', 'Assets', 'full', 'smelly-cat.jpg');
const way = path_1.default.join(__dirname, '..', '..', 'Assets', 'thumb', 'smelly-cat-thumb-700x500.jpg');
// Test that the application object is truthy
describe('test application object', () => {
    it('isTruthy', () => {
        expect(smellyCatApp_1.default).toBeTruthy();
    });
});
// This is udacity demonstration code, though it doesn't work
// Help here
describe('test endpoints', () => {
    it('root path not to throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(smellyCatApp_1.default).get('/');
        expect(response).not.toThrowError();
    }));
});
describe('test sharp AIP', () => {
    it('rezising works', () => {
        expect(separateUtilities_1.default.transform(baseWay, 700, 500, way)).toBeTruthy();
    });
});
