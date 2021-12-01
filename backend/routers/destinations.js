const { Destination, validate } = require("../models/destiantion");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const router = require("express").Router();
const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const destinations = await Destination.find();
  if (!destinations.length)
    return res.status(404).send("Destinations is empty");
  res.send(destinations);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const image = req.body.image;
  const imageURL = image
    ? await uploadToCloud(req.body.image, "destinations")
    : DEFAULT_COVER_IMAGE_URL;

  const destination = new Destination({
    countryName: req.body.countryName,
    imageURL: imageURL,
  });
  await destination.save();
  res.send(destination);
});
router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const destination = await Destination.findById(req.body.id);
  if (!destination) return res.status(404).send("Destination doesn't exist");

  const newImage = req.body.image;
  let imageURL;
  if (newImage) {
    if (destination.imageURL === DEFAULT_COVER_IMAGE_URL) {
      imageURL = await uploadToCloud(newImage, "destinations");
    } else {
      imageURL = await updateCloudImage(
        destination.imageURL,
        newImage,
        "destinations"
      );
    }
  }
  destination.imageURL = imageURL ?? destination.imageURL;
  destination.countryName = req.body.countryName ?? destination.countryName;
  await destination.save();
  res.send(destination);
});
router.delete("/", async (req, res) => {
  const destination = await Destination.findByIdAndDelete(req.body.id);
  if (!destination) res.status(404).send("Destination doesn't exist");

  if (destination.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(destination.imageURL, "destinations");
  }

  res.send(destination);
});
module.exports = router;
