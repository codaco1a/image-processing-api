import e, { Request, Response } from 'express'; // express packages
import images from './processing/images'; // importing image object

const router = e.Router(); // make a router object

// endpoint level middlware, using Request and Response
router.get('/', (request: Request, respon: Response) => {
  respon.sendStatus(200);
});

router.use('/images', images); // router uses image object

// exporting router to the application
export default router;
