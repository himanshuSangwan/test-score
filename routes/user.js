const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Score = require("../models/testScore");

// for creating user in db
router.post("/create/user", (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save user in db",
      });
    }
    res.json(user);
  });
});

// for creating db for scores
router.post("/create/score", (req, res) => {
  const score = new Score(req.body);
  score.save((err, score) => {
    if (err) {
      res.status(400).json({
        error: "not able to save user in db",
      });
    }
    res.json(score);
  });
});

// for best score
router.get("/bestscore1", (req, res) => {
  Score.findOne()
    .sort({ score1: -1 })
    .exec((err, score) => {
      if (err || !score) {
        return res.status(400).json({
          error: "user not found",
        });
      }
      winner(score, req, res);
    });
});

router.get("/bestscore2", (req, res) => {
  Score.findOne()
    .sort({ score2: -1 })
    .exec((err, score) => {
      if (err || !score) {
        return res.status(400).json({
          error: "user not found",
        });
      }
      winner(score, req, res);
    });
});

router.get("/bestscore3", (req, res) => {
  Score.findOne()
    .sort({ score3: -1 })
    .exec((err, score) => {
      if (err || !score) {
        return res.status(400).json({
          error: "user not found",
        });
      }
      winner(score, req, res);
    });
});

// winner code
let winner = (score, req, res) => {
  User.findById(score.user).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    req.winner = user.name;
    return res.json(req.winner);
  });
};

// for avarage score
// first test average score
router.get("/average1", (req, res) => {
  Score.find().exec((err, score) => {
    if (err || !score) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    var avg = score
      .map(function (a) {
        return a.score1;
      })
      .filter(function (n) {
        return n > 0;
      });
    var a = 0;
    avg.forEach((x) => {
      a += x;
      return a;
    });
    avg = (a / avg.length).toFixed(2);
    res.json(avg);
  });
});

// second test average score
router.get("/average2", (req, res) => {
  Score.find().exec((err, score) => {
    if (err || !score) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    var avg = score
      .map(function (a) {
        return a.score2;
      })
      .filter(function (n) {
        return n > 0;
      });
    var a = 0;
    avg.forEach((x) => {
      a += x;
      return a;
    });
    avg = (a / avg.length).toFixed(2);
    res.json(avg);
  });
});

// third test average score
router.get("/average3", (req, res) => {
  Score.find().exec((err, score) => {
    if (err || !score) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    var avg = score
      .map(function (a) {
        return a.score3;
      })
      .filter(function (n) {
        return n > 0;
      });
    var a = 0;
    avg.forEach((x) => {
      a += x;
      return a;
    });
    avg = (a / avg.length).toFixed(2);
    res.json(avg);
  });
});

module.exports = router;
