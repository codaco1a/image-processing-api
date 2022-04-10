import { Request } from 'express';
import shark from 'sharp'; // import sharp packages in separate utilities folder as required

// async function with typing as required, please notice the PascalCase naming of the word Promise
const transform = async (
  baseWay: string,
  width: number,
  height: number,
  way: string
): Promise<unknown> => {
  return await shark(baseWay).resize(width, height).toFile(way);
};

const imageNameFunc = function <T>(req: Request): T {
  const getImageName: T = req.query.filename as unknown as T;
  return getImageName; // return imageName string
};

const getWidthFunc = function (req: Request): number {
  const w = req.query.width as unknown as string;
  const parseWidth = parseInt(w);
  return parseWidth; // return width number
};

const getHeightFunc = function (req: Request): number {
  const h = req.query.height as unknown as string; // Type assertion to string, parseInt() accepts string value
  const parseHeight: number = parseInt(h); // To make sure that it is a number
  return parseHeight; // return height number
};

// export the promise to images object
export default {
  transform,
  getWidthFunc,
  getHeightFunc,
  imageNameFunc,
};
