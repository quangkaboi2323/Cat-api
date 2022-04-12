import express, { Request, Response } from "express";
import { FindAll, FindOne } from "../service/breed.service";
import log from "../logger/index";

const router = express.Router();

//GET /api/breeds

// Retreives a list of breeds from the Database
// > Extra Credit: \
// Add functionality to be able to order the results by a specific parameter
router.get("", async (req: Request, res: Response) => {
  const sortBy: string = req.query.sort as string;

  log.info(`Query list breeds and sort by ${req.query.sort}`);
  return res.send(await FindAll(sortBy));
});

//GET /api/breeds/{breed_name}
//Retrieves information on a specific breed, which is defined in place of `{breed_name}` using the `kebab-case` convention.
router.get("/:name", async (req: Request, res: Response) => {
  const breed = await FindOne(req.params.name);
  if (breed == null) {
    log.warn("Breed is not found!");
    return res.sendStatus(404);
  }
  log.info(`Query ${req.params.name} from dataabse`);
  return res.send(breed);
});

export = router;
