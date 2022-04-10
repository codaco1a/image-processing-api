"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Back-end with node.js runtime environment
// Import packages
const express_1 = __importDefault(require("express")); // express packages
const router_1 = __importDefault(require("./routes/router")); // import router from routes folder
const process_1 = __importDefault(require("process")); // global process packages, node's core modules
// Build an application object using express
const smellyCat = (0, express_1.default)();
// App uses routes as it's router
smellyCat.use('/', router_1.default);
// App listens for 3152 port
smellyCat.listen(3152, () => {
    // This method does not force new line, '\n' at the end does so
    process_1.default.stdout.write('SmellyCatApp is running on localhost:3152\n');
});
// export modules and app object, to apply unit testing with jasmine frame-work
exports.default = {
    smellyCat,
};
