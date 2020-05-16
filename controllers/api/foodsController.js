const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");

/**
 * Food - Read All
 */
router.get("/", function(req, res) {
  db.Food.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
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
      query: req.body.query,
      timezone: "US/Pacific"
    }
  })
    .then(function(response) {
      let data = response.data.foods[0];
      db.Food.create({
        // UserId: req.user.id,
        name: data.food_name,
        carbs: data.nf_total_carbohydrate / data.serving_qty,
        calories: data.nf_calories / data.serving_qty,
        protein: data.nf_calories / data.serving_qty,
        sugars: data.nf_calories / data.serving_qty,
        // eslint-disable-next-line camelcase
        total_fat: data.nf_calories / data.serving_qty,
        // eslint-disable-next-line camelcase
        consumed_at: data.consumed_at,
        image: data.photo.thumb
      })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    })
    .catch(function(err) {
      if (err) {
        throw err;
      }
    });
});

/**
 * Food - Update
 */
router.put("/:id", function(req, res) {
  db.Food.update({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Food - Delete
 */
router.delete("/:id", function(req, res) {
  db.Food.destroy({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
