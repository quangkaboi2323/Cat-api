import { Express, Request, Response } from "express";
import breed from "./controller/breed.controller";
import image from "./controller/image.controller";

export default function (app: Express) {
  app.use("/api/breeds", breed);

  app.use("/api/images", image);

  app.get("/api/images/random", (req: Request, res: Response) =>
    res.sendStatus(200)
  );
}
