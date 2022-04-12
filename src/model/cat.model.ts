import mongoose from "mongoose";

const Image = new Object({
  id: { type: String },
  url: { type: String },
  height: { type: Number },
  width: { type: Number },
});

const Weight = new Object({
  imperial: { type: String },
  metric: { type: String },
});

const CatSchema = new mongoose.Schema({
  adaptability: { type: Number, default: 0 },
  affectionLevel: { type: Number, default: 0 },
  altNames: { type: String },
  acfUrl: { type: String },
  childFriendly: { type: Number, default: 0 },
  countryCode: { type: String },
  countryCodes: { type: String },
  description: { type: String },
  dogFriendly: { type: Number, default: 0 },
  energyLevel: { type: Number, default: 0 },
  experimental: { type: Number, default: 0 },
  grooming: { type: Number, default: 0 },
  hairless: { type: Number, default: 0 },
  healthIssues: { type: Number, default: 0 },
  hypoallergenic: { type: Number, default: 0 },
  id: { type: String, unique: true, required: true },
  image: { type: Image },
  inDoor: { type: Number, default: 0 },
  intelligence: { type: Number, default: 0 },
  lap: { type: Number, default: 0 },
  lifeSpan: { type: String },
  name: { type: String },
  natural: { type: Number, default: 0 },
  origin: { type: String },
  rate: { type: Number, default: 0 },
  referenceImageId: { type: String },
  rex: { type: Number, default: 0 },
  sheddingLevel: { type: Number, default: 0 },
  shortLegs: { type: Number, default: 0 },
  socialNeeds: { type: Number, default: 0 },
  strangerFriendly: { type: Number, default: 0 },
  suppressedTail: { type: Number, default: 0 },
  temperament: { type: String },
  vcahospitalsUrl: { type: String },
  vetstreetUrl: { type: String },
  vocalisation: { type: Number, default: 0 },
  weight: { type: Weight },
  wikipediaUrl: { type: String },
});

const Cat = mongoose.model("cats", CatSchema);

export default Cat;
