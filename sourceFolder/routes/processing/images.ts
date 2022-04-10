import e, { Request, Response } from 'express'; // express packages
import * as fs from 'fs'; // fileSystem packages, node's core modules
import p from 'path'; // path module, core module
import utilities from '../../util/separateUtilities';

// create image object
const images = e();

images.get('/', (request: Request, respon: Response) => {
  // Note that imageNameFunc() from utilities is a generic function
  const baseWay: string = p.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'full',
    `${utilities.imageNameFunc<string>(request)}.jpg`
  ); // Call a generic function to return type of string
  const way: string = p.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'thumb',
    `${utilities.imageNameFunc<string>(request)}-thumb-${utilities.getWidthFunc(
      request
    )}x${utilities.getHeightFunc(request)}.jpg`
  );
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
    } else if (
      utilities.imageNameFunc(request) &&
      utilities.getWidthFunc(request) &&
      utilities.getHeightFunc(request)
    ) {
      console.log({ msg: "Image Doesn't Exist" });

      // This promise function from utilities folder as required, returns a promise, uses sharp API
      // nested function return width, height as numbers, and filename as string
      utilities
        .transform(
          baseWay,
          utilities.getWidthFunc(request),
          utilities.getHeightFunc(request),
          way
        )
        .then(() => {
          respon.sendFile(way);
          console.log('Image have been created, and sent');
        })
        .catch(() => {
          respon.send({ chooseFileFrom: 'smelly-cat, da-song, cafe, poster' });
          console.log('Image failed processing');
        }); // I used .then() instead of setTimeout() due to  it's immediate performance
    } else {
      respon.send(
        'choose the right filename!, smelly-cat, da-song, cafe, poster, !!add width and height to the query'
      );
      console.log(
        'choose the right filename: smelly-cat, da-song, cafe, poster, add !!width and height to the query'
      );
    }

    //  If something went wrong try this
  } catch (err: unknown) {
    respon.send('Ops, Something Went Wrong!');
    console.log('Ops, Something Went Wrong!');
  }
});

// export image object to router
export default images;
