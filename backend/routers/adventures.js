const { Adventure, validate } = require("../models/adventure");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const router = require("express").Router();
const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  const adventures = await Adventure.find()
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);
  res.send(adventures);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const image = req.body.image;
  const imageURL = image
    ? await uploadToCloud(req.body.image, "adventures")
    : DEFAULT_COVER_IMAGE_URL;

  const adventure = new Adventure({
    name: req.body.name,
    guideID: req.body?.guideID,
    imageURL: imageURL,
    summary: req.body?.summary,
    price: req.body?.price,
    address: req.body?.address,
    reviews: req.body?.reviews,
  });
  await adventure.save();
  res.send(adventure);
});
router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const adventure = await Adventure.findById(req.body.id);
  if (!adventure) return res.status(404).send("Adventures doesn't exist");

  const newImage = req.body.image;
  let imageURL;
  if (newImage) {
    if (adventure.imageURL === DEFAULT_COVER_IMAGE_URL) {
      imageURL = await uploadToCloud(newImage, "adventures");
    } else {
      imageURL = await updateCloudImage(
        adventure.imageURL,
        newImage,
        "destinations"
      );
    }
  }
  adventure.imageURL ||= imageURL;
  adventure.guideID ||= req.body?.guideID;
  adventure.name ||= req.body?.name;
  adventure.summary ||= req.body?.summary;
  adventure.price ||= req.body?.price;
  adventure.address ||= req.body?.address;
  adventure.reviews ||= req.body?.reviews;

  await adventure.save();
  res.send(adventure);
});
router.delete("/", async (req, res) => {
  const adventure = await Adventure.findByIdAndDelete(req.body.id);
  if (!adventure) res.status(404).send("Adventures doesn't exist");

  if (adventure.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(adventure.imageURL, "adventures");
  }

  res.send(adventure);
});
module.exports = router;
