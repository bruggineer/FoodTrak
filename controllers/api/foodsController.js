const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");

/**
 * Food - Read All
 */
router.get("/", function(req, res) {
  axios({
    method: "post",
    baseURL: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    headers: {
      "x-app-id": process.env.APP_ID,
      "x-app-key": process.env.APP_KEY,
      "x-remote-user-id": process.env.REMOTE_USER_ID,
      "Content-Type": "application/json"
    },
    data: {
      query: "i ate 3 eggs and french toast",
      timezone: "US/Pacific"
    }
  })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(err) {
      if (err) {
        throw err;
      }
    });
});

/**
 * Food - Read One
 */
router.get("/:id", function(req, res) {
  db.Food.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Food - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.Food.create({
    UserId: req.user.id,
    ...req.body
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Food - Update
 */
router.put("/:id", function(req, res) {
  db.Food.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Food - Delete
 */
router.delete("/:id", function(req, res) {
  db.Food.findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
