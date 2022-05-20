'use strict';
require("dotenv").config();
const express = require("express");
const router = express.Router();
const request = require("request");


// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", async (req, res) => {
    // console.log(req.params.username);
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=
        5&sort=created:asc&client_id=${process.env.github_CLIENT_ID}&client_secret=${process.env.github_CLIENT_SECRET}`,
        method: "GET",
        headers: { "user-agent": "node.js" },
      };
      request(options, (error, response, body) => {
        if (error) console.error(error);
        if (response.statusCode != 200) {
          res.status(404).json({ msg: "No Github Profile found" });
        }
       console.log(JSON.parse(body))
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: "No Github profile found" });
    }
  });
  
  module.exports = router;