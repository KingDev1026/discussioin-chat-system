const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const keys = require("../../config/keys");
const verify = require("../../utilities/verify-token");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// const Discussion = require("../../models/User");
const Discussion = require("../../models/Discussion");
const Validator = require('validator');

router.get("/", (req, res) => {
  try {
    let jwtUser = jwt.verify(verify(req), keys.secretOrKey);
    let id = mongoose.Types.ObjectId(jwtUser.id);

    Discussion.aggregate()
      .match({ _id: { $not: { $eq: id } } })
      .project({
        password: 0,
        __v: 0,
        date: 0,
      })
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Failure" }));
          res.sendStatus(500);
        } else {
          res.send(users);
        }
      });
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Unauthorized" }));
    res.sendStatus(401);
  }
});

router.post("/create", async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  if(Validator.isEmpty(name) || Validator.isEmpty(description)) {
    return res.status(404).json({invaliddata: "invalid discussion data"});
  }
  
  try {
    let discussion = await Discussion.findOne({ name });
    if(discussion) {
      return res.status(404).json({discussionexists: "discussion name exists"});
    };
    const newDiscussion = new Discussion({
      name: name,
      description: description
    });
    newDiscussion.save();
  }catch(err) {
    console.log(err);
  }
  
});

module.exports = router;