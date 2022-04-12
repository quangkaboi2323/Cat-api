import Cat from "../model/cat.model";
import sizeOf from "image-size";
import crypto from "crypto";

export async function FindOne(id: string) {
  return await Cat.findOne({ "image.id": id }).select({
    "image.url": 1,
    _id: 0,
  });
}

export async function FindRandom(randomCount: any) {
  if (randomCount == null) randomCount = 1;

  if (randomCount > 20 || randomCount <= 0)
    throw Error("Random count is wrong!");

  const cats = await Cat.find().select({
    "image.url": 1,
    _id: 0,
  });

  let result: any[] = [];
  for (let i = 0; i < randomCount; i++) {
    result.push(cats[Math.floor(Math.random() * cats.length)]);
  }

  return result;
}

export async function AttachImage(imageFile: any) {
  const dimensions = sizeOf("uploads/" + imageFile.filename);
  const widthImage = dimensions.width;
  const heightImage = dimensions.height;

  Cat.create({
    id: crypto.randomBytes(4).toString("hex"),
    image: {
      id: imageFile.originalname,
      url: imageFile.filename,
      width: widthImage,
      height: heightImage,
    },
  });
}

export async function DeleteImage(id: string) {
  const breed = await Cat.findOne({ "image.id": id });
  if (breed == null) return false;
  await Cat.deleteOne({ "image.id": id });
  return true;
}
