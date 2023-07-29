const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let { error } = validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("Incorrect Email or Password");
    } else {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        res.status(400).send("Incorrect Email or Password");
      } else {
        const token = user.generateAuthToken();
        res.send(token);
      }
    }
  }
});

function validate(body) {
  let userSchema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
  });
  return (res = userSchema.validate(body));
}

module.exports = router;
