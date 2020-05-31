const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");
const moment = require("moment");

/**
 * Food - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.get("/users", function(req, res) {
  db.UsersFood.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.Food],
    limit: 10,
    order: [["createdAt", "DESC"]]
  }).then(function(dbUsersFood) {
    if (dbUsersFood) {
      res.send(dbUsersFood);
    } else {
      res.status(422).send("Data not found");
    }
  });
});

router.get("/today", function(req, res) {
  console.log(process.env.NODE_ENV);
  db.UsersFood.findAll({
    where: {
      UserId: req.user.id,
      date: process.env.NODE_ENV === "development" ? moment().startOf("day").format() : moment().utc().startOf("day").format()
    },
    include: [db.Food]
  }).then(function(dbUsersFood) {
    res.json(dbUsersFood);
  });
});

router.get("/:foodName", function(req, res) {
  db.Food.findOne({
    where: {
      name: req.params.foodName
    }
  }).then(function(dbResult) {
    if (dbResult === null) {
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
          query: req.params.foodName,
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
            protein: data.nf_protein / data.serving_qty,
            sugars: data.nf_sugars / data.serving_qty,
            // eslint-disable-next-line camelcase
            total_fat: data.nf_total_fat / data.serving_qty,
            // eslint-disable-next-line camelcase
            consumed_at: data.consumed_at,
            image: data.photo.thumb
          })
            .then(function(dbModel) {
              res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
        })
        .catch(function(err) {
          if (err) {
            throw err;
          }
        });
    } else {
      res.send(dbResult);
    }
  });
});

router.post("/", function(req, res) {
  console.log(req.body);
  db.UsersFood.create({ UserId: req.user.id, ...req.body })
    .then(function(dbModel) {
      res.send(dbModel);
    })
    .catch(function(err) {
      if (err) {
        throw err;
      }
    });
});

module.exports = router;
