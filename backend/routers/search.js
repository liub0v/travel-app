const express = require("express");

module.exports = (Model) => {
  const router = express.Router();
  const userRouter = express.Router();
  router.get("/search", async (req, res) => {
    const term = req.query.term;
    const array = term.split(" ");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = (page - 1) * limit;
    const regexString = array.map((item) => `(?=.*${item})`).join("");
    const regex = new RegExp(regexString, "i");

    const result = await Model.find({
      $or: [{ name: regex }, { address: regex }],
    })
      .sort({ _id: 1 })
      .skip(startIndex)
      .limit(limit)
      .populate("rating");

    res.send(result);
  });
  userRouter.get("/search", async (req, res) => {
    const term = req.query.term;
    const array = term.split(" ");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = (page - 1) * limit;
    const regexString = array.map((item) => `(?=.*${item})`).join("");
    const regex = new RegExp(regexString, "i");

    const result = await Model.find({
      $or: [
        { "profileInfo.firstName": regex },
        { "profileInfo.lastName": regex },
        { "profileInfo.address": regex },
        { "userID.username": regex },
      ],
    })
      .sort({ _id: 1 })
      .skip(startIndex)
      .limit(limit)
      .populate("userID");

    res.send(result);
  });
  return { router, userRouter };
};
