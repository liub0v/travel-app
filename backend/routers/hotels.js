const { Hotel, validate } = require("../models/hotel");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const { Adventure } = require("../models/adventure");
const router = require("express").Router();
const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  const hotels = await Hotel.find()
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  if (!hotels.length) return res.status(404).send("Hotel is empty");
  res.send(hotels);
});
router.get("/ByDestination", async (req, res) => {
  const destination = req.query.destination;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  await Hotel.createIndexes();
  const hotels = await Hotel.find({ $text: { $search: destination } })
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  res.send(hotels);
});
router.delete("/gallery", async (req, res) => {
  const hotel = await Hotel.findById(req.body.id);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");

  const index = hotel.gallery.indexOf(req.body.imageURL);
  index > -1 && hotel.gallery.splice(index, 1);
  req.body.imageURL &&
    (await removeFromCloud(req.body.imageURL, "hotelsGallery"));
  await hotel.save();
  res.send(hotel);
});
router.post("/gallery", async (req, res) => {
  const hotel = await Hotel.findById(req.body.id);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");
  const gallery = [];
  for (let prop in req.body) {
    if (prop.includes("image_")) {
      const imageURL = await uploadToCloud(req.body[prop], "hotelsGallery");
      gallery.push(imageURL);
    }
  }
  hotel.gallery.push(...gallery);
  await hotel.save();
  res.send(hotel);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const image = req.body.image;
  const imageURL = image
    ? await uploadToCloud(req.body.image, "hotels")
    : DEFAULT_COVER_IMAGE_URL;

  const hotel = new Hotel({
    name: req.body.name,
    imageURL: imageURL,
    summary: req.body?.summary,
    price: req.body?.price,
    address: req.body?.address,
    reviews: req.body?.reviews,
    hotelOptions: req.body?.hotelOptions,
    beds: req.body?.beds,
    starsNumber: req.body?.starsNumber,
  });
  await hotel.save();
  res.send(hotel);
});
router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const hotel = await Hotel.findById(req.body.id);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");

  const newImage = req.body.image;
  let imageURL;
  if (newImage) {
    if (hotel.imageURL === DEFAULT_COVER_IMAGE_URL) {
      imageURL = await uploadToCloud(newImage, "hotels");
    } else {
      imageURL = await updateCloudImage(hotel.imageURL, newImage, "hotels");
    }
  }
  hotel.name = req.body?.name ?? hotel.name;
  hotel.imageURL = imageURL ?? hotel.imageURL;
  hotel.summary = req.body?.summary ?? hotel.summary;
  hotel.price = req.body?.price ?? hotel.price;
  hotel.address = req.body?.address ?? hotel.address;
  hotel.reviews = req.body?.reviews ?? hotel.reviews;
  hotel.hotelOptions = req.body?.hotelOptions ?? hotel.hotelOptions;
  hotel.beds = req.body?.beds ?? hotel.beds;
  hotel.starsNumber = req.body?.starsNumber ?? hotel.starsNumber;

  await hotel.save();
  res.send(hotel);
});
router.delete("/", async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.body.id);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");

  if (hotel.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(hotel.imageURL, "hotelsGallery");
  }
  for (let item of hotel.gallery) {
    await removeFromCloud(item, "hotelsGallery");
  }

  res.send(hotel);
});
module.exports = router;
