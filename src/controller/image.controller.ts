import express, { Request, Response } from "express";
import {
  FindOne,
  FindRandom,
  AttachImage,
  DeleteImage,
} from "../service/image.serviec";
import multer from "multer";
import log from "../logger/index";

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const router = express.Router();

// ```
// POST /api/images
// ```
// Uploads an image. Add functionality to attach the Image to a specific Breed.
router.post("", upload.single("image"), async (req: Request, res: Response) => {
  if (req.file?.fieldname != "image") return res.sendStatus(400);
  await AttachImage(req.file);
  log.info("Post new image to database.");
  return res.send("file uploaded");
});

// ```
// DELETE /api/images/{image_id}
// ```
// Deletes an Image
router.delete("/:id", async (req: Request, res: Response) => {
  if ((await DeleteImage(req.params.id)) == false) {
    log.warn(`Can not find this image id: ${req.params.id}`);
    return res.sendStatus(404);
  }
  log.info(`Delete the image has id is ${req.params.id} from database`);
  return res.send();
});

// ```
// GET /api/images/random
// ```
// Retrieves a random list of images with their respective urls. Supports query parameter to specify amount of Images (max 20) and breed.
router.get("/random", async (req: Request, res: Response) => {
  try {
    log.info("Query some images from databse");
    return res.send(await FindRandom(req.query.count));
  } catch (err) {
    log.error(err);
    return res.sendStatus(400);
  }
});

// ```
// GET /api/images/{image_id}
// ```
// Returns an Image with a URL to view it.
router.get("/:id", async (req: Request, res: Response) => {
  const image = await FindOne(req.params.id);
  if (image == null) {
    log.warn(`Can not find this image id: ${req.params.id}`);
    return res.sendStatus(404);
  }
  log.info(`Get the image has id is ${req.params.id} from database`);
  return res.send(image);
});

export = router;
