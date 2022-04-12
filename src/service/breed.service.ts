import Cat from "../model/cat.model";

export async function FindAll(sortBy: string) {
  switch (sortBy) {
    case "id":
      return await Cat.find().sort(sortBy);

    case "name":
      return await Cat.find().sort(sortBy);

    default:
      return await Cat.find();
  }
}

export async function FindOne(breedName: string) {
  const name = breedName.split("-");

  for (let i = 0; i < name.length; i++) {
    name[i] = name[i][0].toUpperCase() + name[i].substr(1).toLowerCase();
  }
  breedName = name.join(" ");

  const result = await Cat.findOne({ name: breedName });
  return result;
}
