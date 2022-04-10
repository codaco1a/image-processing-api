# About The Project:

This project allows you to dynamically choose from different pictures using **an endpoint**
that will make the server process the image with any given **filename** **width** and **height** you want. 
It's possible to to resize the same image into different sizes.
**If the image exists**, the server will acess the fileSystem and send the existing image.


## Functionality:

http://localhost:3152/images?filename="input-filename"&width="input-width"&height="input-height"
there are four files: smelly-cat, poster, cafe, da-song


## Endpoints:

Right now there is one endpoint: **localhost:3152/images**


## Scripts:

    "transform": "npx tsc",
    "start": "npx tsc && node ./transformed/smellyCatApp",
    "jasmine": "jasmine",
    "yasmine": "npx tsc && npm run jasmine",
    "make-up": "prettier --config .prettierrc ./sourceFolder/**/*.ts --write",
    "review": "eslint --ext .ts ./sourceFolder/**/*.ts",
    "magic": "npm run review && npm run make-up"



## sourceFolder:

All uncompiled TypeScript files are in this folder, a long-side with jasmine tests folder, and reporter.ts


## tsconfig.json:

All files will compile into **transformed** folder. **noImplicitAny** is set to true with **strict** checking.
**lib** is set to ["ES6", "DOM"]


## .prettierrc:

I've added some prettier rules, feel free to add yours.


## .eslintrc.json:

I've included prettier as **extends**, and add it into **plugins**.


## jasmine.json:

helper folder has been changed to be under the name of **Assest**. It search for tests in **transformed** directory


## reporter.ts:

All code from udacity lessons, and comes directly from jasmine reporter documentation.


## .gitignore:

It ignores the **node_modules** packages.
